"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_1 = require("./controllers/todo");
const user_1 = __importDefault(require("./controllers/user"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)({ origin: '*' })); // allow all origins
app.use(express_1.default.json());
app.get('/todo/:UserId', todo_1.getTodos);
app.patch('/todo/:id', todo_1.updateTodo);
app.delete('/todo/:id', todo_1.deleteTodo);
app.post('/todo/:UserId', todo_1.createTodo);
app.post('/user/create', user_1.default);
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
