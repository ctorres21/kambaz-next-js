import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";
export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl className="me-2" value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
      <Button onClick={() => dispatch(updateTodo(todo))} className="me-1" id="wd-update-todo-click">Update</Button>
      <Button onClick={() => dispatch(addTodo(todo))} variant="success" id="wd-add-todo-click">Add</Button>
    </ListGroupItem>
  );
}