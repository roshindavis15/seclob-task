import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'product-images',
      format: 'png', 
      transformation: [{ width: 800, height: 800, crop: 'limit' }],
    };
  },
});

export const upload = multer({ storage });
