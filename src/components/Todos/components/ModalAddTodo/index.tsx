import React from "react";
import { Button, Group, Modal, TextInput } from "@mantine/core";

export type ModalAddTodoPropsType = {
  title: string;
  opened: boolean;
  setOpened: (opened: boolean) => void;
  taskTitle: React.RefObject<HTMLInputElement>;
  taskSummary: React.RefObject<HTMLInputElement>;
  createTask: () => void;
};

const ModalAddTodo: React.FC<ModalAddTodoPropsType> = ({
  opened,
  setOpened,
  title = "Modal",
  taskSummary,
  taskTitle,
  createTask,
}) => {
  return (
    <Modal
      opened={opened}
      size={"md"}
      title={title}
      withCloseButton={false}
      onClose={() => {
        setOpened(false);
      }}
    >
      <TextInput
        mt={"md"}
        ref={taskTitle}
        placeholder={"Task Title"}
        required
        label={"Title"}
      />
      <TextInput
        ref={taskSummary}
        mt={"md"}
        placeholder={"Task Summary"}
        label={"Summary"}
      />
      <Group mt={"md"}>
        <Button
          onClick={() => {
            setOpened(false);
          }}
          variant={"subtle"}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            createTask();
            setOpened(false);
          }}
        >
          Create Task
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalAddTodo;
