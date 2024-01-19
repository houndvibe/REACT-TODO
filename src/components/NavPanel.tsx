import { useState } from "react";
import UsersList from "./users/UsersList";

const NavPanel = () => {
  const [isCompact, setIsCompact] = useState(false);

  const handleSetIsCompact = () => {
    setIsCompact(!isCompact);
  };

  return (
    <div
      className={`relative mr-2 overflow-y-auto overflow-x-hidden rounded-md bg-yellow p-2 ${isCompact ? "w-[110px]" : "min-w-[360px] basis-1/4"}`}
    >
      <UsersList isCompact={isCompact} setIsCompact={handleSetIsCompact} />
    </div>
  );
};

export default NavPanel;
