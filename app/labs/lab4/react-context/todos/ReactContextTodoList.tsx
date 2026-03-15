"use client";
import { useTodos } from "./todosContext";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";
export default function ReactContextTodoList() {
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = useTodos()!;
  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <ListGroupItem className="d-flex align-items-center">
          <FormControl className="me-2" value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
          <Button onClick={updateTodo} className="me-1">Update</Button>
          <Button onClick={addTodo} variant="success">Add</Button>
        </ListGroupItem>
        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex align-items-center">
            <span className="flex-grow-1">{t.title}</span>
            <Button onClick={() => setTodo(t)} className="me-1">Edit</Button>
            <Button onClick={() => deleteTodo(t.id)} variant="danger">Delete</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
