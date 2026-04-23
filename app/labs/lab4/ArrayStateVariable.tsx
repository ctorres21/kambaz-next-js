import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  const addElement = () => { setArray([...array, Math.floor(Math.random() * 100)]); };
  const deleteElement = (index: number) => { setArray(array.filter((_, i) => i !== index)); };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success">Add Element</button>
      <ul>
        {array.map((item, index) => (
          <li key={index}> {item}
            <button onClick={() => deleteElement(index)} className="btn btn-danger ms-2">Delete</button>
          </li>
        ))}
      </ul>
      <h3>Todos from Redux</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
