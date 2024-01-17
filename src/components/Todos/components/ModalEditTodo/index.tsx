import React from "react";
import { Button, Group, Modal, TextInput, TextInputProps } from "@mantine/core";
import { Task } from "../../../../types";

export type ModalEditTodoPropsType = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  task: Task;
  editTask: (id: string, data: Task) => void;
  titleModel: string;
};

const ModalEditTodo: React.FC<ModalEditTodoPropsType> = ({
  opened,
  setOpened,
  task,
  editTask,
  titleModel,
}) => {
  const [taskEdit, setTaskEdit] = React.useState<Task>(task);

  function handlerEdit(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskEdit({ ...taskEdit, [e.target.name]: e.currentTarget.value });
  }

  return (
    <Modal
      opened={opened}
      size={"md"}
      title={titleModel}
      withCloseButton={false}
      onClose={() => {
        setOpened(false);
      }}
    >
      <TextInput
        name="title"
        mt={"md"}
        placeholder={"Task Title"}
        required
        label={"Title"}
        value={taskEdit.title}
        onChange={handlerEdit}
      />
      <TextInput
        name="summary"
        mt={"md"}
        placeholder={"Task Summary"}
        label={"Summary"}
        value={taskEdit.summary}
        onChange={handlerEdit}
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
            editTask(taskEdit.id, taskEdit);
            setOpened(false);
          }}
        >
          Update Task
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalEditTodo;
