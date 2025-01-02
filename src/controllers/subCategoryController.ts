import { Request, Response } from 'express';
const subCategoryService = require('../services/subCategoryService');
import commonFunc from '../utils/common';

// Controller to handle creating a subcategory
const createSubcategory = async (req: Request, res: Response) => {
    try {
        const { name, category, image, status } = req.body;

        // Validate input data
        if (!name || !category || !image) {
            return commonFunc.send(res, 400, {}, "name, category, and image are required.");
        }

        const subcategoryData = { name, category, image, status };

        const createdSubcategory = await subCategoryService.createSubcategory(req, subcategoryData);

        // Send success response with subcategory data
        commonFunc.send(res, 201, createdSubcategory, "Subcategory created successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while creating subcategory.");
    }
};

// Controller to handle fetching subcategories with filters
const getSubcategories = async (req: Request, res: Response) => {
    try {
        const { name, status, category } = req.body;

        const filters: any = {};
        if (name) filters.name = { $regex: name, $options: 'i' }; // Filter by name, case-insensitive
        if (status) filters.status = status;
        if (category) {
            filters.category = category;
        }
        
        const subcategories = await subCategoryService.getSubcategories(filters);

        // Send success response with subcategory list
        commonFunc.send(res, 200, subcategories, "Subcategories fetched successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while fetching subcategories.");
    }
};

// Controller to handle retriving a subcategory
const getSubcategory = async (req: Request, res: Response) => {
    try {
        const subcategoryId = req.params.id;

        const subcategory = await subCategoryService.getSubcategory(subcategoryId);

        if (!subcategory) {
            return commonFunc.send(res, 404, {}, "Subcategory not found.");
        }

        // Send success response with updated subcategory data
        commonFunc.send(res, 200, subcategory, "Subcategory retrived successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while retrived subcategory.");
    }
};

// Controller to handle updating a subcategory
const updateSubcategory = async (req: Request, res: Response) => {
    try {
        const subcategoryId = req.params.id;
        const { name, category, image, status } = req.body;

        // Validate input data
        if (!name || !category || !image) {
            return commonFunc.send(res, 400, {}, "name, category, and image are required.");
        }

        const updatedData = { name, category, image, status };

        const updatedSubcategory = await subCategoryService.updateSubcategory(subcategoryId, updatedData);

        if (!updatedSubcategory) {
            return commonFunc.send(res, 404, {}, "Subcategory not found.");
        }

        // Send success response with updated subcategory data
        commonFunc.send(res, 200, updatedSubcategory, "Subcategory updated successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while updating subcategory.");
    }
};

// Controller to handle deleting a subcategory
const deleteSubcategory = async (req: Request, res: Response) => {
    try {
        const subcategoryId = req.params.id;

        const deletedSubcategory = await subCategoryService.deleteSubcategory(subcategoryId);

        if (!deletedSubcategory) {
            return commonFunc.send(res, 404, {}, "Subcategory not found.");
        }

        // Send success response for deletion
        commonFunc.send(res, 200, {}, "Subcategory deleted successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while deleting subcategory.");
    }
};

// Export controller functions
module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
};
