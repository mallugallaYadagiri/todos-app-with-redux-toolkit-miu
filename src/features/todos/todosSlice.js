import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = { todos: [] };

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        status: action.payload.status,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const { id, text, status } = action.payload;

      const todoEdit = state.todos.find((todo) => todo.id === id);

      if (todoEdit) {
        todoEdit.text = text;
        todoEdit.status = status;
      }
    },
  },
});

export const { addTodo, removeTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
