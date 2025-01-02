import ProductModel from '../models/product';

// Service for creating a new product
const createProduct = async (req: any, productData: { name: string, category: string, subcategory: string, image: string, status: string }): Promise<any> => {
    try {
        const newProduct = new ProductModel({
            name: productData.name,
            category: productData.category,  // Category ObjectId
            subcategory: productData.subcategory,  // Subcategory ObjectId
            image: productData.image,  // Media ObjectId for the image
            status: productData.status || 'active',  // Default to active if no status provided
        });

        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw error;
    }
};

// Service to get all products with optional filtering by name
const getProducts = async (filter: { name?: string }): Promise<any> => {
    try {
        let query = {};

        if (filter.name) {
            query = { name: new RegExp(filter.name, 'i') }; // Case-insensitive search for name
        }

        const products = await ProductModel.find(query)
            .populate('category', 'name')  // Populate category field with the name
            .populate('subcategory', 'name')  // Populate subcategory field
            .populate('image', 'url');  // Populate image field with URL

        return products;
    } catch (error) {
        throw error;
    }
};

// Service to get a single product by ID
const getProductById = async (productId: string): Promise<any> => {
    try {
        const product = await ProductModel.findById(productId)
            .populate('category', 'name')  // Populate category name
            .populate('subcategory', 'subcategory')  // Populate subcategory name
            .populate('image', 'url');  // Populate image URL

        return product;
    } catch (error) {
        throw error;
    }
};

// Service to update a product by ID
const updateProduct = async (productId: string, updateData: Partial<any>): Promise<any> => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true })
            .populate('category', 'name')
            .populate('subcategory', 'subcategory')
            .populate('image', 'url');

        return updatedProduct;
    } catch (error) {
        throw error;
    }
};

// Service to delete a product by ID
const deleteProduct = async (productId: string): Promise<any> => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        return deletedProduct;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
