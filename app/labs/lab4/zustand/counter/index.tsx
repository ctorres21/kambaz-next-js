"use client";
import { useCounterStore } from "./useCounterStore";
export default function ZustandCounter() {
  const { count, increase, decrease, setCount, reset } = useCounterStore((s) => s);
  return (
    <div className="m-2">
      <h2>Zustand Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => increase(1)} className="btn btn-success me-1">Increase</button>
      <button onClick={() => decrease(1)} className="btn btn-danger me-1">Decrease</button>
      <button onClick={() => setCount(10)} className="btn btn-warning me-1">Set to 10</button>
      <button onClick={() => reset()} className="btn btn-secondary">Reset</button>
      <hr />
    </div>
  );
}