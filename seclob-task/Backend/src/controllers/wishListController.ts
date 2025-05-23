import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Product from '../models/Product';
import AppError from '../utils/AppError';



export const addToWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const userId = req.user!.id;
    const { productId, selectedVariant } = req.body;

    if (!productId || !selectedVariant) {
      throw new AppError('Product ID and selected variant are required', 400);
    }

    const product = await Product.findById(productId);
    if (!product) throw new AppError('Product not found', 404);

    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 404);

    // Check if product with the same variant already exists in wishlist
    const alreadyInWishlist = user.wishlist.some(
      (item: any) =>
        item.product.toString() === productId &&
        item.selectedVariant.ram === selectedVariant.ram &&
        item.selectedVariant.price === selectedVariant.price &&
        item.selectedVariant.quantity === selectedVariant.quantity
    );

    if (alreadyInWishlist) {
      res.status(400).json({
        success: false,
        message: 'This variant is already in your wishlist',
      });
      return;
    }

    user.wishlist.push({ product: productId, selectedVariant });
    await user.save();

    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    next(err);
  }
};


export const getWishlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const userId = req.user!.id;


    const user = await User.findById(userId).populate('wishlist');
    if (!user) throw new AppError('User not found', 404);

    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    next(err);
  }
};