import {
  TodoContext,
  TodoContextInterface,
} from "../../../../contexts/TodoContext";
import { Button, Group } from "@mantine/core";
import React from "react";

export type TodoFilterPropsType = {
  category: string;
  setCategory: (category: string) => void;
};

const TodoFilter: React.FC<TodoFilterPropsType> = ({
  category,
  setCategory,
}) => {
  const { filterTask } = React.useContext<TodoContextInterface>(TodoContext);
  function handleFilter(category: string) {
    setCategory(category);
    filterTask(category);
  }
  return (
    <Group mt={"sm"}>
      <Button
        variant={category === "all" ? "filled" : "light"}
        onClick={(e) => handleFilter("all")}
      >
        All
      </Button>
      <Button
        variant={category === "completed" ? "filled" : "light"}
        onClick={(e) => handleFilter("completed")}
      >
        Completed
      </Button>
      <Button
        variant={category === "pending" ? "filled" : "light"}
        onClick={(e) => handleFilter("pending")}
      >
        Pending
      </Button>
    </Group>
  );
};

export default TodoFilter;
