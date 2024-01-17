import React from "react";
import TodosContainer from "../containers/Todos";

export type HomePropsType = {};

const HomePage: React.FC<HomePropsType> = () => {
  return <TodosContainer />;
};

export default HomePage;
