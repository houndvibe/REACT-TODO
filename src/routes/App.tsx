import { Outlet } from "react-router-dom";
import NavPanel from "../components/NavPanel";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";

const App: React.FC = () => {
  const { isAllUsersLoading } = useAllAboutUsers();

  if (isAllUsersLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue text-3xl text-white">
        Loading...
      </div>
    );
  }
  
  return (
    <div className="app">
      <div className="app__content">
        <NavPanel />
        <div className="app__outletWrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
