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
} from '@chakra-ui/react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [complete, setComplete] = useState(todo.fields.completed);
  // const [item, setItem] = useState(todo.todo);
  const [item, setItem] = useState(todo.fields.task);
  const toast = useToast();

  const { updateTodo, deleteTodo } = useContext(TodosContext);

  const handleUpdate = () => {
    setComplete(!complete);
    const updatedFields = {
      ...todo.fields,
      completed: !todo.fields.completed,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };

    updateTodo(updatedTodo);
  };

  const editCheckAndSubmit = () => {
    if (!item.length) {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedFields = {
      ...todo.fields,
      task: item,
    };
    const updatedTodo = { id: todo.id, fields: updatedFields };

    updateTodo(updatedTodo);

    // setItem(item.trim());
    setIsEditing(false);
  };

  return (
    <HStack key={todo.id} m={2} alignItems="center">
      <Checkbox
        //isChecked={todo.fields.completed}
        colorScheme="teal"
        size="md"
        borderColor="teal"
        onChange={handleUpdate}
        isChecked={complete}
      ></Checkbox>
      {!isEditing && (
        <Text as={complete && 's'} fontSize="md">
          {item}
        </Text>
      )}
      {isEditing && (
        <>
          <Input
            size="sm"
            onChange={(event) => setItem(event.target.value)}
            value={item}
            borderStyle="none"
            _focus={{ borderStyle: 'none' }}
            _hover={{ borderStyle: 'none' }}
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
      <Spacer />
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
          onClick={() => deleteTodo(todo.id)}
          size="sm"
        />
      </HStack>
    </HStack>
  );
};

export default TodoItem;
