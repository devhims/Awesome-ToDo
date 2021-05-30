import { useContext } from 'react';
import { TodosContext } from '../contexts/TodoContext';
import NoTodos from './NoTodos';
import TodoGroup from './TodoGroup';

const AllTodos = () => {
  const { todos } = useContext(TodosContext);
  if (!todos.length) return <NoTodos />;

  return <TodoGroup />;
};

export default AllTodos;
