import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Category
interface ICategory extends Document {
    name: string;
    image: mongoose.Types.ObjectId;
    status: string; // Example: 'active', 'inactive'
    timeStamp: Date;
}

// Define the schema for Category
const CategorySchema: Schema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'media',
        required: true
    }, // Reference to the media collection
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }, // Auto-generated timestamp
});

// Create the Category model
const CategoryModel: Model<ICategory> = mongoose.model<ICategory>('category', CategorySchema);

export default CategoryModel;
