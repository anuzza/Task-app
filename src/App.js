import React, { useCallback, useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useFetch from './hooks/useFetch';

function App() {
   const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback( tasksObj =>{
    const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    
  },[]);

  const {isLoading, error, sendRequest: fetchTasks} = useFetch(transformTasks);

  

  useEffect(() => {
    fetchTasks({url:'https://react-http-76fdb-default-rtdb.firebaseio.com//tasks.json'});
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
