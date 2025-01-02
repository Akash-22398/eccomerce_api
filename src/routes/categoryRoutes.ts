import express from "express";
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.post("/", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.get("/:id", categoryController.getCategory);
router.post("/list", categoryController.getAllCategories);
router.delete("/:id", categoryController.deleteCategory);

export default router;
