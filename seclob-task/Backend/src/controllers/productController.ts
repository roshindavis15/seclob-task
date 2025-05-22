import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import AppError from '../utils/AppError';

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new AppError('Category name is required', 400);
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      throw new AppError('Category already exists', 400);
    }

    const category = await Category.create({ name });
    res.status(201).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};
