import { nanoid } from "@reduxjs/toolkit";
import { todoProps } from "../types";
import MyButton from "./ui/MyButton/MyButton";
import MySelect from "./ui/MySelect/MySelect";
import { useLoaderData } from "react-router-dom";
import { useAddTodoMutation } from "../redux/todoApiSlice";

const TodoStaticPannel = () => {
  const [addNewTodo] = useAddTodoMutation();

  const userId: string = useLoaderData();

  const handleAddTodo = async () => {
    const newTodo: todoProps = {
      id: nanoid(),
      userId: userId,
      title: "Todo...",
      status: "not started",
      startDate: "123",
      endDate: "123",
      description: "todo description...",
    };
    await addNewTodo(newTodo);
  };
  return (
    <div className="rpunded flex justify-around rounded-md bg-yellow p-2">
      <MyButton variant="primary" onClick={handleAddTodo}>
        add todo
      </MyButton>
      <div className="flex items-center">
        <span className="mx-2">Filter:</span>
        <MySelect
          options={["all", "completed", "in-progress", "not started"]}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      <div className="flex items-center">
        <span className="mx-2">Sort:</span>
        <MySelect
          options={["new first", "old first"]}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TodoStaticPannel;
