import { useContext } from 'react';
import { TodosContext } from '../contexts/TodoContext';

import { Box, Badge } from '@chakra-ui/react';
import moment from 'moment';

import TodoItems from '../components/TodoItems';

const TodoGroup = () => {
  const { todos: todoItems } = useContext(TodosContext);

  const { datedTodos } = todoItems.reduce(
    (total, item) => {
      const { id, fields } = item;
      let { date } = fields;
      date = moment(new Date(date)).format('LL');

      if (!total.datedTodos[date]) {
        total.datedTodos[date] = [{ id, ...fields }];
      } else {
        total.datedTodos[date] = [...total.datedTodos[date], { id, ...fields }];
      }
      return total;
    },
    {
      datedTodos: {},
    }
  );

  const todos = Object.values(datedTodos);
  const dates = Object.keys(datedTodos);

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
              {date}
            </Badge>
            <TodoItems todoItems={todos[index]} />
          </Box>
        );
      })}
    </>
  );
};

export default TodoGroup;
