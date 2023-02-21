import express from 'express';
import cors from 'cors';
import multer from 'multer';
import db from "./dbConnection.js"
import Jimp from 'jimp';
import fs from 'fs';
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
const watermarkImg = async function(path){
  const image = await Jimp.read(path);
  const watermark = await Jimp.read('./watermark.png');
  watermark.resize(image.bitmap.width * 0.5, Jimp.AUTO); // resize the watermark to half the image width

  image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 0.5
  });
  const watermarkedImagePath = `${path.substring(0, path.indexOf("."))}_watermarkedArt.jpg`;
  await image.writeAsync(watermarkedImagePath); // save the image with watermark
  return watermarkedImagePath;
}

app.post('/api/upload', upload.single('image'), async (req, res) => {
    if(!req.file){
        res.send({code:500, msg:'file upload failed!'});
    }
    else{
      console.log("here ok");
        const watermarkImgLink = await watermarkImg(req.file.path);
        res.send({code:200, msg:'file upload successful!', imageLink:req.file.path, watermarkImgLink:watermarkImgLink});
    }
  });

app.post('/api/addContent',async (req, res)=>{
  console.log("line 47");
  console.log(req.body);
  await db.collection("contents").insertOne({title:req.body.title, description:req.body.description, address:req.body.address}, function(err, res2){
      if(err)throw err
      console.log("added")
      res.send({code:200, msg:"added ok"});
  });
  res.send({})
})

app.get('/api/PicDappContract', async function(req, res){
  fs.readFile('./picDappAdd.txt', 'utf8', (err, data) => {
    if (err) throw err;
    fs.readFile('./PicDappABI.json', 'utf8', (err2, data2)=>{
      if(err2) throw err2;
      const contract = JSON.parse(data2);
      res.send({contract_address:data, contractabi:contract.abi});
    });

  });
})
app.get('/api/ArtContract', async function(req, res){
  fs.readFile('./ArtABI.json', 'utf8', (err, data)=>{
    const contractABI = JSON.parse(data);
    res.send({contractabi:contractABI})
  })
})
app.get('/api/explore', async function(req, res){
  let latest = await db.collection("contents").find({}).sort({ _id: -1 }).limit(20).toArray();
  res.send({code:200, data:latest});
})
app.post('/api/account', async function(req, res){
  let account = await db.collection("accounts").findOne({ethAddress:req.body.ethAddress}, {projection:{_id:1, ethAddress:1, profile:1, name:1}});
  console.log(account);

  if(account != null){
    res.send(account);
  }
  else{
    db.collection("accounts").insertOne({ethAddress:req.body.ethAddress})
    account = await db.collection("accounts").findOne({ethAddress:req.body.ethAddress}, {projection:{_id:1, ethAddress:1, profile:1, name:1}});
    res.send(account);
  }
})
app.get('/contents/:address', async function(req, res) {
  const address = req.params.address;
  let content = await db.collection("contents").findOne({address:address});
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
