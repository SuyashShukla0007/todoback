import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const TodoClient = new PrismaClient().todo;

export const createTodo = async (req: Request, res: Response) => {
  const { title, description,completed } = req.body;
  const userId = req.params.UserId;
  const userID = Number(userId);
  try {
    const todo = await TodoClient.create({
      data: { title, description, UserId: userID ,completed}
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
}


export const getTodos = async (req: Request, res: Response) => {
  const userId = req.params.UserId;
  try {
    const todos = await TodoClient.findMany({
      where: { UserId: Number(userId) }
    });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};


export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const todo= await TodoClient.delete({
      where:{id:Number(id)}
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const {title,description,completed}=req.body;
  try {
    const todo= await TodoClient.update({
      where:{id:Number(id)},
      data:{title,description,completed}
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
}