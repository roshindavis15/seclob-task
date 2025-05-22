import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import AppError from '../utils/AppError';
import SubCategory from '../models/SubCategory';
import Product from '../models/Product';

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


export const addSubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      throw new AppError('Subcategory name and categoryId are required', 400);
    }

    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }

    const existing = await SubCategory.findOne({ name, category: categoryId });
    if (existing) {
      throw new AppError('Subcategory already exists under this category', 400);
    }

    const subCategory = await SubCategory.create({ name, category: categoryId });

    res.status(201).json({ success: true, subCategory });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
   console.log("req.body:",req.body)
    const { title, description, subCategoryId, variants } = req.body;
    console.log("title:",title) 
    console.log("description:",description);
    console.log("subCategoryId:",subCategoryId);
    console.log("variants:",variants);
    const files = req.files as Express.Multer.File[];
    const images = files?.map(file => file.filename) || [];

    if (!title || !description || !subCategoryId || !variants) {
      throw new AppError('All fields are required', 400);
    }

    const subCategoryExists = await SubCategory.findById(subCategoryId);
    if (!subCategoryExists) {
      throw new AppError('Subcategory not found', 404);
    }

    const product = await Product.create({
      title,
      description,
      subCategory: subCategoryId,
      variants: JSON.parse(variants),
      images,
    });

    res.status(201).json({ success: true, product });
    console.log("product added")
  } catch (err) {
    next(err);
  }
};
