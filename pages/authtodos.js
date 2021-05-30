import { useContext, useEffect } from 'react';
import { TodosContext } from '../contexts/TodoContext';

import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { table, minifyRecords } from '../pages/api/utils/airtable';
import { Flex } from '@chakra-ui/react';

import TodoForm from '../components/TodoForm';
import AllTodos from '../components/AllTodos';

const AuthTodos = ({ initialTodos }) => {
  const { setTodos } = useContext(TodosContext);

  useEffect(() => {
    setTodos(initialTodos);
  }, []);

  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          py={3}
          px={{ base: 0, md: 2 }}
          maxWidth={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }}
        >
          <TodoForm />
          <AllTodos />
        </Flex>
      </Flex>
    </>
  );
};

export default AuthTodos;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { user } = getSession(context.req, context.res);

    // get filtered array of todos from the table based on user id
    let todos = await table
      .select({ filterByFormula: `userId = '${user.sub}'` })
      .firstPage();

    // sort all entries in descending order of created time
    todos = todos.sort((a, b) =>
      a._rawJson.createdTime > b._rawJson.createdTime ? -1 : 1
    );

    return {
      props: {
        initialTodos: minifyRecords(todos),
      },
    };
  },
});
