import express from 'express';
import { addCategory, addSubCategory } from "../controllers/productController";
import { validateRequest } from "../middlewares/validate";
import { categoryValidation, subCategoryValidation } from "../validators/authValidator";
const router = express.Router();

router.post('/add-category', categoryValidation, validateRequest, addCategory);
router.post('/add-sub-category',subCategoryValidation,validateRequest,addSubCategory);


export default router;