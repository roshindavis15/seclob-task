import express from 'express';
import { addCategory } from "../controllers/productController";
import { validateRequest } from "../middlewares/validate";
import { categoryValidation } from "../validators/authValidator";
const router = express.Router();

router.post('/add-category', categoryValidation, validateRequest, addCategory);
router.post('/add-sub-category',)

export default router;