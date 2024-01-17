import React from "react";
import { uuid } from "uuidv4";
import { Container, Button } from "@mantine/core";

import ModalAddTodo from "../ModalAddTodo";
import { Task } from "../../../../types";

export type TodosPropsType = {
  taskTitle: React.RefObject<HTMLInputElement>;
  taskSummary: React.RefObject<HTMLInputElement>;
  loadTasks: () => void;
  tasks: Task[];
};

const AddTodo: React.FC<TodosPropsType> = ({
  taskSummary,
  taskTitle,
  loadTasks,
  tasks,
}) => {
  // states
  const [opened, setOpened] = React.useState<boolean>(false);

  function createTask() {
    const title = taskTitle.current?.value as string;
    const summary = taskSummary.current?.value as string;
    console.log("Title: ", title);
    console.log("Summary: ", summary);
    saveTask({
      title: title,
      summary: summary,
      id: String(Math.random() * 5000),
      done: false,
      pending: false,
      position: tasks.length,
    });
    loadTasks();
  }

  function saveTask(saveTask: Task) {
    localStorage.setItem("tasks", JSON.stringify([...tasks, saveTask]));
  }

  return (
    <Container>
      <ModalAddTodo
        createTask={createTask}
        taskSummary={taskSummary}
        taskTitle={taskTitle}
        opened={opened}
        setOpened={setOpened}
        title="Create Task"
      />
      <Button
        fullWidth
        mt={"md"}
        onClick={() => {
          setOpened(true);
        }}
      >
        New Task
      </Button>
    </Container>
  );
};

export default AddTodo;
