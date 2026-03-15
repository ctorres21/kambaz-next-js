import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  todos: [{ id: "1", title: "Learn React" }, { id: "2", title: "Learn Node" }],
  todo: { id: "-1", title: "Learn Mongo" },
};
const todosSlice = createSlice({
  name: "todos", initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [...state.todos, { ...action.payload, id: new Date().getTime().toString() }];
      state.todo = { id: "-1", title: "" };
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((item) => item.id === action.payload.id ? action.payload : item);
      state.todo = { id: "-1", title: "" };
    },
    setTodo: (state, action) => { state.todo = action.payload; },
  },
});
export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;