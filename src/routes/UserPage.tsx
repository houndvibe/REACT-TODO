import { useLoaderData } from "react-router-dom";
/* import { useAllAboutUsers } from "../hooks/useAllAboutUsers"; */
import { useGetTodosQuery } from "../redux/todoApiSlice";
import { todoProps } from "../types";
import TodoList from "../components/TodoList";
import TodoStaticPannel from "../components/TodoStaticPannel";

export const loader = ({ params }) => {
  return params.userId;
};

export const UserPage = () => {
  /*   const {
    currentUser,
    currentUserId,
    allUsers,
    isCurrentUserIdLoading,
    isAllUsersLoading,
    currentUserIdError,
    allUsesrError,
  } = useAllAboutUsers(); */

  /* 
  const filteedAndSortedTodos = useProcessTodos()
 */

  const userId: string = useLoaderData();

  const {
    data: todos,
    isLoading: isTodosLoading,
    error: todosError,
  } = useGetTodosQuery(undefined);

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == userId)
    : [];

  return (
    <div className="mt-2 ">
      <TodoStaticPannel />
      <div>
        {todosError ? (
          <>Oh no, there was an error</>
        ) : isTodosLoading ? (
          <>Loading...</>
        ) : todos ? (
          <div>
            <TodoList todos={currentUserTodos} />
          </div>
        ) : (
          <>No active User</>
        )}
      </div>
    </div>
  );
};
