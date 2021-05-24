import { Flex, Box, Badge } from '@chakra-ui/react';
import moment from 'moment';
import TodoItems from '../components/TodoItems';

const TodoGroup = ({ date, todos, onDeleteTodoItem }) => {
  //   console.log(date);
  return (
    <>
      <Badge
        m={2}
        p={2}
        w={100}
        colorScheme="teal"
        borderLeft="2px"
        roundedTopRight="md"
        roundedBottomRight="md"
      >
        {moment(date).format('LL')}
      </Badge>
      <TodoItems onDeleteTodo={onDeleteTodoItem} todoItems={todos} />
    </>
  );
};

export default TodoGroup;
