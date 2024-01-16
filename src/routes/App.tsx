import { Outlet } from "react-router-dom";
import NavPanel from "../components/NavPanel";

const App = () => {
  return (
    <div className="bg-blueHover">
      <div className="relative m-auto flex h-screen w-[1000px] bg-grey p-3">
        <NavPanel />
        <div className="basis-3/4 rounded-md bg-white p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
