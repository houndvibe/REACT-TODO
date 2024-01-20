import { useEffect, useState } from "react";
import UsersList from "./users/UsersList";
import { selectIsAppSizeCompact, setIsAppCompact } from "../redux/sizeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const NavPanel = () => {
  const [isMenuCompact, setIsMenuCompact] = useState(false);
  const isAppCompact = useAppSelector(selectIsAppSizeCompact);
  const dispatch = useAppDispatch();

  const handleSetIsMenuCompact = () => {
    setIsMenuCompact(!isMenuCompact);
  };

  const updateMedia = () => {
    dispatch(setIsAppCompact(window.innerWidth < 800));
    if (isAppCompact) {
      setIsMenuCompact(true);
    } else {
      setIsMenuCompact(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <div
      className={`relative mr-2 overflow-y-auto overflow-x-hidden rounded-md bg-yellow p-2 ${isMenuCompact ? "w-[110px]" : "min-w-[360px] basis-1/4"}`}
    >
      <UsersList
        isMenuCompact={isMenuCompact}
        setIsMenuCompact={handleSetIsMenuCompact}
      />
    </div>
  );
};

export default NavPanel;
