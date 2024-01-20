import { useEffect, useRef, useState } from "react";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
} from "../../redux/todoApiSlice";
import { todoProps, todoStatus } from "../../types";
import MyButton from "../ui/MyButton/MyButton";

interface todoItemProps {
  todoItem: todoProps;
  isOpen: boolean;
  handleCloseAllTodos: () => void;
  index: number;
}

const TodoItem: React.FC<todoItemProps> = ({
  todoItem,
  isOpen,
  handleCloseAllTodos,
  index,
}) => {
  const [deleteTodo] = useDeleteTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [editedTodo, setEditedTodo] = useState<todoProps>({
    ...todoItem,
  });

  const titleFieldRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    titleFieldRef.current && titleFieldRef?.current.focus();
  }, [isOpen]);

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
          ? "in-progress"
          : "completed";

    setEditedTodo({ ...editedTodo, status: newStatus as todoStatus });
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todoItem.id);
  };

  const handleEditTodo = async () => {
    await editTodo(editedTodo);
    handleCloseAllTodos();
  };

  const handleCancelEditTodo = async () => {
    await setEditedTodo({ ...todoItem });
    handleCloseAllTodos();
  };

  return (
    <div
      className={`my-1 rounded-md p-3 ${editedTodo.status === "completed" ? `bg-blue ${!isOpen && `hover:bg-blueHover active:bg-blueActive`} ` : editedTodo.status === "not started" ? `${!isOpen && `hover:bg-greyHover active:bg-greyActive`} bg-grey` : `bg-yellow ${!isOpen && `hover:bg-yellowHover active:bg-yellowActive`}`} `}
    >
      <div className=" flex items-center justify-between border-y-2 border-white p-2">
        <div>{index + 1 + "." + todoItem.title}</div>
        <div>
          {editedTodo.status == "completed" && !isOpen && (
            <MyButton variant="danger" onClick={handleDeleteTodo}>
              delete completed
            </MyButton>
          )}
        </div>
      </div>
      {isOpen ? (
        <div>
          <div className={`mt-2 flex max-[1000px]:flex-col`}>
            <div>
              {Object.entries(todoItem).map(([fieldName]) => {
                return fieldName === "id" ||
                  fieldName === "userId" ||
                  fieldName === "description" ? null : (
                  <div key={fieldName}>
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
                          className={`ml-2 rounded-md px-5 py-1 text-center text-sm font-medium  ${editedTodo.status == "completed" ? "bg-yellow" : "bg-blue text-white"}`}
                        >
                          {editedTodo.status}
                        </button>
                      ) : (
                        <input
                          onChange={handleChangeTodoInfo(fieldName)}
                          value={
                            editedTodo[fieldName as keyof typeof editedTodo]
                          }
                          ref={fieldName == "title" ? titleFieldRef : null}
                          type={`${fieldName === "startDate" || fieldName === "endDate" ? "date" : "text"}`}
                          className="ml-2 box-border rounded-md px-2 py-1 outline-none ring-blue focus:ring-4 max-[1000px]:w-[300px] max-[600px]:w-[160px]"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-2">
              <textarea
                className="rounded-md p-2 outline-none ring-blue focus:ring-4"
                cols={28}
                rows={6}
                value={editedTodo.description}
                onChange={handleChangeTodoInfo("description")}
              />
            </div>
          </div>
          <div className="mt-4 flex">
            <div className="mr-2">
              <MyButton
                variant={
                  editedTodo.status == "completed" ? "secondary" : "primary"
                }
                onClick={handleEditTodo}
              >
                save
              </MyButton>
            </div>
            <div className="mr-2">
              <MyButton
                variant={
                  editedTodo.status == "completed" ? "secondary" : "primary"
                }
                onClick={handleCancelEditTodo}
              >
                cancel
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
