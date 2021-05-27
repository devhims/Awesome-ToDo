import { useContext } from 'react';
import { TodosContext } from '../contexts/TodoContext';
import NoTodos from './NoTodos';
import TodoGroup from './TodoGroup';

const TodoList = () => {
  const { todos } = useContext(TodosContext);
  if (!todos.length) return <NoTodos />;

  return <TodoGroup todoItems={todos} />;
};

export default TodoList;
