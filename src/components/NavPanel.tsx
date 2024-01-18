import UsersList from "./users/UsersList";

const NavPanel = () => {
  return (
    <div className="min-w-90 mr-2 basis-1/4 rounded-md bg-yellow p-2">
      <UsersList />
    </div>
  );
};

export default NavPanel;
