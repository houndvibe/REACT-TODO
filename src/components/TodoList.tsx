import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = [1, 2, 3, 4];

  const renderedList = todos.map((todo) => {
    return <TodoItem />;
  });
  return (
    <div className="mt-4 rounded-md bg-grey p-2 ">
      <div>filters</div>
      <div>{renderedList}</div>
    </div>
  );
};

export default TodoList;
