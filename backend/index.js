import express from 'express';
import cors from 'cors';
import multer from 'multer';
import db from "./dbConnection.js"
import { ObjectId } from 'mongodb';

const app = express()
app.use(cors())
app.use(express.json())
// Set up multer storage and limits
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".jpeg");
    },
  });  
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
    if(!req.file){
        res.send({code:500, msg:'file upload failed!'});
    }
    else{
        res.send({code:200, msg:'file upload successful!', imageLink:req.file.path});
    db.collection("contents").insertOne({fileName:req.file.filename, title:req.body.title, description:req.body.description}, function(err, res){
        if(err)throw err
        console.log("added")
        
    });
    }
  });
app.get('/api/explore', async function(req, res){
  let latest = await db.collection("contents").find({}).sort({ _id: -1 }).limit(20).toArray();
  res.send({code:200, data:latest});
})
app.post('/api/account', async function(req, res){
  // console.log("38");
  //console.log(req.body);
  let account = await db.collection("accounts").findOne({ethAddress:req.body.ethAddress}, {projection:{_id:1, ethAddress:1, profile:1, name:1}});
  console.log(account);

  if(account != null){
  // console.log("42");
    res.send(account);
  }
  else{
    db.collection("accounts").insertOne({ethAddress:req.body.ethAddress})
    account = await db.collection("accounts").findOne({ethAddress:req.body.ethAddress}, {projection:{_id:1, ethAddress:1, profile:1, name:1}});
    res.send(account);
  }
})
app.get('/contents/:_id', async function(req, res) {
  const _id = req.params._id;
  let content = await db.collection("contents").findOne({_id:new ObjectId(_id)});
  res.send({code:200, data:content});
});
app.post('/api/updateAccount', upload.single('image'), async function(req, res){
  if(!req.file){
      res.send({code:500, msg:'account Update failed'});
  }
  else{
    
    await db.collection("accounts").updateOne({ethAddress:req.body.ethAddress}, {$set:{profile:req.file.filename, name:req.body.name}}, false, true);
    res.send({code:200, msg:'account update successful!'});
  }
});
app.get('/uploads/:filename', function(req, res) {
    const fileName = req.params.filename;
    res.sendFile("uploads\\"+fileName, { root: '.' })
  });
app.listen(4000, () => {
    console.log('Server started on port 4000');
  });