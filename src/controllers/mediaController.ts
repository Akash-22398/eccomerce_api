import { Request, Response } from 'express';
const mediaService = require('../services/mediaService');
const commonFunc = require('../utils/common');

interface UploadRequest {
    media: Express.Multer.File | undefined;
    objectType: string | undefined;
    objectId: string | undefined;
}

const uploadMedia = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (!req.file) {
            return commonFunc.default.send(res, 400, 'No file found in request', '');
        }

        const uploadReq: UploadRequest = {
            media: req.file,
            objectType: req.body?.objectType,
            objectId: req.body?.objectId,
        };

        const fileDetails = await mediaService.uploadMedia(uploadReq);

        const responseMsg = fileDetails?.message || 'File upload failed';
        const statusCode = fileDetails?.code || 500;
        const dbResponseData = fileDetails?.data || [];

        return commonFunc.default.send(res, statusCode, dbResponseData, responseMsg);

    } catch (err: any) {
        console.error("Error from uploadMedia func, fileuploadcontroller file catch block", err.stack);
        const errorData = process.env.NODE_ENV === 'development' ? { error: err.stack } : null;
        return commonFunc.default.send(res, 500, 'Internal server error', errorData);
    }
};

module.exports = {
    uploadMedia
};
