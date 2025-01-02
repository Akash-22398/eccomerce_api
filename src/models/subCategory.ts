import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Subcategory
interface ISubcategory extends Document {
    name: string;
    category: mongoose.Types.ObjectId;  // Reference to Category model
    image: mongoose.Types.ObjectId;  // Reference to Media model
    timestamp: Date;
    status: string;  // Example: 'active', 'inactive'
}

// Define the schema for Subcategory
const SubcategorySchema: Schema = new Schema<ISubcategory>({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'media',
        required: true
    },
    timestamp: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
});

// Create the Subcategory model
const SubcategoryModel: Model<ISubcategory> = mongoose.model<ISubcategory>('Subcategory', SubcategorySchema);

export default SubcategoryModel;
