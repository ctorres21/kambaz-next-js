import { create } from "zustand";
interface CounterState {
  count: number; increase: (by: number) => void; decrease: (by: number) => void;
  setCount: (count: number) => void; reset: () => void;
}
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: (by) => set((s) => ({ count: s.count + by })),
  decrease: (by) => set((s) => ({ count: s.count - by })),
  setCount: (count) => set({ count }),
  reset: () => set({ count: 0 }),
}));
