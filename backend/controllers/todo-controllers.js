import Todo from '../models/todo-model.js';

export const getAllTodos = async (req, res, next) => {
  try {
    const allTodo = await Todo.find();
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
    const deletedTodo = await Todo.findByIdAndRemove(id);
    res.json(deletedTodo);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoById = async (req, res, next) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const editTodo = await Todo.findById(id);
    if (task) {
      editTodo.task = task;
    }
    await editTodo.save();
    res.json(editTodo);
  } catch (error) {
    console.log(error);
  }
};
