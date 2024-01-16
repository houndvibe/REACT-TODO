import { useLoaderData } from "react-router-dom";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";

export const loader = ({ params }) => {
  return params.userId;
};

export const UserPage = () => {
  const {
    currentUser,
    currentUserId,
    allUsers,
    isCurrentUserIdLoading,
    isAllUsersLoading,
    currentUserIdError,
    allUsesrError,
  } = useAllAboutUsers();

  const todoId = useLoaderData();

  return <div>{currentUser.nickName}</div>;
};
