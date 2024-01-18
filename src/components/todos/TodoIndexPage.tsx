import { useGetUsersQuery } from "../../redux/userApiSlice";

const TodoIndexPage = () => {
  const { data: users } = useGetUsersQuery(undefined);
  console.log(users);
  return (
    <div className="flex h-full w-full items-center justify-center bg-red text-7xl text-white">
      {users?.length ? (
        <span className="text-center">
          Save / Choose user <br />
          to see todos
        </span>
      ) : (
        <span className="text-center">{`<=Add you first user to start`}</span>
      )}
    </div>
  );
};

export default TodoIndexPage;
