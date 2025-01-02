import { Model } from "mongoose";

declare global {
    namespace Express {
        interface Request {
            db?: {
                user: Model<any>;
            };
        }
    }
}
