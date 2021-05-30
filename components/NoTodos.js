import { Text, Box, Center } from '@chakra-ui/react';

const NoTodos = () => {
  return (
    <Center pos="fixed" left="50%" top="50%" transform="translate(-50%, -50%)">
      <Box
        borderWidth="2px"
        borderRadius="lg"
        px={5}
        py={3}
        textAlign="center"
        minW="200px"
      >
        <Text fontSize="medium">No tasks available</Text>
      </Box>
    </Center>
  );
};

export default NoTodos;
