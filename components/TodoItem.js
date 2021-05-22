import { useState } from 'react';
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

const TodoItem = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [item, setItem] = useState(todo.todo);
  const toast = useToast();

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
    setItem(item.trim());
    setIsEditing(false);
  };

  return (
    <HStack key={todo.id} m={2} alignItems="center">
      <Checkbox
        colorScheme="teal"
        size="md"
        borderColor="teal"
        onChange={() => setComplete(!complete)}
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
          onClick={() => onDelete(todo.id)}
          size="sm"
        />
      </HStack>
    </HStack>
  );
};

export default TodoItem;
