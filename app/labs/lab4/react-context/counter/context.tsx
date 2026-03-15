"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
interface CounterContextState { count: number; increment: () => void; decrement: () => void; }
const CounterContext = createContext<CounterContextState | undefined>(undefined);
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);
  return (
    <CounterContext.Provider value={{ count, increment: () => setCount((p) => p + 1), decrement: () => setCount((p) => p - 1) }}>
      {children}
    </CounterContext.Provider>
  );
};
export const useCounter = () => useContext(CounterContext);