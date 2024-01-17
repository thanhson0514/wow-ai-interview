import React from "react";
import { Task } from "../types";

export interface TodoContextInterface {
  tasks: Task[];
  moveTodo: (old: number, new_: number) => void;
  setTasks: (tasks: Task[]) => void;
  loadTasks: () => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, data: Task) => void;
  completeHandler: (id: string) => void;
  pendingHandler: (id: string) => void;
  filterTask: (category: string) => void;
}

export const TodoContext = React.createContext<TodoContextInterface>({
  tasks: [],
  moveTodo: (old: number, new_: number) => {},
  setTasks: (tasks: Task[]) => {},
  loadTasks: () => {},
  deleteTask: (id: string) => {},
  editTask: (id: string, data: Task) => {},
  completeHandler: (id: string) => {},
  pendingHandler: (id: string) => {},
  filterTask: (category: string) => {},
});

export type TodoProviderProps = {
  children: React.ReactNode;
};

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [tasks, setTasks] = React.useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  React.useEffect(() => {
    tasks.sort((taskA: Task, taskB: Task) => taskA.position - taskB.position);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, []);

  function moveTodo(old: number, new_: number) {
    const copy = JSON.parse(JSON.stringify(tasks));
    copy[new_].position = old;
    copy[old].position = new_;
    copy.sort((taskA: Task, taskB: Task) => taskA.position - taskB.position);
    setTasks(copy);
    const taskOrigin = copy[old];
    localStorage.setItem("tasks", JSON.stringify(copy));
  }

  function completeHandler(id: string) {
    const copy = JSON.parse(JSON.stringify(tasks));
    copy.forEach((task: Task) => {
      if (task.id === id) task.done = !task.done;
    });
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
    loadTasks();
  }

  function pendingHandler(id: string) {
    const copy = JSON.parse(JSON.stringify(tasks));
    copy.forEach((task: Task) => {
      if (task.id === id) task.pending = !task.pending;
    });
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
    loadTasks();
  }

  function loadTasks() {
    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
  }

  function deleteTask(id: string) {
    const copy = JSON.parse(JSON.stringify(tasks));
    const filter = copy.filter((task: Task) => task.id !== id);
    setTasks(filter);
    localStorage.setItem("tasks", JSON.stringify(filter));
    loadTasks();
  }

  function editTask(id: string, data: Task) {
    const copy = JSON.parse(JSON.stringify(tasks));
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].id === id) {
        copy[i] = data;
      }
    }
    setTasks(copy);
    localStorage.setItem("tasks", JSON.stringify(copy));
    loadTasks();
  }

  function filterTask(category: string) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    console.log("tasks filter:", tasks);
    if (category === "all") {
      setTasks(tasks);
    } else if (category === "completed")
      setTasks(tasks.filter((task: Task) => task.done));
    else if (category === "pending")
      setTasks(tasks.filter((task: Task) => task.pending));
    else setTasks(tasks);
  }

  return (
    <TodoContext.Provider
      value={{
        moveTodo: moveTodo,
        tasks: tasks,
        setTasks: setTasks,
        loadTasks: loadTasks,
        deleteTask: deleteTask,
        editTask: editTask,
        completeHandler: completeHandler,
        pendingHandler: pendingHandler,
        filterTask: filterTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
