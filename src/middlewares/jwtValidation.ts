// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// const commonFunc = require('../utils/common');

// const jwtSecret = process.env.JWT_SECRET || 'your-secret-key'; // Use a secret key from your environment variables

// export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, jwtSecret); // Verify the token
//         (req as any).user = decoded; // Attach the decoded payload to the request
//         next(); // Continue to the next middleware or route handler
//     } catch (err) {
//         return res.status(403).json({ message: 'Invalid or expired token.' });
//     }
// };
