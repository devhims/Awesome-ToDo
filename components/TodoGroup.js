import { Flex, Box, Badge } from '@chakra-ui/react';
import moment from 'moment';
import TodoItems from '../components/TodoItems';

const TodoGroup = ({ todoItems }) => {
  //console.log(todoItems);

  const { datedTodos } = todoItems.reduce(
    (total, item) => {
      const { id, fields } = item;
      if (!total.datedTodos[fields.date]) {
        total.datedTodos[fields.date] = [{ id, ...fields }];
      } else {
        total.datedTodos[fields.date] = [
          ...total.datedTodos[fields.date],
          { id, ...fields },
        ];
      }
      return total;
    },
    {
      datedTodos: {},
    }
  );

  const todos = Object.values(datedTodos);
  const dates = Object.keys(datedTodos);

  // console.log(todos, dates);
  // console.log(todos[0], dates[0]);

  return (
    <>
      {dates.map((date, index) => {
        return (
          <Box key={date}>
            <Badge
              m={2}
              p={2}
              w={100}
              colorScheme="teal"
              borderLeft="2px"
              roundedTopRight="md"
              roundedBottomRight="md"
            >
              {moment(new Date(date)).format('LL')}
            </Badge>
            <TodoItems todoItems={todos[index]} />
          </Box>
        );
      })}
    </>
  );
};

export default TodoGroup;
