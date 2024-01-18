import { useState } from "react";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../../redux/todoApiSlice";
import { todoProps, todoStatus } from "../../types";
import MyButton from "../ui/MyButton/MyButton";

interface todoItemProps {
  todoItem: todoProps;
  isOpen: boolean;
}

const TodoItem: React.FC<todoItemProps> = ({ todoItem, isOpen }) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [editedTodo, setEditedTodo] = useState<todoProps>({
    ...todoItem,
  });

  const handleChangeTodoInfo =
    (type: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setEditedTodo({ ...editedTodo, [type]: e.target.value });
    };

  const handleChangeTodoStatus = () => {
    const newStatus =
      editedTodo.status == "completed"
        ? "not started"
        : editedTodo.status == "not started"
          ? "in progress"
          : "completed";

    setEditedTodo({ ...editedTodo, status: newStatus as todoStatus });
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todoItem.id);
  };

  const handleEditTodo = async () => {
    await editTodo(editedTodo);
  };

  return (
    <div
      className={`my-1 rounded-md p-3 ${editedTodo.status === "completed" ? "bg-grey" : "bg-yellow hover:bg-yellowHover active:bg-yellowActive"} `}
    >
      <div className=" flex justify-between ">
        <div>{todoItem.title}</div>
        <div>
          {editedTodo.status == "completed" && !isOpen && (
            <MyButton variant="danger" onClick={handleDeleteTodo}>
              delete
            </MyButton>
          )}
        </div>
      </div>
      {isOpen ? (
        <div>
          <div className="flex">
            <div>
              {Object.entries(todoItem).map(([fieldName]) => {
                return fieldName === "id" ||
                  fieldName === "userId" ||
                  fieldName === "description" ? null : (
                  <div>
                    <div
                      className="relative m-2 flex items-center"
                      key={fieldName}
                    >
                      <div className="w-20 text-center text-lg">
                        {fieldName}:
                      </div>
                      {fieldName === "status" ? (
                        <button
                          onClick={handleChangeTodoStatus}
                          type="button"
                          className="ml-2 rounded-md bg-blue px-5 py-1 text-center text-sm font-medium text-white "
                        >
                          {editedTodo.status}
                        </button>
                      ) : (
                        <input
                          onChange={handleChangeTodoInfo(fieldName)}
                          value={
                            editedTodo[fieldName as keyof typeof editedTodo]
                          }
                          type={`${fieldName === "startDate" || fieldName === "endDate" ? "date" : "text"}`}
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
                value={editedTodo.description}
                onChange={handleChangeTodoInfo("description")}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mr-2">
              <MyButton variant="primary" onClick={handleEditTodo}>
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
