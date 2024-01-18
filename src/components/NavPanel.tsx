import UsersList from "./users/UsersList";

const NavPanel = () => {
  return (
    <div className="mr-2 min-w-[360px] basis-1/4 overflow-y-auto rounded-md bg-yellow p-2">
      <UsersList />
    </div>
  );
};

export default NavPanel;
