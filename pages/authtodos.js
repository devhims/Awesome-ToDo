import Head from 'next/head';
import Header from '../components/Header';
import TodoForm from '../components/TodoForm';

import { VStack, Flex, Box, useColorModeValue } from '@chakra-ui/react';

import TodoList from '../components/TodoList';

import { useContext, useState, useEffect } from 'react';

import { TodosContext } from '../contexts/TodoContext';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import { table, minifyRecords } from '../pages/api/utils/airtable';

const AuthTodos = ({ initialTodos, user }) => {
  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  const addTodo = (addedTodo) => {
    setTodoItems((oldTodos) => [addedTodo, ...oldTodos]);
  };

  const deleteTodo = (id) => {
    const newTodoItems = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(newTodoItems);
  };

  return (
    <>
      <VStack spacing={8} alignItems="center" justifyContent="space-evenly">
        <Flex
          direction="column"
          py={2}
          px={{ base: 0, md: 2 }}
          borderRadius="md"
          width="100%"
          maxWidth={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        >
          <TodoForm onAddTodo={addTodo} />
          <TodoList user={user} todos={todos} onDeleteTodoItem={deleteTodo} />
        </Flex>
      </VStack>
    </>
  );
};

export default AuthTodos;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const user = getSession(context.req, context.res);
    let todos = await table
      .select({ filterByFormula: `userId = '${user.user.sub}'` })
      .firstPage();

    todos = todos.sort((a, b) =>
      a._rawJson.createdTime > b._rawJson.createdTime ? -1 : 1
    );

    // console.log(todos);
    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  },
});
