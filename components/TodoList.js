import { Flex, Box } from '@chakra-ui/react';
import NoTodos from './NoTodos';
import TodoItems from './TodoItems';

const TodoList = ({ todos, onDeleteTodoItem }) => {
  if (!todos.length) return <NoTodos />;

  return <TodoItems onDeleteTodo={onDeleteTodoItem} todoItems={todos} />;
};

export default TodoList;
