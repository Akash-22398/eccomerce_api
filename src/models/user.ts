import mongoose, { Document, Schema,Model } from "mongoose";

// Define the User document interface
export interface IUser extends Document {
    email: string;
    password: string;
    otp: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "banned"],
            default: "active",
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

// export default mongoose.model<IUser>("user", UserSchema);

const UserModel: Model<IUser> = mongoose.model<IUser>("user", UserSchema);
export default UserModel;