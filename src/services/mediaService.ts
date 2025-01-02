import path from 'path';
import mediaModel from '../models/media';
import mongoose from 'mongoose';
import config from "../config/config";

interface MediaDetails {
    objectType?: string;
    objectId?: string;
    media?: Express.Multer.File;
}

interface ServiceResponse {
    status: string;
    code: number;
    message: string;
    data: any;
}

const uploadMedia = async (mediaDetails: MediaDetails | undefined): Promise<ServiceResponse> => {
    try {
        if (!mediaDetails) {
            return {
                status: "Fail",
                code: 400,
                message: "File Details not found",
                data: null,
            };
        }

        const entityType = mediaDetails?.objectType ?? '';
        const entityId = mediaDetails?.objectId ?? '';
        const fileName = mediaDetails?.media?.filename;
        const fileUrl = `${config.server_url}/public/uploads/${entityType}/${fileName}`;

        const mediaContent = {
            objectType: entityType,
            objectId: entityId,
            mediaType: mediaDetails.media?.mimetype ?? '',
            url: fileUrl ?? '',
            storage: 'local',
            status: 'active',
        };

        const uploadedContent = await mediaModel.create(mediaContent);

        if (!uploadedContent) {
            return {
                status: "Fail",
                code: 404,
                message: "Media upload failed",
                data: null,
            };
        }

        const minimalUploadContentDetails = await mediaModel.findById(uploadedContent._id)
            .select('objectType objectId mediaType url storage status')
            .lean();

        if (!minimalUploadContentDetails) {
            return {
                status: "Fail",
                code: 404,
                message: "Media upload failed",
                data: null,
            };
        }

        return {
            status: "Success",
            code: 201,
            message: "File saved.",
            data: minimalUploadContentDetails,
        };
    } catch (err: any) {
        console.error("Error from uploadMedia func, mediaUploadService, catch block", err.stack);

        const errorData = process.env.NODE_ENV === 'development' ? { error: err.stack } : null;
        return {
            status: "Fail",
            code: 500,
            message: "An unexpected error occurred during the job create process",
            data: errorData,
        };
    }
};

module.exports = {
    uploadMedia
};