import { todoProps } from "../types";

const TodoItem = (item: todoProps) => {
  return (
    <div className="my-1 rounded-md bg-yellow p-3">
      <div>{item.title}</div>
    </div>
  );
};

export default TodoItem;
