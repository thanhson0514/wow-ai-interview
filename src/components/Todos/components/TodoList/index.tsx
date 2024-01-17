import React from "react";
import FlipMove from "react-flip-move";
import { Droppable, DragDropContext, DropResult } from "react-beautiful-dnd";

import { Task } from "../../../../types";
import TodoItem from "../TodoItem";
import { Text } from "@mantine/core";
import {
  TodoContext,
  TodoContextInterface,
} from "../../../../contexts/TodoContext";

export type TodoListPropsType = {
  tasks: Task[];
};

const TodoList: React.FC<TodoListPropsType> = ({ tasks }) => {
  // states
  const [dragging, setDragging] = React.useState<boolean>(false);

  // contexts
  const { moveTodo } = React.useContext<TodoContextInterface>(TodoContext);

  function onDragEnd(drag: DropResult) {
    if (!drag.destination) return console.log(drag);
    if (moveTodo) moveTodo(drag.source.index, drag.destination.index);
    setTimeout(() => setDragging(false), 200);
  }

  return (
    <DragDropContext
      onBeforeDragStart={() => setDragging(true)}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="0">
        {(provided) =>
          tasks?.length > 0 ? (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {/* <FlipMove> */}
              {tasks?.map((task, index) => (
                <TodoItem key={task.id} task={task} index={index} />
              ))}
              {/* </FlipMove> */}
              {provided.placeholder}
            </div>
          ) : (
            <Text size={"lg"} mt={"md"} color={"dimmed"}>
              You have no tasks
            </Text>
          )
        }
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
