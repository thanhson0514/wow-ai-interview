import React from "react";
import {
  ActionIcon,
  Card,
  Checkbox,
  Container,
  Flex,
  Group,
  Menu,
  Text,
} from "@mantine/core";
import { Trash, DotsCircleHorizontal } from "tabler-icons-react";
import { Draggable } from "react-beautiful-dnd";

import {
  TodoContext,
  TodoContextInterface,
} from "../../../../contexts/TodoContext";
import MenuTodoItem from "../TodoMenuItem";
import ModalEditTodo from "../ModalEditTodo";
import { Task } from "../../../../types";

export type TodoItemPropsType = {
  task: Task;
  index: number;
};

const TodoItem: React.FC<TodoItemPropsType> = React.forwardRef(
  ({ index, task }: TodoItemPropsType, ref: any) => {
    // states
    const [openedMenu, setOpenedMenu] = React.useState<boolean>(false);
    const [openedEditModal, setOpenedEditModal] =
      React.useState<boolean>(false);

    // contexts
    const { completeHandler, pendingHandler, deleteTask, editTask } =
      React.useContext<TodoContextInterface>(TodoContext);

    const { done, id, pending, summary, title } = task;

    function onHandlerOpenMenu() {
      setOpenedMenu(!openedMenu);
    }

    function handlerEditTask(id: string) {
      setOpenedEditModal(true);
    }

    return (
      <Container ref={ref}>
        <Draggable draggableId={id} index={index}>
          {(provided) => (
            <Card
              withBorder
              key={id}
              mt={"sm"}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Group justify="space-between" align="flex-start">
                <Text fs={"bold"} style={{ wordBreak: "break-all" }}>
                  {title}
                </Text>
                <Group>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        color={"blue"}
                        variant={"transparent"}
                        onClick={onHandlerOpenMenu}
                      >
                        <DotsCircleHorizontal />
                      </ActionIcon>
                    </Menu.Target>
                    <MenuTodoItem
                      id={id}
                      onDelete={deleteTask}
                      onEdit={handlerEditTask}
                    />
                  </Menu>
                </Group>
              </Group>
              <Text
                c={"dimmed"}
                size={"md"}
                mt={"sm"}
                style={{ wordBreak: "break-all" }}
              >
                {summary ? summary : "No summary was provided for this task"}
              </Text>
              <Flex
                direction={{ base: "row", sm: "row" }}
                gap={{ base: "sm", sm: "lg" }}
                justify={"space-around"}
              >
                <Group>
                  <Checkbox
                    checked={done}
                    onClick={() => completeHandler(id)}
                    color={"blue"}
                  />
                  <span>Done</span>
                </Group>
                <Group>
                  <Checkbox
                    checked={pending}
                    onClick={() => pendingHandler(id)}
                    color={"yellow"}
                  />{" "}
                  <span>Pending</span>
                </Group>
              </Flex>
            </Card>
          )}
        </Draggable>
        <ModalEditTodo
          opened={openedEditModal}
          setOpened={setOpenedEditModal}
          titleModel="Edit Task"
          editTask={editTask}
          task={task}
        />
      </Container>
    );
  }
);

export default TodoItem;
