import { useContext } from 'react';
import { TodosContext } from '../contexts/TodoContext';

import { Box, Badge } from '@chakra-ui/react';
import moment from 'moment';

import TodoItems from '../components/TodoItems';

const TodoGroup = ({ todos }) => {
  //const { todos: todoItems } = useContext(TodosContext);
  const todoItems = [...todos];

  const { datedTodos } = todoItems.reduce(
    (total, item) => {
      const { id, fields } = item;
      let { date } = fields;
      const dateView = moment(new Date(date)).format('LL');

      if (!total.datedTodos[dateView]) {
        total.datedTodos[dateView] = [{ id, ...fields }];
      } else {
        total.datedTodos[dateView] = [
          ...total.datedTodos[dateView],
          { id, ...fields },
        ];
      }
      return total;
    },
    {
      datedTodos: {},
    }
  );

  const todosForDate = Object.values(datedTodos);
  const dates = Object.keys(datedTodos);

  return (
    <>
      {dates.map((dateEntry, index) => {
        return (
          <Box key={dateEntry}>
            <Badge
              m={2}
              p={2}
              w={100}
              colorScheme="teal"
              borderLeft="2px"
              roundedTopRight="md"
              roundedBottomRight="md"
            >
              {dateEntry}
            </Badge>
            <TodoItems todoItems={todosForDate[index]} />
          </Box>
        );
      })}
    </>
  );
};

export default TodoGroup;
