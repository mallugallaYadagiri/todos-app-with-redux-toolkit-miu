import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "../features/todos/todosSlice";
const store = configureStore({
  reducer: {
    todos: todosSlice,
  },
});

export default store;
