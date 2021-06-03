import { createContext, useState, useContext } from 'react';
const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [canCheck, setCanCheck] = useState(false);

  const addTodo = async (todo) => {
    try {
      setTodos((prevTodos) => {
        const updatedTodos = [todo, ...prevTodos];
        return updatedTodos;
      });

      const res = await fetch('/api/createTodo', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' },
      });
      const newTodo = await res.json();

      setTodos((prevTodos) => {
        const existingTodos = [...prevTodos];
        const existingTodo = existingTodos.find(
          (entry) => entry.fields === todo.fields
        );
        existingTodo.id = newTodo.id;
        // console.log(existingTodos);
        return existingTodos;
      });

      setCanCheck(true);
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

      console.log(updatedTodo);

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

  const deleteTodo = async (selectedTodo) => {
    try {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== selectedTodo.id);
      });

      await fetch('/api/deleteTodo', {
        method: 'Delete',
        body: JSON.stringify(selectedTodo),
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
        updateTodo,
        deleteTodo,
        addTodo,
        canCheck,
        setCanCheck,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

const useCount = () => {
  const context = useContext(TodosContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
};

export { TodosProvider, useCount };
