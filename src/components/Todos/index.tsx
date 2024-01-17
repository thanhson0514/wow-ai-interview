import React from "react";
import { Loader } from "@mantine/core";

import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import { Task } from "../../types";
import { TodoContext, TodoContextInterface } from "../../contexts/TodoContext";
import TodoFilter from "./components/TodoFilter";

export type TodosPropsType = {};

const Todos: React.FC<TodosPropsType> = () => {
  // states
  const [loading, setLoading] = React.useState<boolean>(false);
  const [category, setCategory] = React.useState<string>("all");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // ref
  const taskTitle = React.useRef<HTMLInputElement>(null);
  const taskSummary = React.useRef<HTMLInputElement>(null);

  // contexts
  const { loadTasks, tasks } =
    React.useContext<TodoContextInterface>(TodoContext);

  return (
    <div>
      <AddTodo
        taskSummary={taskSummary}
        taskTitle={taskTitle}
        loadTasks={loadTasks}
        tasks={tasks}
      />
      <TodoFilter category={category} setCategory={setCategory} />
      {!loading ? <TodoList tasks={tasks} /> : <Loader color="blue" />}
    </div>
  );
};

export default Todos;
