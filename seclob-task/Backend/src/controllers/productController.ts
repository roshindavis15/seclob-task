import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import AppError from '../utils/AppError';
import SubCategory from '../models/SubCategory';
import Product from '../models/Product';
import User from '../models/User';

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

export const getProductDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
   console.log("id:",id)
    const product = await Product.findById(id)
      .populate({
        path: 'subCategory',
        populate: {
          path: 'category', 
          select: 'name',
        },
        select: 'name',
      });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, subCategoryId, variants } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    
    const files = req.files as Express.Multer.File[];
    const images = files?.map(file => file.filename);

    
    if (subCategoryId) {
      const subCategoryExists = await SubCategory.findById(subCategoryId);
      if (!subCategoryExists) throw new AppError('Subcategory not found', 404);
      product.subCategory = subCategoryId;
    }

   
    if (title) product.title = title;
    if (description) product.description = description;
    if (variants) product.variants = JSON.parse(variants);
    if (images?.length > 0) product.images = images;

    await product.save();

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

