
import express from "express";
const mediaController = require('../controllers/mediaController');
const multerConfig = require('../middlewares/multerConfig');

const router = express.Router();

router.post('/', multerConfig.uploadSingle, mediaController.uploadMedia);


export default router;
