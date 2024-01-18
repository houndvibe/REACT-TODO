import { nanoid } from "@reduxjs/toolkit";
import UserItem from "./UserItem";
import MyButton from "../ui/MyButton/MyButton";
import {
  useAddUserMutation,
  useGetUsersQuery,
  useSetCurrentUserIdMutation,
} from "../../redux/userApiSlice";
import { userProps } from "../../types";
import { useAllAboutUsers } from "../../hooks/useAllAboutUsers";
import { useState } from "react";

const UsersList = () => {
  const [addNewUser] = useAddUserMutation();
  const [setCurrentUserId] = useSetCurrentUserIdMutation();
  const [opendUserId, setOpendUserId] = useState("");

  const { data: users, isLoading, isError, error } = useGetUsersQuery("");

  const { currentUserId } = useAllAboutUsers();

  const handleClickUser = (user: userProps) => (): void => {
    if (currentUserId != user.id) {
      setCurrentUserId(user.id);
    }
    if (opendUserId != user.id) {
      setOpendUserId(user.id);
    }
  };

  const handleCloseAll = (): void => {
    setOpendUserId("");
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
      setOpendUserId(id);
      await setCurrentUserId(id).unwrap();
      await addNewUser(newUser).unwrap();
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
                isOpen={opendUserId == user.id ? true : false}
                handleCloseAll={handleCloseAll}
              />
            </div>
          ))}
        </div>
      )}

      <MyButton
        variant="primary"
        className={users?.length ? undefined : "h-48 w-56"}
        onClick={handleAddNewUser}
      >
        add user
      </MyButton>
    </div>
  );
};

export default UsersList;
