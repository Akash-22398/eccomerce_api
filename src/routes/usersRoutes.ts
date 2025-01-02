import express from "express";
const userController = require('../controllers/userController');

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
