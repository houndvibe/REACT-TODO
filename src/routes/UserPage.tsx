import { useLoaderData } from "react-router-dom";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";
import { useGetTodosQuery } from "../redux/todoApiSlice";
import TodoItem from "../components/TodoItem";
import { todoProps } from "../types";
import { nanoid } from "@reduxjs/toolkit";

export const loader = ({ params }) => {
  return params.userId;
};

export const UserPage = () => {
  const {
    currentUser,
    currentUserId,
    allUsers,
    isCurrentUserIdLoading,
    isAllUsersLoading,
    currentUserIdError,
    allUsesrError,
  } = useAllAboutUsers();

  const userId = useLoaderData();

  const {
    data: todos,
    isLoading: isTodosLoading,
    error: todosError,
  } = useGetTodosQuery(undefined);

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == userId)
    : [];
  /* 
  const filteedAndSortedTodos = useProcessTodos()
 */
  return (
    <div>
      <div>
        {todosError ? (
          <>Oh no, there was an error</>
        ) : isTodosLoading ? (
          <>Loading...</>
        ) : todos ? (
          <div>
            {currentUserTodos.map((item: todoProps) => (
              <div key={nanoid()}>
                <TodoItem {...item} />
              </div>
            ))}
          </div>
        ) : (
          <>No active User</>
        )}
      </div>
    </div>
  );
};

//завел todosApiSlice
//закинул todo сюда через useGetTodosQuery()
