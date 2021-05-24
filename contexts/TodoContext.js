import { createContext, useState } from 'react';

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const refreshTodos = async () => {
    try {
      const res = await fetch('/api/getTodos');
      const latestTodos = await res.json();
      setTodos(latestTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (todo) => {
    try {
      // setTodos((prevTodos) => {
      //   const updatedTodos = [todo, ...prevTodos];
      //   return updatedTodos;
      // });

      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await res.json();

      // setTodos((prevTodos) => {
      //   const existingTodos = [...prevTodos];
      //   const existingTodo = existingTodos.find((entry) => entry === todo);
      //   existingTodo.id = newTodo.id;
      //   return existingTodos;
      // });

      setTodos((prevTodos) => {
        const updatedTodos = [newTodo, ...prevTodos];
        return updatedTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (todo) => todo.id === updatedTodo.id
        );
        existingTodo.fields = updatedTodo.fields;
        return existingTodos;
      });

      await fetch('/api/updateTodo', {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== id);
      });

      await fetch('/api/deleteTodo', {
        method: 'Delete',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        refreshTodos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export { TodosProvider, TodosContext };
