import { useAllAboutUsers } from "../hooks/useAllAboutUsers";

const CurrentUserPanel = () => {
  const { currentUser, isCurrentUserIdLoading, currentUserIdError } =
    useAllAboutUsers();

  return (
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
  );
};

export default CurrentUserPanel;
