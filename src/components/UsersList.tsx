import { nanoid } from "@reduxjs/toolkit";
import UserItem from "./UserItem";
import MyButton from "./ui/MyButton/MyButton";
import {
  useAddUserMutation,
  useGetUsersQuery,
  useSetCurrentUserIdMutation,
} from "../redux/userApiSlice";
import { userProps } from "../types";
import { useState } from "react";

const Users = () => {
  const [addNewUser] = useAddUserMutation();
  const { data: users, isLoading, isError, error } = useGetUsersQuery("");
  const [setCurrentUserId] = useSetCurrentUserIdMutation();
  const [editableUserId, setEditableUserId] = useState<string | null>(null);

  const handleClickUser = (user: userProps) => (): void => {
    if (editableUserId != user.id) {
      setEditableUserId(user.id);
      setCurrentUserId(user.id);
    }
  };

  const handleCloseAll = (): void => {
    setEditableUserId(null);
  };

  const handleAddNewUser = async () => {
    try {
      const id = nanoid();
      const newUser = {
        id: id,
        nickName: "New user",
        firstName: "",
        lastName: "",
        age: "",
        password: "",
      };
      await setCurrentUserId(id).unwrap();
      await addNewUser(newUser).unwrap();
      await setEditableUserId(id);
    } catch (err) {
      console.error("Failed to save the post: ", err);
    }
  };

  return (
    <div className="flex-col justify-around">
      {isLoading ? (
        <>Loading...</>
      ) : isError ? (
        <>Error!{error.toString()}</>
      ) : (
        <div>
          {users?.map((user: userProps) => (
            <div
              key={nanoid()}
              onClick={handleClickUser(user)}
              className="mb-2"
            >
              <UserItem
                user={user}
                isOpen={editableUserId == user.id ? true : false}
                handleCloseAll={handleCloseAll}
              />
            </div>
          ))}
        </div>
      )}

      <MyButton variant="primary" onClick={handleAddNewUser}>
        add user
      </MyButton>
    </div>
  );
};

export default Users;
