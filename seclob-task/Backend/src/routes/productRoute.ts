import express from 'express';
import { addCategory, addProduct, addSubCategory } from "../controllers/productController";
import { validateRequest } from "../middlewares/validate";
import { categoryValidation, subCategoryValidation } from "../validators/authValidator";
import { upload } from '../middlewares/upload';

const router = express.Router();

router.post('/add-category', categoryValidation, validateRequest, addCategory);
router.post('/add-sub-category',subCategoryValidation,validateRequest,addSubCategory);
router.post('/add-product',upload.array('images', 5), addProduct);


export default router;