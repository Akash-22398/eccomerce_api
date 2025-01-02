import { Request, Response } from 'express';
const productService = require('../services/productService');
import commonFunc from '../utils/common';

// Controller to handle product creation
const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, category, subcategory, image, status } = req.body;

        // Validate input data
        if (!name || !category || !subcategory || !image) {
            return commonFunc.send(res, 400, {}, "Name, category, subcategory, and image are required.");
        }

        const productData = { name, category, subcategory, image, status };

        const createdProduct = await productService.createProduct(req, productData);

        commonFunc.send(res, 201, createdProduct, "Product created successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while creating product.");
    }
};

// Controller to handle getting all products with filtering by name
const getProducts = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        const products = await productService.getProducts({ name: name as string });

        commonFunc.send(res, 200, products, "Products retrieved successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while fetching products.");
    }
};

// Controller to handle getting a single product by ID
const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const product = await productService.getProductById(productId);

        if (!product) {
            return commonFunc.send(res, 404, {}, "Product not found.");
        }

        commonFunc.send(res, 200, product, "Product retrieved successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while fetching the product.");
    }
};

// Controller to handle updating a product by ID
const updateProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await productService.updateProduct(productId, updateData);

        if (!updatedProduct) {
            return commonFunc.send(res, 404, {}, "Product not found.");
        }

        commonFunc.send(res, 200, updatedProduct, "Product updated successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while updating the product.");
    }
};

// Controller to handle deleting a product by ID
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await productService.deleteProduct(productId);

        if (!deletedProduct) {
            return commonFunc.send(res, 404, {}, "Product not found.");
        }

        commonFunc.send(res, 200, deletedProduct, "Product deleted successfully.");
    } catch (error) {
        console.error(error);
        commonFunc.send(res, 500, {}, "Internal server error while deleting the product.");
    }
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
