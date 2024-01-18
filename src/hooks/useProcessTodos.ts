import { useMemo } from "react";
import { todoProps } from "../types";
import { todoListViewParamsProps } from "../routes/UserPage";

interface sortFunctionsByTypesProps {
  ["new first"]: (a: todoProps, b: todoProps) => number;
  ["old first"]: (a: todoProps, b: todoProps) => number;
}

export const useProcessTodos = (
  todos: todoProps[],
  todoListViewParams: todoListViewParamsProps,
) => {
  const sortFunctionsByTypes: sortFunctionsByTypesProps = {
    ["new first"]: (a, b): number =>
      +new Date(b.startDate) - +new Date(a.startDate),
    ["old first"]: (a, b): number =>
      +new Date(a.startDate) - +new Date(b.startDate),
  };

  const filteredTodos = useMemo(() => {
    return todoListViewParams.filterType == "all"
      ? todos
      : todos.filter(
          (todo: todoProps) => todo.status == todoListViewParams.filterType,
        );
  }, [todos, todoListViewParams.filterType]);

  const filteredAndSorted = useMemo(() => {
    return [...filteredTodos].sort(
      sortFunctionsByTypes[
        todoListViewParams.sortType as keyof typeof sortFunctionsByTypes
      ],
    );
  }, [filteredTodos, todoListViewParams.sortType]);

  return filteredAndSorted;
};
