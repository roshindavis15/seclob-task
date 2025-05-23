import express from 'express';
import { addToWishlist, getWishlist } from '../controllers/wishListController';
import { isAuthenticated } from '../middlewares/authMiddleware';


const router = express.Router();

/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Add product to wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - selectedVariant
 *             properties:
 *               productId:
 *                 type: string
 *               selectedVariant:
 *                 type: object
 *                 properties:
 *                   ram:
 *                     type: string
 *                   price:
 *                     type: number
 *                   quantity:
 *                     type: number
 *     responses:
 *       200:
 *         description: Product added to wishlist
 *       400:
 *         description: Already in wishlist or invalid data
 */

router.post('/add', isAuthenticated, addToWishlist);
router.get('/', isAuthenticated, getWishlist);

export default router;