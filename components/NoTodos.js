import { Badge, Text, Box, Flex } from '@chakra-ui/react';

const NoTodos = () => {
  return (
    <Box
      borderWidth="2px"
      borderRadius="lg"
      p={2}
      textAlign="center"
      mx={2}
      my={4}
    >
      <Text fontSize="medium">No tasks available</Text>
    </Box>
  );
};

export default NoTodos;
