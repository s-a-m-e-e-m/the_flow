const express = require("express");
const taskRouter = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { addTasks, getTasks, deleteTask, updateTaskStatus, updateTask, updateTaskDeadline } = require("../controllers/task.controller");

taskRouter.post('/', authMiddleware.authUser, addTasks);
taskRouter.get('/', authMiddleware.authUser, getTasks);
taskRouter.delete('/:taskId', authMiddleware.authUser, deleteTask);
taskRouter.put('/status/:taskId', authMiddleware.authUser, updateTaskStatus);
taskRouter.put('/:taskId', authMiddleware.authUser, updateTask);
taskRouter.put('/deadline/:taskId', authMiddleware.authUser, updateTaskDeadline);

module.exports = taskRouter;