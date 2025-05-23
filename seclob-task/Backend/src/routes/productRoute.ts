import express from 'express';
import { addCategory, addProduct, addSubCategory, editProduct, getProductDetails } from "../controllers/productController";
import { validateRequest } from "../middlewares/validate";
import { categoryValidation, subCategoryValidation } from "../validators/authValidator";
import { upload } from '../middlewares/upload';

const router = express.Router();

/**
 * @swagger
 * /api/product/add-category:
 *   post:
 *     summary: Add a new category
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/product/add-sub-category:
 *   post:
 *     summary: Add a new subcategory
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Subcategory created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/product/add-product:
 *   post:
 *     summary: Add a new product
 *     tags: [Product]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subCategoryId
 *               - description
 *               - variants
 *             properties:
 *               title:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               description:
 *                 type: string
 *               variants:
 *                 type: string
 *                 description: JSON string of variants (e.g., [{"ram":"4GB", "price":500, "quantity":1}])
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Validation or upload error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details returned
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/product /{id}:
 *   put:
 *     summary: Edit an existing product
 *     tags: [Product]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               subCategoryId:
 *                 type: string
 *               description:
 *                 type: string
 *               variants:
 *                 type: string
 *                 description: JSON string of variants
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 */

router.post('/add-category', categoryValidation, validateRequest, addCategory);
router.post('/add-sub-category',subCategoryValidation,validateRequest,addSubCategory);
router.post('/add-product',upload.array('images', 5), addProduct);
router.get('/:id',getProductDetails);
router.put('/:id', upload.array('images'), editProduct);



export default router;