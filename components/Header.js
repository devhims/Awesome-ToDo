import {
  Heading,
  HStack,
  useColorModeValue,
  Flex,
  Button,
} from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
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
        <Button variant="outline">Login</Button>
        <ThemeToggle />
      </HStack>
    </Flex>
  );
};

export default Header;
