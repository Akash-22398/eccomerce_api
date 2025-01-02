// import Category, { ICategory } from '../models/Category';
import CategoryModel from '../models/category'; // Assuming your User model is here

interface CreateCategoryData {
    name: string;
    image: string;
    status: string;
}

interface UpdateCategoryData {
    name?: string;
    image?: string;
    status?: string;
}

const createCategory = async (categoryData: CreateCategoryData): Promise<any> => {
    try {
        const newCategory = new CategoryModel({
            name: categoryData.name,
            image: categoryData.image,
            status: categoryData.status,
            timeStamp: new Date(),
        });

        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw error;
    }
};

const getAllCategories = async ( name?: string): Promise<any[]> => {
    try {
        const query = name ? { name: { $regex: name, $options: 'i' } } : {};
        
        return await CategoryModel.find(query).populate({
            path: 'image', 
            select: 'url _id', 
        });;
    } catch (error) {
        throw error;
    }
};

const getCategory = async (id: string): Promise<any> => {
    try {
        return await CategoryModel.findById(id).populate({
            path: 'image', 
            select: 'url _id', 
        });
    } catch (error) {
        throw error;
    }
};

const updateCategory = async ( id: string, updates: UpdateCategoryData): Promise<any> => {
    try {
        return await CategoryModel.findByIdAndUpdate(id, updates, { new: true });
    } catch (error) {
        throw error;
    }
};

const deleteCategory = async ( id: string): Promise<any> => {
    try {
        return await CategoryModel.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory,
};