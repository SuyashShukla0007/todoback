import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export default async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;
    
    const user = await prisma.user.create({
      data: {
        username: body.name, 
        password: body.pass, 
      },
    });
    res.cookie('userId', user.id, { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(201).json({ success: true, data: user });
  } catch (error:any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
