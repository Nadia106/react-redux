import { createSlice, createAction } from "@reduxjs/toolkit";
import todosService from "../services/todos.servise";
import { setError } from "./error";

const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    received(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload
      };
    },
    remove(state, action) {
      state.entities.filter((el) => el.id !== action.payload.id);
    },
    taskLoadRequested(state) {
      state.isLoading = true;
    },
    taskFailed(state) {
      state.isLoading = false;
    },
    add(state, action) {
      state.entities.push(action.payload);
    }
  }
});
const { actions, reducer: taskReducer } = taskSlice;
const { update, remove, received, taskLoadRequested, taskFailed, add } =
  actions;

const taskRequested = createAction("task/taskRequested");

export const loadTasks = () => async (dispatch) => {
  dispatch(taskLoadRequested());
  try {
    const data = await todosService.fetch();
    dispatch(received(data));
  } catch (error) {
    dispatch(taskFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.post(task);
    dispatch(add(data));
  } catch (error) {
    dispatch(taskFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `new Title for: ${id}` });
}

export function taskRemoved(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;

// const update = createAction("task/updated");
// const remove = createAction("task/removed");
// export function taskCompleted(id) {
//   return update({ id, complited: true });
// }
// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//       state[elementIndex] = { ...state[elementIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id);
//     });
// });
// const taskRequested = createAction("task/requested");
// const taskFailed = createAction("task/failed");
