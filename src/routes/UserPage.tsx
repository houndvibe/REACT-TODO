import { useGetTodosQuery } from "../redux/todoApiSlice";
import { todoProps } from "../types";
import TodoList from "../components/todos/TodoList";
import TodoStaticPannel from "../components/todos/TodoStaticPannel";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";
import { useState } from "react";

export interface todoListViewParamsProps {
  filterType: string;
  sortType: string;
}

export const loader = ({ params }) => {
  return params.userId;
};

export const UserPage = () => {
  const { currentUser } = useAllAboutUsers();

  const [todoListViewParams, setTodoListViewParams] =
    useState<todoListViewParamsProps>({
      filterType: "all",
      sortType: "newFirst",
    });

  const {
    data: todos,
    isLoading: isTodosLoading,
    error: todosError,
  } = useGetTodosQuery(undefined);

  const handleChangeViewParams = (type: string, value: string) => {
    setTodoListViewParams({ ...todoListViewParams, [type + "Type"]: value });
  };

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == currentUser?.id)
    : [];

  return (
    <div>
      <TodoStaticPannel handleChangeViewParams={handleChangeViewParams} />

      <div>
        {todosError ? (
          <>Oh no, there was an error</>
        ) : isTodosLoading ? (
          <>Loading...</>
        ) : todos ? (
          todos.length ? (
            <div>
              <div className="mt-4 text-2xl">
                {currentUser?.nickName} TODOS:
              </div>
              <TodoList
                currentUserTodos={currentUserTodos}
                viewParams={todoListViewParams}
              />
            </div>
          ) : (
            <div className="mt-10 flex h-full w-full items-center justify-center rounded-md bg-red p-10 text-7xl text-white">
              <span className=" text-center">{`^ now add you first todo`}</span>
            </div>
          )
        ) : (
          <>No active User</>
        )}
      </div>
    </div>
  );
};
