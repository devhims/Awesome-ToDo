import { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodoContext';

import {
  Input,
  Button,
  useToast,
  FormControl,
  useColorModeValue,
} from '@chakra-ui/react';

import { nanoid } from 'nanoid';
import moment from 'moment';
import { useUser } from '@auth0/nextjs-auth0';

const TodoForm = () => {
  const [task, setTask] = useState('');
  const toast = useToast();
  const { addTodo } = useContext(TodosContext);
  const { user } = useUser();

  const submitHandler = (event) => {
    event.preventDefault();

    if (task.trim() === '') {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const todo = {
      id: nanoid(),
      fields: {
        task: task.trim(),
        completed: false,
        date: moment().format('YYYY-MM-DD'),
        userId: user.sub,
      },
    };

    addTodo(todo);
    setTask('');
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl>
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          colorScheme="teal"
          variant="filled"
          placeholder="Enter new task"
          _hover={{ borderColor: 'teal.600' }}
          _active={{ borderColor: 'teal.600' }}
          _focus={{ borderColor: 'teal.600' }}
          borderColor={useColorModeValue('gray.400', 'teal.400')}
          w="100%"
          my={2}
          bg={useColorModeValue('gray.200', 'gray.700')}
        />
        <Button colorScheme="teal" type="submit" w="100%" my={2} rounded="md">
          Add Task
        </Button>
      </FormControl>
    </form>
  );
};

export default TodoForm;
