import { useMemo } from "react";

export const useProcessTodos = (todos, todoListViewParams) => {
  const sortFunctionsByTypes = {
    newFirst: (a, b) => new Date(b.date) - new Date(a.date),
    oldFirst: (a, b) => new Date(a.date) - new Date(b.date),
  };

  const filteredTodos = useMemo(() => {
    return todoListViewParams.filterType == "all"
      ? todos
      : todos.filter((todo) => todo.status == todoListViewParams.filterType);
  }, [todos, todoListViewParams.filterType]);

  const filteredAndSorted = useMemo(() => {
    return [...filteredTodos].sort(
      sortFunctionsByTypes[todoListViewParams.sortType],
    );
  }, [filteredTodos, todoListViewParams.sortType]);

  return filteredAndSorted;
};
