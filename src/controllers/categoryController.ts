import { Request, Response } from 'express';
const categoryService = require('../services/categoryService');
import commonFunc from '../utils/common';

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, image, status } = req.body;

        if (!name || !image || !status) {
            return commonFunc.send(res, 400, {}, "All fields (name, image, status) are required.");
        }

        const categoryData = { name, image, status };
        console.log(categoryData);
        
        const newCategory = await categoryService.createCategory(categoryData);

        commonFunc.send(res, 201, newCategory, "Category created successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while creating category.");
    }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body; // Filter by name
        const categories = await categoryService.getAllCategories(name as string);

        commonFunc.send(res, 200, categories, "Categories retrieved successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while retrieving categories.");
    }
};


// Get a category
export const getCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const category = await categoryService.getCategory(id);

        if (!category) {
            return commonFunc.send(res, 404, {}, "Category not found.");
        }

        commonFunc.send(res, 200, category, "Category recieved successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while retriving category.");
    }
};


// Update a category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedCategory = await categoryService.updateCategory(id, updates);

        if (!updatedCategory) {
            return commonFunc.send(res, 404, {}, "Category not found.");
        }

        commonFunc.send(res, 200, updatedCategory, "Category updated successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while updating category.");
    }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoryService.deleteCategory(id);

        if (!deletedCategory) {
            return commonFunc.send(res, 404, {}, "Category not found.");
        }

        commonFunc.send(res, 200, {}, "Category deleted successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while deleting category.");
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};
