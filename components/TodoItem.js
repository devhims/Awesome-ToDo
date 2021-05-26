import { useState, useContext } from 'react';
import { TodosContext } from '../contexts/TodoContext';

import {
  Checkbox,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  useToast,
  Textarea,
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo }) => {
  // console.log(todo);
  const [complete, setComplete] = useState(todo.completed);
  const [task, setTask] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const { updateTodo, deleteTodo } = useContext(TodosContext);

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
      <Checkbox
        colorScheme="teal"
        size="md"
        borderColor="teal"
        onChange={updateChecked}
        isChecked={complete}
      ></Checkbox>
      {!isEditing && (
        <Text as={complete && 's'} fontSize="md">
          {task}
        </Text>
      )}

      {isEditing && (
        <>
          <Textarea
            // size="sm"
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
      {!isEditing && (
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
