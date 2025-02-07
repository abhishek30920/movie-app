import express from 'express';

import multer from 'multer';

import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp' || file.mimetype === 'image/avif'){
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
}


const upload = multer({storage, fileFilter});

const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto'
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      image: result.secure_url
    });
  } catch(error) {
    res.status(500).json({message: error.message});
  }
});

export default router;



 
