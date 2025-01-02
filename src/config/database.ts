import { MongoClient } from "mongodb";
import mongoose, { Connection } from "mongoose";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/user";
import CategoryModel from "../models/category";
import MediaModel from "../models/media";
import ProductModel from "../models/product";
import SubcategoryModel from "../models/subCategory";

declare global {
    var conn: Connection | undefined;
    var db: any;
    var config: {
        mongoose: { url: string };
    };
}

export const dbConnection = async (req: any, res: Response, next: NextFunction) => {
    try {

        if (!global.conn) {
            console.log(global.config.mongoose.url);

            await mongoose.connect(global.config.mongoose.url);

            global.conn = mongoose.connection;

            global.conn.on("connected", () => {
                console.log("MongoDB connected successfully!");
            });

            global.conn.on("error", (err) => {
                console.error("MongoDB connection error:", err);
            });
        }


        req.db = {
            user: UserModel,
            category: CategoryModel,
            subCategory: SubcategoryModel,
            product: ProductModel,
            media: MediaModel
        };

        global.db = req.db;

        return next();
    } catch (err) {
        console.error("Error occurred while connecting to MongoDB", err);
        return next(err);
    }
};