import Todo from '../models/todo-model.js';

export const getAllTodos = async (req, res, next) => {
  const allTodo = await Todo.find();
  try {
    res.json(allTodo);
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = async (req, res, next) => {
  const { task } = req.body;
  const createTodo = new Todo({
    task,
  });
  try {
    await createTodo.save();
    res.json(createTodo);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteTodo = await Todo.findByIdAndRemove(id);
    res.json(deleteTodo);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoById = async (req, res, next) => {
  const { id } = req.params;
  const { task } = req.body;
  const editTodo = await Todo.findById(id);
  try {
    if (task) {
      editTodo.task = task;
    }
    await editTodo.save();
    res.json(editTodo);
  } catch (error) {
    console.log(error);
  }
};
