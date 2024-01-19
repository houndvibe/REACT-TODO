import { Outlet } from "react-router-dom";
import NavPanel from "../components/NavPanel";

const App = () => {
  return (
    <div id="App" className="box-border flex h-screen bg-blueHover p-2">
      <div className="relative m-auto flex  max-h-[90vh] min-w-[1100px]  rounded-md bg-grey p-3">
        <NavPanel />
        <div className="basis-3/4 overflow-y-hidden rounded-md bg-white p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
