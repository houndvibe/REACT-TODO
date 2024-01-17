import { nanoid } from "@reduxjs/toolkit";
import { todoProps } from "../types";
import TodoItem from "./TodoItem";
import { useState } from "react";

interface todoListProps {
  todos: todoProps[];
}

const TodoList: React.FC<todoListProps> = ({ todos }) => {
  const [currentTodoId, setCurrentTodoId] = useState<string>("");

  const handleClickTodoItem = (id: string) => () => {
    setCurrentTodoId(id);
  };

  const renderedList = todos.map((todo: todoProps) => {
    return (
      <div key={nanoid()} onClick={handleClickTodoItem(todo.id)}>
        <TodoItem
          todoItem={todo}
          isOpen={currentTodoId == todo.id ? true : false}
        />
      </div>
    );
  });

  return <div>{renderedList}</div>;
};

export default TodoList;
