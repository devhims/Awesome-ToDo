import { Flex, Box } from '@chakra-ui/react';
import NoTodos from './NoTodos';
import TodoGroup from './TodoGroup';
import TodoItems from './TodoItems';

const TodoList = ({ todos }) => {
  if (!todos.length) return <NoTodos />;

  return <TodoGroup todoItems={todos} />;

  // return <TodoItems todoItems={todos} />;
};

export default TodoList;
