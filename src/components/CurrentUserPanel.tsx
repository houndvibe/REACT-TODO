import { NavLink } from "react-router-dom";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";

const CurrentUserPanel = () => {
  const { currentUser, isCurrentUserIdLoading, currentUserIdError } =
    useAllAboutUsers();

  return (
    <NavLink to="users">
      <div className="rounded-md bg-blue p-2 text-white">
        {currentUserIdError ? (
          <>Oh no, there was an error</>
        ) : isCurrentUserIdLoading ? (
          <>Loading...</>
        ) : currentUser ? (
          <>{currentUser.nickName}</>
        ) : (
          <>No active User</>
        )}
      </div>
    </NavLink>
  );
};

export default CurrentUserPanel;
