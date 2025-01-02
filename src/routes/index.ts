import express from "express";
import usersRoutes from "../routes/usersRoutes";
import mediaRoutes from "../routes/mediaRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import subCategroyRoutes from "../routes/subCategroyRoutes";
import productRoutes from "../routes/productRoutes";
// import { authenticateToken } from '../middlewares/jwtValidation'; // Correct import for named export

const router = express.Router();

router.use("/user", usersRoutes);
router.use("/media",  mediaRoutes);
router.use("/category",  categoryRoutes);
router.use("/sub-category",  subCategroyRoutes);
router.use("/product",  productRoutes);





export default router;
