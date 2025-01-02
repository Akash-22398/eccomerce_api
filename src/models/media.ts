import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for Media
interface IMedia extends Document {
    url: string; // URL of the media file
    storage: string;
    timeStamp: Date; // Auto-generated timestamp
    objectType: string; // The type of object the media is associated with (e.g., 'category', 'subCategory', 'products')
}

// Define the schema for Media
const MediaSchema: Schema<IMedia> = new Schema<IMedia>({
    url: { type: String, required: true, trim: true }, // URL or path of the media
    storage: {
        type: String,
        enum: ['local', 's3'],
        required: true,
    },
    objectType: {
        type: String,
        required: true,
        enum: ['category', 'subCategory', 'products'], // Allowed values
        trim: true
    },
    timeStamp: { type: Date, default: Date.now },

});

// Create the Media model
const MediaModel: Model<IMedia> = mongoose.model<IMedia>('media', MediaSchema);

export default MediaModel;
