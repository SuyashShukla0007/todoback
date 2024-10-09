"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.createTodo = void 0;
const client_1 = require("@prisma/client");
const TodoClient = new client_1.PrismaClient().todo;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    const userId = req.params.UserId;
    const userID = Number(userId);
    try {
        const todo = yield TodoClient.create({
            data: { title, description, UserId: userID, completed }
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
});
exports.createTodo = createTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.UserId;
    try {
        const todos = yield TodoClient.findMany({
            where: { UserId: Number(userId) }
        });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});
exports.getTodos = getTodos;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const todo = yield TodoClient.delete({
            where: { id: Number(id) }
        });
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    try {
        const todo = yield TodoClient.update({
            where: { id: Number(id) },
            data: { title, description, completed }
        });
        res.status(200).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update todo" });
    }
});
exports.updateTodo = updateTodo;
