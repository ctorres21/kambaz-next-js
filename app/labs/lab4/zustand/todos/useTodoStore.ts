import { create } from "zustand";
interface Todo { id: string; title: string; }
interface TodoState {
  todos: Todo[]; todo: Todo;
  setTodo: (t: Todo) => void; addTodo: () => void; deleteTodo: (id: string) => void; updateTodo: () => void;
}
export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [{ id: "1", title: "Learn React" }, { id: "2", title: "Learn Node" }],
  todo: { id: "-1", title: "Learn Mongo" },
  setTodo: (t) => set({ todo: t }),
  addTodo: () => {
    const { todos, todo } = get();
    set({ todos: [...todos, { ...todo, id: Date.now().toString() }], todo: { id: "-1", title: "" } });
  },
  deleteTodo: (id) => set((s) => ({ todos: s.todos.filter((t) => t.id !== id) })),
  updateTodo: () => {
    const { todos, todo } = get();
    set({ todos: todos.map((t) => (t.id === todo.id ? todo : t)), todo: { id: "-1", title: "" } });
  },
}));