import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../redux/todoApiSlice";
import { todoProps } from "../types";
import MyButton from "./ui/MyButton/MyButton";
import { nanoid } from "@reduxjs/toolkit";

interface todoItemProps {
  todoItem: todoProps;
  isOpen: boolean;
}

const TodoItem: React.FC<todoItemProps> = ({ todoItem, isOpen }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();

  const handleDeleteTodo = async () => {
    await deleteTodo(todoItem.id);
  };

  /*   const handleEditTodo = async () => {
    await editTodo(newTodo);
  };
 */
  return (
    <div className="my-1 rounded-md bg-yellow p-3 hover:bg-yellowHover active:bg-yellowActive">
      <div className=" flex justify-between ">
        <div>{todoItem.title}</div>
      </div>
      {isOpen ? (
        <div>
          <div className="flex">
            <div>
              {Object.entries(todoItem).map(([fieldName]) => {
                return fieldName === "id" ||
                  fieldName === "userId" ||
                  fieldName === "description" ||
                  fieldName === "clearLastCreated" ? null : (
                  <div key={nanoid()}>
                    <div
                      className="relative m-2 flex items-center"
                      key={fieldName}
                    >
                      <div className="w-20 text-center text-lg">
                        {fieldName}:
                      </div>
                      {fieldName === "status" ? (
                        <button
                          type="button"
                          className="ml-2 rounded-md bg-blue px-5 py-2.5 text-center text-sm font-medium text-white "
                        >
                          {todoItem.status}
                        </button>
                      ) : (
                        <input
                          type={`${fieldName === "startDate" || fieldName === "endDate" ? "date" : fieldName === "startDate" ? "textarea" : "text"}`}
                          className="ml-2 box-border rounded-md px-2 py-1 outline-none ring-blue focus:ring-4"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <div>Description</div>
              <textarea
                className="rounded-md p-2"
                cols={32}
                rows={6}
                /* value={todoItem.description} */
              />
            </div>
          </div>
          <div className="flex">
            <div className="mr-2">
              <MyButton variant="primary" onClick={handleDeleteTodo}>
                ok
              </MyButton>
            </div>
            <div>
              <MyButton variant="danger" onClick={handleDeleteTodo}>
                delete
              </MyButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TodoItem;
