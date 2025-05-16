import { Request, Response } from 'express'

import bcrypt from 'bcryptjs'
import prisma from '../config/prisma'

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'User registration failed', details: error instanceof Error ? error.message : error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' })

    res.json({ message: 'Login successful', user })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
}
