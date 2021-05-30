import {
  Heading,
  HStack,
  useColorModeValue,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

const Header = () => {
  const { user } = useUser();

  return (
    <Flex
      width="100%"
      height="75px"
      shadow="base"
      justifyContent="space-evenly"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Heading
        fontSize="2xl"
        bgGradient="linear(to-r, teal.600, teal.400, teal.300, teal.400)"
        bgClip="text"
        letterSpacing="tight"
      >
        Awesome ToDo
      </Heading>
      <HStack>
        <Button variant="outline" colorScheme="teal">
          {user ? (
            <Link href="/api/auth/logout">Logout</Link>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </Button>
        <ThemeToggle />
      </HStack>
    </Flex>
  );
};

export default Header;
