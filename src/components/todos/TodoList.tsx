import { nanoid } from "@reduxjs/toolkit";
import { todoListProps, todoProps } from "../../types";
import TodoItem from "./TodoItem";
import { useState } from "react";
import { useProcessTodos } from "../../hooks/useProcessTodos";

const TodoList: React.FC<todoListProps> = ({
  currentUserTodos,
  viewParams,
}) => {
  const sortedAndFilteredTodods = useProcessTodos(currentUserTodos, viewParams);

  const [currentTodoId, setCurrentTodoId] = useState<string>("");

  const handleClickTodoItem = (id: string) => () => {
    setCurrentTodoId(id);
  };

  const handleCloseAllTodos = () => {
    setCurrentTodoId("");
  };

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

  return <div className="max-h-[70vh] overflow-y-auto">{renderedList}</div>;
};

export default TodoList;
