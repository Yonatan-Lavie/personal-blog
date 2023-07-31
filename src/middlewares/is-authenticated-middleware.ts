import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Secret key for JWT (you should use the same key used to generate the token)
const JWT_SECRET_KEY = 'your-secret-key';

// Middleware for verifying user token from the cookie
export const isAuthenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log(`token is dosen't exist ${req.cookies} Error`);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as { userId: string };
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    console.log("isAuthenticatedMiddleware Error");
    
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
