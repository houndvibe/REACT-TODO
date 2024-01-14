import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addUser, selectAllUsers } from "../redux/usersSlice";
import MyButton from "../components/ui/MyButton/MyButton";
import UserItem from "../components/UserItem";

const Users = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const handleAddNewUser = () => {
    dispatch(addUser("Вася"));
  };

  const usersList = users.map((user) => (
    <div key={nanoid()}>
      <UserItem {...user} />
    </div>
  ));
  return (
    <div>
      <div>{usersList}</div>
      <MyButton variant="primary" onClick={handleAddNewUser}>
        add
      </MyButton>
    </div>
  );
};

export default Users;
