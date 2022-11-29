var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer');
var storage = multer.memoryStorage({});
var upload = multer({storage: storage});


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());


app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse",upload.single("upfile"),(req,res) => {
  let {originalname: fileName, mimetype: fileType, size: fileSize} = req.file;
  
  res.json({
    name: `${fileName}`,
    type: `${fileType}`,
    size: `${fileSize}`
  });

});



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
