import Head from 'next/head';
import Header from '../components/Header';
import TodoForm from '../components/TodoForm';

import { VStack, Flex, Box, useColorModeValue } from '@chakra-ui/react';

import TodoList from '../components/TodoList';

import { useState } from 'react';

export default function Home() {
  const [todoItems, setTodoItems] = useState([]);

  const addTodo = (addedTodo) => {
    setTodoItems((oldTodos) => [addedTodo, ...oldTodos]);
  };

  const deleteTodo = (id) => {
    const newTodoItems = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodoItems);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <VStack spacing={8} alignItems="center" justifyContent="space-evenly">
        <Header />
        <Flex
          direction="column"
          p={3}
          borderRadius="md"
          width="100%"
          maxWidth={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        >
          <TodoForm onAddTodo={addTodo} />
          <TodoList todos={todoItems} onDeleteTodoItem={deleteTodo} />
        </Flex>
      </VStack>
    </>
  );
}
