"use client";
import { useCounter } from "./context";
export default function CounterContext() {
  const { count, increment, decrement } = useCounter()!;
  return (
    <div id="wd-counter-context">
      <h2>Counter Context</h2>
      <h3>{count}</h3>
      <button onClick={increment} className="btn btn-success me-1" id="wd-counter-context-increment-click">Increment</button>
      <button onClick={decrement} className="btn btn-danger" id="wd-counter-context-decrement-click">Decrement</button>
      <hr />
    </div>
  );
}