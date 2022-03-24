import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  titleChanged,
  taskRemoved,
  completeTask,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTask
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useSelector, useDispatch } from "react-redux";
import { getError } from "./store/error";

const store = configureStore();

const App = (params) => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const removeTask = (taskId) => {
    dispatch(taskRemoved(taskId));
  };

  const addTask = () => {
    dispatch(createTask({ userId: 1, title: "newTask", completed: false }));
  };

  if (isLoading === true) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <button onClick={addTask}>add task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              update state
            </button>
            <button onClick={() => changeTitle(el.id)}>change title</button>
            <button onClick={() => removeTask(el.id)}>delete task</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// const completeTask = (taskId) => {
//   dispatch((dispatch, getState) => {
//     dispatch(taskCompleted(taskId));
//   });
// };
