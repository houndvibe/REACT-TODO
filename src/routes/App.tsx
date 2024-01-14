import { Outlet } from "react-router-dom";
import NavPanel from "../components/NavPanel";

const App = () => {
  return (
    <div className="bg-grey flex h-screen w-screen">
      <NavPanel />
      <div className="basis-3/4 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
