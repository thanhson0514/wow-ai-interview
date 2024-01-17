import React from "react";

export type HeaderPropsType = {
  title: string;
};

const Header: React.FC<HeaderPropsType> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
