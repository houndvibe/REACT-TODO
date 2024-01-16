import React, { useEffect, useRef, useState } from "react";
import { userProps } from "../types";
import MyButton from "./ui/MyButton/MyButton";
import { useDeleteUserMutation, useEditUserMutation } from "../redux/apiSlice";
import { PiEyeClosedBold, PiEyeBold } from "react-icons/pi";
import { MdOutlineDone } from "react-icons/md";
import { useAllAboutUsers } from "../hooks/useAllAboutUsers";

interface userItemProps {
  user: userProps;
  isOpen: boolean;
  handleCloseAll: () => void;
}

const UserItem: React.FC<userItemProps> = ({
  user,
  isOpen,
  handleCloseAll,
}) => {
  const [isPassVisible, setisPassVisible] = useState(false);
  const [editedUser, setEditedUser] = useState<userProps>({
    ...user,
  });
  const nameFieldRef = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    nameFieldRef.current && nameFieldRef?.current.focus();
  }, [isOpen]);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [editUser] = useEditUserMutation();

  const handleChangeUserInfo =
    (type: string) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEditedUser({ ...editedUser, [type]: e.target.value });
    };

  const handleDeleteUser = (): void => {
    deleteUser(user.id);
  };

  const handleOk = (): void => {
    handleCloseAll();
    editUser(editedUser);
  };

  const handleCancel = (): void => {
    setEditedUser({ ...user });
  };

  const { currentUser } = useAllAboutUsers();

  let activeUserSign;
  if (currentUser) {
    activeUserSign =
      currentUser.id == user.id ? (
        <div className="mr-2 rounded-md bg-blue p-1">
          <MdOutlineDone />
        </div>
      ) : null;
  }

  return (
    <div
      id="u"
      className={`relative rounded-lg  bg-yellow p-2 transition hover:bg-yellowHover active:bg-yellowActive`}
    >
      <div className="flex items-center justify-between">
        <div className="text-4xl">{user.nickName}</div>
        {isLoading && <div className="px-5">Delete... </div>}
        {activeUserSign}
      </div>
      {isOpen && (
        <div className="mt-3 flex flex-wrap">
          {Object.entries(user).map(([fieldName]) => {
            return fieldName === "id" ||
              fieldName === "isOpen" ||
              fieldName === "clearLastCreated" ? null : (
              <div className="relative m-2 flex items-center" key={fieldName}>
                <div className="w-20 text-center text-lg">{fieldName}:</div>
                <input
                  className=" ml-2 box-border rounded-md px-2 py-2 outline-none ring-blue focus:ring-4"
                  ref={fieldName == "nickName" ? nameFieldRef : null}
                  value={editedUser[fieldName as keyof typeof editedUser]}
                  type={
                    fieldName == "password" && !isPassVisible
                      ? "password"
                      : "text"
                  }
                  onChange={handleChangeUserInfo(fieldName)}
                />
                {fieldName == "password" && (
                  <div
                    className="absolute left-[260px] top-2"
                    onClick={() => setisPassVisible(!isPassVisible)}
                  >
                    {isPassVisible ? <PiEyeBold /> : <PiEyeClosedBold />}
                  </div>
                )}
              </div>
            );
          })}
          <div className="absolute bottom-4 right-8 flex space-x-1">
            <div>
              <MyButton variant="primary" onClick={handleOk}>
                ok
              </MyButton>
            </div>
            <div>
              <MyButton variant="primary" onClick={handleCancel}>
                cancel
              </MyButton>
            </div>
            <div>
              <MyButton variant="danger" onClick={handleDeleteUser}>
                delete
              </MyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserItem;
