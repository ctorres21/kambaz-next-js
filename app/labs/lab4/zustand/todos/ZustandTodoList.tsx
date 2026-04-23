"use client";
import { useTodoStore } from "./useTodoStore";
import {
  ListGroup, ListGroupItem, FormControl, Button,
} from "react-bootstrap";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodoStore(
    (state) => state
  );
  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center">
          <FormControl className="me-2" value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
          <Button variant="warning" className="me-1" onClick={updateTodo}
            id="wd-update-todo-click">Update</Button>
          <Button variant="success" onClick={addTodo}
            id="wd-add-todo-click">Add</Button>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex align-items-center">
            <span className="flex-fill">{t.title}</span>
            <Button variant="primary" className="me-1"
              onClick={() => setTodo(t)} id="wd-set-todo-click">Edit</Button>
            <Button variant="danger"
              onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click">Delete</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}