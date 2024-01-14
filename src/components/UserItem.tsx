import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { deleteUserById, editUserBuId } from "../redux/usersSlice";
import { userProps } from "../types";
import MyButton from "./ui/MyButton/MyButton";

const UserItem: React.FC<userProps> = ({ name, id }) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputNameState, setInputNameState] = useState<string>(name);

  const handleDeleteUser = () => {
    dispatch(deleteUserById(id));
  };
  const handleEdit = () => {
    if (isEdit) {
      dispatch(editUserBuId({ id, name: inputNameState }));
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  };

  return (
    <div className={`m-2 rounded-lg border bg-yellow p-2 transition`}>
      <div className="flex items-center justify-between">
        <div className="text-4xl">{name}</div>
        <div>
          <MyButton variant="primary" onClick={handleEdit}>
            {isEdit ? "ok" : "edit"}
          </MyButton>
          <MyButton variant="danger" onClick={handleDeleteUser}>
            delete
          </MyButton>
        </div>
      </div>
      {isEdit && (
        <div>
          Name:{" "}
          <input
            type="text"
            value={inputNameState}
            onChange={(e) => setInputNameState(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default UserItem;
