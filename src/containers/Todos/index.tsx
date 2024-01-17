import React from "react";
import { Container } from "@mantine/core";

import Todos from "../../components/Todos";
import Header from "../../components/Header";
import TodoProvider from "../../contexts/TodoContext";

export type TodoContainerPropsType = {};

const TodosContainer: React.FC<TodoContainerPropsType> = () => {
  return (
    <Container>
      <Header title="Todo List" />
      <TodoProvider>
        <Todos />
      </TodoProvider>
    </Container>
  );
};

export default TodosContainer;
