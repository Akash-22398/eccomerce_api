import { Response } from 'express';

interface ApiResponse {
    success: boolean;
    response: {
        code: number;
        message: string;
    };
    result: any;
    total?: string;
}

const commonFunc: { send: (res: Response, code: number, data?: any, msg?: string, total?: string) => void } = {
    send: (res, code, data = {}, msg = "", total = "") => {
        const response: ApiResponse = {
            success: code < 400, // Success if status code is less than 400
            response: {
                code,
                message: msg || "",
            },
            result: data,
        };

        if (total) {
            response.total = total;
        }

        res.status(code).json(response);
    },
};

export default commonFunc;
