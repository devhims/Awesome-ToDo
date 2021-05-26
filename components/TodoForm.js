import { useState, useContext } from 'react';
import {
  Input,
  HStack,
  Button,
  useToast,
  VStack,
  FormControl,
  Flex,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import moment from 'moment';

import { useUser } from '@auth0/nextjs-auth0';

import { TodosContext } from '../contexts/TodoContext';

const TodoForm = ({ onAddTodo }) => {
  const [content, setContent] = useState('');
  const toast = useToast();
  const { addTodo } = useContext(TodosContext);
  const { user } = useUser();

  const submitHandler = (event) => {
    event.preventDefault();
    if (content.trim() === '') {
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
      // todo: content.trim(),
      fields: {
        task: content,
        completed: false,
        date: moment().format('L'),
        userId: user.sub,
      },
    };

    //onAddTodo(todo);
    addTodo(todo);
    setContent('');
  };

  const inputHandler = (event) => setContent(event.target.value);

  return (
    <form onSubmit={submitHandler}>
      <FormControl px={2}>
        <Input
          value={content}
          onChange={inputHandler}
          colorScheme="teal"
          variant="filled"
          placeholder="Enter new task"
          _hover={{ borderColor: 'teal.600' }}
          _active={{ borderColor: 'teal.600' }}
          _focus={{ borderColor: 'teal.600' }}
          borderColor={useColorModeValue('gray.50', 'teal.400')}
          w="100%"
          my={2}
          //bg={useColorModeValue('gray.200', 'gray.400')}
        />
        <Button
          colorScheme="teal"
          type="submit"
          w="inherit"
          my={2}
          rounded="md"
        >
          Add Task
        </Button>
      </FormControl>
    </form>
  );
};

export default TodoForm;
