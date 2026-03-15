"use client";
import HelloRedux from "./hello";
import CounterRedux from "./CounterRedux";
import AddRedux from "./AddRedux";
import TodoList from "./todos/TodoList";
import store from "../store";
import { Provider } from "react-redux";
export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <div>
        <h2>Redux Examples</h2>
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <TodoList />
      </div>
    </Provider>
  );
}