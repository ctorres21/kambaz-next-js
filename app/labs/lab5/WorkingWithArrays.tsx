"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1", title: "NodeJS Assignment", description: "Create a NodeJS server",
    due: "2021-09-09", completed: false,
  });
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary me-2" href={API}>Get Todos</a>
      <a id="wd-retrieve-completed-todos" className="btn btn-primary me-2"
        href={`${API}?completed=true`}>Get Completed Todos</a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <FormControl id="wd-todo-id" defaultValue={todo.id} className="w-50 mb-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <a id="wd-retrieve-todo-by-id" className="btn btn-primary me-2"
        href={`${API}/${todo.id}`}>Get Todo by ID</a>
      <hr />
      <h4>Creating new Items in an Array</h4>
      <a className="btn btn-primary me-2" href={`${API}/create`}>Create Todo</a>
      <hr />
      <h4>Deleting from an Array</h4>
      <FormControl defaultValue={todo.id} className="w-50 mb-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <a id="wd-remove-todo" className="btn btn-primary me-2"
        href={`${API}/${todo.id}/delete`}>Delete Todo with ID = {todo.id}</a>
      <hr />
      <h4>Updating an Item in an Array</h4>
      <FormControl defaultValue={todo.id} className="w-25 float-start me-2 mb-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })} />
      <FormControl defaultValue={todo.title} className="w-50 float-start mb-2"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
      <br className="clearfix" /><br />
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary me-2">
        Update Title</a>
      <hr />
      <h4>Updating Completed</h4>
      <input type="checkbox" className="form-check-input me-2" defaultChecked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })} />
      <a href={`${API}/${todo.id}/completed/${todo.completed}`} className="btn btn-primary me-2">
        Complete Todo ID = {todo.id}</a>
      <hr />
      <h4>Updating Description</h4>
      <FormControl defaultValue={todo.description} className="w-50 mb-2"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
      <a href={`${API}/${todo.id}/description/${todo.description}`} className="btn btn-primary me-2">
        Describe Todo ID = {todo.id}</a>
      <hr />
    </div>
  );
}