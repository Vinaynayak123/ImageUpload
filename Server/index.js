const express = require("express");
const cors = require('cors');
const multer = require("multer");
const path = require("path");
const { default: mongoose } = require("mongoose");
const userModel = require("./Model/UserSchema")

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ImageUpload')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Image');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single('file'), async (req, res) => {
    try {
      console.log(req.file);
  
      // Save the filename to the MongoDB database
      const result = await userModel.create({ image: req.file.filename });
  
      // Send a success response
      res.status(200).json({ message: 'File uploaded successfully', result });
    } catch (error) {
      // Handle errors during file upload
      console.error(error);
  
      // Send an error response
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
 

app.listen(PORT, () => {
  console.log(`Server is running at Port No.${PORT}`);
});
