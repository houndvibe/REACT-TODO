import React, { useEffect, useRef, useState } from "react";
import { todoProps, userProps } from "../../types";
import MyButton from "../ui/MyButton/MyButton";
import {
  useDeleteUserMutation,
  useEditUserMutation,
} from "../../redux/userApiSlice";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { MdOutlineDone } from "react-icons/md";
import { useAllAboutUsers } from "../../hooks/useAllAboutUsers";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../../redux/todoApiSlice";

interface userItemProps {
  user: userProps;
  isOpen: boolean;
  handleCloseAll: () => void;
}

const UserItem: React.FC<userItemProps> = ({
  user,
  isOpen,
  handleCloseAll,
}) => {
  const [isPassVisible, setisPassVisible] = useState(false);
  const [editedUser, setEditedUser] = useState<userProps>({
    ...user,
  });
  const nameFieldRef = useRef<null | HTMLInputElement>(null);

  const navigate = useNavigate();

  const [deleteUser] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();
  const { currentUser, currentUserId } = useAllAboutUsers();
  const [deleteTodo] = useDeleteTodoMutation();

  useEffect(() => {
    nameFieldRef.current && nameFieldRef?.current.focus();
  }, [isOpen]);

  const { data: todos } = useGetTodosQuery(undefined);

  const currentUserTodos = todos
    ? todos.filter((todo: todoProps) => todo.userId == currentUserId)
    : [];

  const handleChangeUserInfo =
    (type: string) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEditedUser({ ...editedUser, [type]: e.target.value });
    };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);
      await currentUserTodos.forEach((todo: todoProps) => {
        deleteTodo(todo.id);
      });
    } catch (err) {
      console.error("Failed to save the user: ", err);
    }

    navigate("/");
  };

  const handleOk = (): void => {
    editUser(editedUser);
    handleCloseAll();
  };

  const handleCancel = (): void => {
    setEditedUser({ ...user });
    handleCloseAll();
  };

  return (
    <NavLink to={`user/${user.id}`}>
      <div
        className={`${!isOpen && "hover:bg-greyHover active:bg-greyActive"} relative min-w-80  rounded-lg bg-grey p-2`}
      >
        <div className="flex items-center justify-between">
          <div className="text-4xl">{user.nickName}</div>
          {currentUser?.id == user.id ? (
            <div className="mr-2 rounded-md bg-blue p-1">
              <MdOutlineDone />
            </div>
          ) : null}
        </div>

        {isOpen && (
          <div className="mt-3 flex flex-wrap">
            <form action="">
              {Object.entries(user).map(([fieldName]) => {
                return fieldName === "id" ? null : (
                  <div
                    className="relative m-2 flex items-center"
                    key={fieldName}
                  >
                    <div className="w-20 text-center text-lg">{fieldName}:</div>
                    <input
                      autoComplete="off"
                      className=" ml-2 box-border rounded-md px-2 py-1 outline-none ring-blue focus:ring-4"
                      ref={fieldName == "nickName" ? nameFieldRef : null}
                      value={editedUser[fieldName as keyof typeof editedUser]}
                      type={
                        fieldName == "password" && !isPassVisible
                          ? "password"
                          : "text"
                      }
                      onChange={handleChangeUserInfo(fieldName)}
                    />
                    {fieldName == "password" && (
                      <div
                        className="absolute left-[260px] top-2"
                        onClick={() => setisPassVisible(!isPassVisible)}
                      >
                        {isPassVisible ? <PiEyeBold /> : <PiEyeClosedBold />}
                      </div>
                    )}
                  </div>
                );
              })}
            </form>

            <div className="my-2 ml-1  flex space-x-2">
              <div>
                <MyButton variant="primary" onClick={handleOk}>
                  save
                </MyButton>
              </div>
              <div>
                <MyButton variant="primary" onClick={handleCancel}>
                  cancel
                </MyButton>
              </div>
              <div>
                <MyButton variant="danger" onClick={handleDeleteUser}>
                  delete
                </MyButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default UserItem;
