import { nanoid } from "@reduxjs/toolkit";
import { todoProps } from "../../types";
import MyButton from "../ui/MyButton/MyButton";
import MySelect from "../ui/MySelect/MySelect";
import { useLoaderData } from "react-router-dom";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../../redux/todoApiSlice";

interface TodoStaticPannelProps {
  handleChangeViewParams: (type: string, value: string) => void;
}

const TodoStaticPannel: React.FC<TodoStaticPannelProps> = ({
  handleChangeViewParams,
}) => {
  const [addNewTodo] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const userId: string = useLoaderData() as string;
  const { data: todos } = useGetTodosQuery(undefined);

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == userId)
    : [];

  const handleAddTodo = async () => {
    try {
      const newTodo: todoProps = {
        id: nanoid(),
        userId: userId,
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
      <MyButton variant="primary" onClick={handleAddTodo}>
        add todo
      </MyButton>
      <MyButton variant="danger" onClick={handleDeleteAllTodo}>
        delete all
      </MyButton>
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
  );
};

export default TodoStaticPannel;
