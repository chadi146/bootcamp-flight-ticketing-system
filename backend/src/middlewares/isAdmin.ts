// src/middlewares/isAdmin.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return; // ✅ return after sending response
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied. Admins only.' });
    return; // ✅ return after sending response
  }

  next();
};
