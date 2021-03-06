import TodoItem from './TodoItem';
import { Box } from '@chakra-ui/react';

const TodoItems = ({ todoItems }) => {
  return (
    <>
      {todoItems.map((todoItem) => {
        return (
          <Box
            borderColor="teal.600"
            borderWidth="2px"
            m={2}
            px={2}
            py={0.5}
            borderRadius="5px"
            key={todoItem.id}
          >
            <TodoItem todo={todoItem} />
          </Box>
        );
      })}
    </>
  );
};

export default TodoItems;
