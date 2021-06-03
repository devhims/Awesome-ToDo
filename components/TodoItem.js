import { useState, useContext, useEffect } from 'react';
import { useCount } from '../contexts/TodoContext';

import {
  Checkbox,
  HStack,
  IconButton,
  Spacer,
  Text,
  useToast,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo }) => {
  const [complete, setComplete] = useState(todo.completed);
  const [task, setTask] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const [showOptions, setShowOptions] = useState(false);

  const { updateTodo, deleteTodo, canCheck } = useCount();

  useEffect(() => {
    if (canCheck) {
      setShowOptions(true);
    }
  }, [canCheck]);

  const updateChecked = () => {
    setComplete(!complete);

    const updatedFields = {
      ...todo,
      completed: !todo.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };

    updateTodo(updatedTodo);
  };

  const editCheckAndSubmit = () => {
    if (!task.length) {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedFields = {
      ...todo,
      task: task,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };

    updateTodo(updatedTodo);
    setIsEditing(false);
  };

  return (
    <HStack key={todo.id} m={2} alignItems="center">
      {showOptions && (
        <Checkbox
          colorScheme="teal"
          size="md"
          borderColor="teal"
          onChange={updateChecked}
          isChecked={complete}
        ></Checkbox>
      )}
      {!isEditing && (
        <Text
          as={complete && 's'}
          fontSize="md"
          color={complete && useColorModeValue('gray.600', 'gray.400')}
        >
          {task}
        </Text>
      )}

      {isEditing && (
        <>
          <Textarea
            onChange={(event) => setTask(event.target.value)}
            value={task}
            borderStyle="none"
            _focus={{ borderStyle: 'none' }}
            _hover={{ borderStyle: 'none' }}
            autoFocus
            onFocus={(e) => {
              var val = e.target.value;
              e.target.value = '';
              e.target.value = val;
            }}
          />
          <IconButton
            icon={<FaCheck />}
            isRound="true"
            onClick={editCheckAndSubmit}
            size="sm"
            colorScheme="teal"
          />
        </>
      )}
      {!isEditing && <Spacer />}
      {!isEditing && showOptions && (
        <HStack spacing="3">
          <IconButton
            icon={<FaEdit />}
            isRound="true"
            onClick={() => setIsEditing(true)}
            size="sm"
          />
          <IconButton
            icon={<FaTrash />}
            isRound="true"
            onClick={() => deleteTodo(todo)}
            size="sm"
          />
        </HStack>
      )}
    </HStack>
  );
};

export default TodoItem;
