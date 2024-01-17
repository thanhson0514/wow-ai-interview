import React from "react";
import { Menu } from "@mantine/core";
import { Trash, Edit } from "tabler-icons-react";

export type MenuTodoItemPropsType = {
  id: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
};

const MenuTodoItem: React.FC<MenuTodoItemPropsType> = ({
  id,
  onDelete,
  onEdit,
}) => {
  return (
    <Menu.Dropdown>
      <Menu.Item
        color="blue"
        leftSection={<Trash size={14} />}
        onClick={() => onEdit(id)}
      >
        Edit
      </Menu.Item>
      <Menu.Item
        color="red"
        leftSection={<Trash size={14} />}
        onClick={() => onDelete(id)}
      >
        Delete
      </Menu.Item>
    </Menu.Dropdown>
  );
};

export default MenuTodoItem;
