import express from "express";
const subCategoryController = require('../controllers/subCategoryController');

const router = express.Router();

router.post("/", subCategoryController.createSubcategory);
router.get("/:id", subCategoryController.getSubcategory);
router.put("/:id", subCategoryController.updateSubcategory);
router.post("/list", subCategoryController.getSubcategories);
router.delete("/:id", subCategoryController.deleteSubcategory);

export default router;
