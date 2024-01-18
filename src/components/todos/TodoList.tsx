import { nanoid } from "@reduxjs/toolkit";
import { todoProps } from "../../types";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { todoListViewParamsProps } from "../../routes/UserPage";
import { useProcessTodos } from "../../hooks/useProcessTodos";

interface todoListProps {
  currentUserTodos: todoProps[];
  viewParams: todoListViewParamsProps;
}

const TodoList: React.FC<todoListProps> = ({
  currentUserTodos,
  viewParams,
}) => {
  const [currentTodoId, setCurrentTodoId] = useState<string>("");

  const handleClickTodoItem = (id: string) => () => {
    setCurrentTodoId(id);
  };
  const handleCloseAllTodos = () => {
    setCurrentTodoId("");
  };

  const sortedAndFilteredTodods = useProcessTodos(currentUserTodos, viewParams);

  const renderedList = sortedAndFilteredTodods.map((todo: todoProps, index) => {
    return (
      <div key={nanoid()} onClick={handleClickTodoItem(todo.id)}>
        <TodoItem
          todoItem={todo}
          isOpen={currentTodoId == todo.id ? true : false}
          handleCloseAllTodos={handleCloseAllTodos}
          index={index}
        />
      </div>
    );
  });

  return (
    <div className="mt-4 max-h-[68vh] overflow-y-auto">{renderedList}</div>
  );
};

export default TodoList;
