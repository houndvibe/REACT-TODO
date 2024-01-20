import { nanoid } from "@reduxjs/toolkit";
import { TodoStaticPannelProps, todoProps } from "../../types";
import MyButton from "../ui/MyButton/MyButton";
import MySelect from "../ui/MySelect/MySelect";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../../redux/todoApiSlice";
import { useAllAboutUsers } from "../../hooks/useAllAboutUsers";
import { useSelector } from "react-redux";
import { selectIsAppSizeCompact } from "../../redux/sizeSlice";

const TodoStaticPannel: React.FC<TodoStaticPannelProps> = ({
  handleChangeViewParams,
}) => {
  const [addNewTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const isAppCompact = useSelector(selectIsAppSizeCompact);
  const { currentUserId } = useAllAboutUsers();

  const { data: todos } = useGetTodosQuery(undefined);

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == currentUserId)
    : [];

  const handleAddTodo = async () => {
    try {
      const newTodo: todoProps = {
        id: nanoid(),
        userId: currentUserId!,
        title: "Todo...",
        status: "not started",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        description: "todo description...",
      };
      await addNewTodo(newTodo);
    } catch (err) {
      console.error("Failed to save the user: ", err);
    }
  };

  const handleDeleteAllTodo = () => {
    try {
      currentUserTodos.forEach((todo: todoProps) => {
        deleteTodo(todo.id);
      });
    } catch (err) {
      console.error("Failed to save the user: ", err);
    }
  };

  const handleChangeParams =
    (type: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleChangeViewParams(type, e.target.value);
    };

  return (
    <div className="rpunded flex justify-around rounded-md bg-yellow p-2">
      <div className="mr-2">
        <MyButton variant="primary" onClick={handleAddTodo}>
          add todo
        </MyButton>
      </div>
      <MyButton variant="danger" onClick={handleDeleteAllTodo}>
        delete all
      </MyButton>
      {!isAppCompact && (
        <div className="flex">
          <div className="flex items-center">
            <span className="mx-2">Filter:</span>
            <MySelect
              options={["all", "completed", "in-progress", "not started"]}
              onChange={handleChangeParams("filter")}
            />
          </div>
          <div className="flex items-center">
            <span className="mx-2">Sort:</span>
            <MySelect
              options={["new first", "old first"]}
              onChange={handleChangeParams("sort")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStaticPannel;
