import Modal from "react-modal";
import MyButton from "../MyButton/MyButton";

interface myModalProps {
  modalIsOpen: boolean;
  enteredPassword: string;
  handleSetPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordMessage: boolean;
  handleOkModal: () => void;
  handleCancelModal: () => void;
}

const MyModal: React.FC<myModalProps> = ({
  modalIsOpen,
  enteredPassword,
  handleSetPassword,
  showPasswordMessage,
  handleCancelModal,
  handleOkModal,
}) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "20px",
          },
        }}
        contentLabel="Example Modal"
      >
        <div className="flex-col items-center justify-center space-y-5 align-middle">
          <div>Please, enter your password:</div>
          <input
            className="border-1 rounded-md border px-2"
            type="text"
            value={enteredPassword}
            onChange={handleSetPassword}
          />
          {showPasswordMessage && (
            <div className="text-redHover">WRONG PASSWORD!</div>
          )}
          <div className="flex justify-around">
            <MyButton variant="primary" onClick={handleOkModal}>
              ok
            </MyButton>
            <MyButton variant="secondary" onClick={handleCancelModal}>
              cancel
            </MyButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
