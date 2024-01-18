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
import MyModal from "../ui/MyModal/MyModal";

interface potentialUser {
  password: string;
  id: string;
}

const UsersList = () => {
  const [addNewUser] = useAddUserMutation();
  const [setCurrentUserId] = useSetCurrentUserIdMutation();

  const [opendUserId, setOpendUserId] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [enteredPassword, setEnteredPassword] = useState<string>("");
  const [showPasswordMessage, setShowPasswordMessage] =
    useState<boolean>(false);
  const [potentialUser, setPotentialUser] = useState<potentialUser>(
    {} as potentialUser,
  );

  const { data: users, isLoading, isError, error } = useGetUsersQuery("");
  const { currentUserId } = useAllAboutUsers();

  const handleClickUser = (user: userProps) => async () => {
    if (currentUserId != user.id) {
      setIsOpen(true);
      setPotentialUser({ password: user.password, id: user.id });
    } else {
      if (opendUserId != user.id) {
        setOpendUserId(user.id);
      }
    }
  };

  const handleOkModal = () => {
    if (potentialUser.password == enteredPassword) {
      setIsOpen(false);
      setCurrentUserId(potentialUser.id);
      setOpendUserId(potentialUser.id);
      setShowPasswordMessage(false);
      setEnteredPassword("");
    } else {
      setShowPasswordMessage(true);
    }
  };

  const handleCancelModal = () => {
    setIsOpen(false);
    setShowPasswordMessage(false);
    setEnteredPassword("");
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(e.target.value);
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
      <MyModal
        modalIsOpen={modalIsOpen}
        enteredPassword={enteredPassword}
        handleSetPassword={handleSetPassword}
        showPasswordMessage={showPasswordMessage}
        handleOkModal={handleOkModal}
        handleCancelModal={handleCancelModal}
      />
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
        className={users?.length ? undefined : "h-48 w-full text-4xl"}
        onClick={handleAddNewUser}
      >
        add user
      </MyButton>
    </div>
  );
};

export default UsersList;
