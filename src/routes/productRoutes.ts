import express from "express";
const productController = require('../controllers/productController');

const router = express.Router();

router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.get("/:id", productController.getProductById);
router.post("/list", productController.getProducts);
router.delete("/:id", productController.deleteProduct);

export default router;
