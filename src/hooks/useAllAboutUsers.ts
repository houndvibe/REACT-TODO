import { useMemo } from "react";
import { userProps } from "../types";
import {
  useGetCurrentUserIdQuery,
  useGetUsersQuery,
} from "../redux/userApiSlice";

export const useAllAboutUsers = () => {
  const {
    data: currentUserId,
    isLoading: isCurrentUserIdLoading,
    error: currentUserIdError,
  } = useGetCurrentUserIdQuery(undefined);

  const {
    data: allUsers,
    isLoading: isAllUsersLoading,
    error: allUsesrError,
  } = useGetUsersQuery(undefined);

  const currentUser = useMemo(() => {
    if (allUsers) {
      return allUsers.find(
        (user: userProps) => user.id === currentUserId,
      ) as userProps;
    }
  }, [allUsers, currentUserId]);

  return {
    currentUser: currentUser,
    currentUserId: currentUserId,
    allUsers: allUsers,
    isCurrentUserIdLoading: isCurrentUserIdLoading,
    isAllUsersLoading: isAllUsersLoading,
    currentUserIdError: currentUserIdError,
    allUsesrError: allUsesrError,
  };
};
