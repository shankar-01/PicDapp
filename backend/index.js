import express from 'express';
import cors from 'cors';
import multer from 'multer';
import db from "./dbConnection.js"


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
app.get('/api/account', async function(req, res){
  console.log("38");
  let account = await db.collection("accounts").findOne({}, {projection:{ethAddress:req.body.ethAddress}});
  console.log(account);  
  if(account != null){
  console.log("42");
    res.send({code:200, data:account});
  }
  else{
    db.collection("accounts").insertOne({ethAddress:req.body.ethAddress})
    res.send({code:200, msg:"new account created"});
  }
})
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