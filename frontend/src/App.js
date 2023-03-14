import { useState, useEffect } from 'react';
import {
  Heading,
  Input,
  Button,
  HStack,
  Container,
  VStack,
  Text,
  Spacer,
  IconButton,
  Card,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from 'axios';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState({ id: null, status: false });

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const addTodo = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:5005/api/todo/add-todo',
          { task: task },
        );
        setTodos((prev) => [...prev, data]);
      } catch (error) {
        console.log(error);
      }
    };

    const editTodo = async (id) => {
      try {
        const { data } = await axios.patch(
          `http://localhost:5005/api/todo/update/${id}`,
          {
            task: task,
          },
        );
        setTodos((prev) =>
          prev.map((todo) => {
            if (todo._id === id) return data;
            return todo;
          }),
        );
        setIsEditing({ id: null, status: false });
      } catch (error) {
        console.log(error);
      }
    };

    isEditing.status ? editTodo(isEditing.id) : addTodo();
    setTask('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(` http://localhost:5005/api/todo/delete/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (todo) => {
    setTask(todo.task);
    setIsEditing({ id: todo._id, status: true });
  };

  useEffect(() => {
    const allTodos = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5005/api/todo/get-all',
        );
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    };
    allTodos();
  }, []);

  return (
    <div className='App'>
      <VStack>
        <Heading>TodoApp</Heading>
        <Spacer />
        <form onSubmit={handleSubmit}>
          <Container maxW='xs'>
            <HStack>
              <Input
                type='text'
                placeholder='enter a todo'
                onChange={handleChange}
                value={task}
                size='sm'
              />
              <Button type='submit' colorScheme='blue'>
                {isEditing.status ? 'Update' : 'Add'}
              </Button>
            </HStack>
          </Container>
        </form>
        <Spacer />
        <VStack width='xs'>
          {todos.map((todo) => {
            return (
              <Card key={todo._id} px='4' py='2' width='full'>
                <HStack width='full'>
                  <Text>{todo.task}</Text>
                  <Spacer />
                  <IconButton
                    size='sm'
                    icon={<EditIcon />}
                    // color='blue.300'
                    colorScheme='blue'
                    isRound='true'
                    onClick={() => handleEdit(todo)}
                  />

                  <IconButton
                    size='sm'
                    icon={<DeleteIcon />}
                    // color='red.500'
                    colorScheme='red'
                    isRound='true'
                    onClick={() => handleDelete(todo._id)}
                  />
                </HStack>
              </Card>
            );
          })}
        </VStack>
      </VStack>
    </div>
  );
}

export default App;
