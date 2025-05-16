// src/routes/adminTest.ts
import express from 'express';
import { authenticate } from '../middlewares/auth';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();

router.get('/admin-only',(req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

export default router;
