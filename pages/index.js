import { useUser, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Center, Spinner, Box, Text } from '@chakra-ui/react';

export default function Home() {
  // const [todoItems, setTodoItems] = useState([]);

  const { user, error, isLoading } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/authtodos');
    }
  }, [user]);

  if (isLoading)
    return (
      <Center pos="fixed" left="50%" top="50%">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  if (error)
    return (
      <Center
        pos="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Box
          borderWidth="2px"
          borderRadius="lg"
          px={5}
          py={3}
          textAlign="center"
        >
          <Text fontSize="medium">{error.message}</Text>
        </Box>
      </Center>
    );

  return (
    <>
      {!user && (
        <Center
          pos="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Box
            borderWidth="2px"
            borderRadius="lg"
            px={5}
            py={3}
            textAlign="center"
          >
            <Text fontSize="medium">Please login to save your tasks</Text>
          </Box>
        </Center>
      )}
      {user && (
        <Center pos="fixed" left="50%" top="50%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      )}
    </>
  );
}

// { filterByFormula: `userId = '${user.user.sub}'` }
