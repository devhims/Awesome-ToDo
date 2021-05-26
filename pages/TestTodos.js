import { Button } from '@chakra-ui/button';
import { useState } from 'react';

const DUMMY_DATA = {
  '2021-05-25': [
    {
      id: 'xyz',
      fileds: {
        task: 'Get a pet',
        completed: false,
        userId: 'abc',
        date: '2021-05-25',
      },
    },
    {
      id: 'zyx',
      fileds: {
        task: 'Unity Prep',
        completed: false,
        userId: 'abc',
        date: '2021-05-25',
      },
    },
  ],
  '2021-05-26': [
    {
      id: 'yxz',
      fileds: {
        task: 'Nail the interview',
        completed: false,
        userId: 'abc',
        date: '2021-05-26',
      },
    },
    {
      id: 'yzx',
      fileds: {
        task: 'Celebrate',
        completed: false,
        userId: 'abc',
        date: '2021-05-26',
      },
    },
  ],
};

const TestTodos = () => {
  const [tasks, setTasks] = useState(DUMMY_DATA);

  const addNewTask = (task) => {
    const allTasks = { ...tasks };

    if (!allTasks[task.fields.date]) {
      allTasks[task.fields.date] = [task];
    } else {
      allTasks[task.fields.date] = [task, ...allTasks[task.fields.date]];
    }
    console.log(allTasks);
    setTasks(allTasks);
  };

  const newTask = {
    id: 'zxy',
    fields: {
      task: 'Eat Apple',
      completed: false,
      userId: 'abc',
      date: '2021-05-25',
    },
  };

  const anotherTask = {
    id: 'xzy',
    fields: {
      task: 'Eat Banana',
      completed: false,
      userId: 'abc',
      date: '2021-05-27',
    },
  };

  return <Button onClick={() => addNewTask(anotherTask)}>Check Console</Button>;
};

export default TestTodos;
