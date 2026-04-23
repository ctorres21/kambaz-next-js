import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { ListGroupItem, Button } from "react-bootstrap";
export default function TodoItem({ todo }: { todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
      <span className="flex-grow-1">{todo.title}</span>
      <Button onClick={() => dispatch(setTodo(todo))} className="me-1" id="wd-set-todo-click">Edit</Button>
      <Button onClick={() => dispatch(deleteTodo(todo.id))} variant="danger" id="wd-delete-todo-click">Delete</Button>
    </ListGroupItem>
  );
}