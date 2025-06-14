import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'yourSuperSecretKey';

export function authenticateJWT(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  console.log('Raw headers:', req.headers);
  console.log('Authorization Header:', authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing or invalid Authorization header' });
    return; // return void here, don't return the result
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, JWT_SECRET);
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return; // same here
  }
}
export function authorizeAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied. Admins only.' });
    return;
  }
  next();
}
