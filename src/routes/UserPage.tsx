import { useGetTodosQuery } from "../redux/todoApiSlice";
import { todoProps } from "../types";
import TodoList from "../components/todos/TodoList";
import TodoStaticPannel from "../components/todos/TodoStaticPannel";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";

export const loader = ({ params }) => {
  return params.userId;
};

export const UserPage = () => {
  const { currentUser } = useAllAboutUsers();

  const {
    data: todos,
    isLoading: isTodosLoading,
    error: todosError,
  } = useGetTodosQuery(undefined);

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == currentUser?.id)
    : [];

  return (
    <div>
      <TodoStaticPannel />
      <div className="mt-4 text-2xl">{currentUser?.nickName} TODOS:</div>
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
