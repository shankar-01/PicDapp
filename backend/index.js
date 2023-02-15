import express from 'express';
import cors from 'cors';
import multer from 'multer';
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
    }
  });
app.get('/uploads/:filename', function(req, res) {
    const fileName = req.params.filename;
    res.sendFile("uploads\\"+fileName, { root: '.' })
  });
app.listen(4000, () => {
    console.log('Server started on port 4000');
  });