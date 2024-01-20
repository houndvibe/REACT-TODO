import { Outlet } from "react-router-dom";
import NavPanel from "../components/NavPanel";

const App = () => {
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
