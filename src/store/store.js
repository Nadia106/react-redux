import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./error";
import { logger } from "./middleware/logger";
import taskReduser from "./task";

const rootReducer = combineReducers({
  errors: errorReducer,
  tasks: taskReduser
})

function createStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== "production"
  });
}
export default createStore;

// const middlewareEnhancer = applyMiddleware(logger, thunk);
// taskReduser,
// compose(
//   middlewareEnhancer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
// )
