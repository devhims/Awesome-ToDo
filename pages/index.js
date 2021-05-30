import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Center, Spinner, Box, Text } from '@chakra-ui/react';

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/authtodos');
    }
  }, [user]);

  const PageCenter = ({ children }) => {
    return (
      <Center
        pos="fixed"
        left="50%"
        top="50%"
        transform="translate(-50%, -50%)"
      >
        {children}
      </Center>
    );
  };

  if (isLoading)
    return (
      <PageCenter>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </PageCenter>
    );

  if (error)
    return (
      <PageCenter>
        <Box
          borderWidth="2px"
          borderRadius="lg"
          px={5}
          py={3}
          textAlign="center"
        >
          <Text fontSize="medium">{error.message}</Text>
        </Box>
      </PageCenter>
    );

  return (
    <>
      {!user && (
        <PageCenter>
          <Box
            borderWidth="2px"
            borderRadius="lg"
            px={5}
            py={3}
            textAlign="center"
            minW="200px"
          >
            <Text fontSize="medium">
              Please login to save and view your tasks
            </Text>
          </Box>
        </PageCenter>
      )}
      {user && (
        <PageCenter>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </PageCenter>
      )}
    </>
  );
}
