import { Request } from 'express';
import SubcategoryModel from '../models/subCategory';

// Service to create a subcategory
const createSubcategory = async (req: Request, subcategoryData: any): Promise<any> => {
    try {
        const newSubcategory = new SubcategoryModel(subcategoryData);
        await newSubcategory.save();
        return newSubcategory;
    } catch (error) {
        throw error;
    }
};

// Service to get subcategories with filters
const getSubcategories = async (filters: any): Promise<any> => {
    try {
        return await SubcategoryModel.find(filters)
            .populate('category', 'name')  // Populate category name
            .populate('image', 'url');    // Populate image URL
    } catch (error) {
        throw error;
    }
};

// Service to retriving a subcategory
const getSubcategory = async (subcategoryId: string, updatedData: any): Promise<any> => {
    try {
        const category = await SubcategoryModel.findById(subcategoryId)
            .populate('category', 'name')
            .populate('image', 'url');

        return category
    } catch (error) {
        throw error;
    }
};

// Service to update a subcategory
const updateSubcategory = async (subcategoryId: string, updatedData: any): Promise<any> => {
    try {
        const updateCategory = await SubcategoryModel.findByIdAndUpdate(subcategoryId, updatedData, { new: true })
            .populate('category', 'name')
            .populate('image', 'url');

        return updateCategory
    } catch (error) {
        throw error;
    }
};

// Service to delete a subcategory
const deleteSubcategory = async (subcategoryId: string): Promise<null> => {
    try {
        return await SubcategoryModel.findByIdAndDelete(subcategoryId);
    } catch (error) {
        throw error;
    }
};

// Export service functions
module.exports = {
    createSubcategory,
    getSubcategories,
    getSubcategory,
    updateSubcategory,
    deleteSubcategory
};
