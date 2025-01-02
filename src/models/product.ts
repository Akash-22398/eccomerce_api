import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Product
interface IProduct extends Document {
    name: string;
    category: mongoose.Types.ObjectId;  // Reference to Category model
    subcategory: mongoose.Types.ObjectId; // Reference to Subcategory model
    image: mongoose.Types.ObjectId;  // Reference to Media model
    status: string;  // Example: 'active', 'inactive'
    timeStamp: Date;
}

// Define the schema for Product
const ProductSchema: Schema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    subcategory: {
        type: Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'media',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    timeStamp: {
        type: Date,
        default: Date.now  // Auto-generated timestamp
    }
});

// Create the Product model
const ProductModel: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;
