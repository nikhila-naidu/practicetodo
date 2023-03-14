import express from 'express';
import {
  getAllTodos,
  addTodo,
  deleteTodoById,
  updateTodoById,
} from '../controllers/todo-controllers.js';

const router = express.Router();

router.get('/get-all', getAllTodos);
router.post('/add-todo', addTodo);
router.delete('/delete/:id', deleteTodoById);
router.patch('/update/:id', updateTodoById);

export default router;
