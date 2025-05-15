// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; role: string };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token received:', token);
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret';
    const decoded = jwt.verify(token, secret) as { id: number; role: string };
    console.log('Decoded token:', decoded);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.log('JWT verification error:', err);
    res.status(401).json({ message: 'Invalid token' });
    return;
  }
};

