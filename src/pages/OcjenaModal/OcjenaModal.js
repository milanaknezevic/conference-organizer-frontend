import { Button, Modal } from "antd";
import { StarFill } from "react-bootstrap-icons";
const OcjenaModal = ({ arg, show, onClose }) => {
  const title1 = `${arg.naziv} Ocjene:`;
  console.log(arg);
  return (
    <>
      <Modal
        title={title1}
        maskClosable={false}
        footer={[
          <Button key="cancel" onClick={onClose}>
            Zatvori
          </Button>,
        ]}
        open={show}
        onCancel={onClose}
        bodyStyle={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <ul style={{ padding: 0, listStyle: "none" }}>
          {arg.ocjenas.map((user, index) => (
            <li
              style={{
                fontSize: 16,
                borderBottom:
                  index !== user.length - 1 ? "1px solid #000" : "none",
                paddingBottom: index !== user.length - 1 ? "10px" : "0",
                marginBottom: index !== user.length - 1 ? "10px" : "0",
              }}
              key={user.id}
            >
              <div>
                <label>Komentar: {user.komentar}</label>
              </div>
              <div>
                {" "}
                <label>
                  Ocjena:{" "}
                  {Array(user.zvjezdica).fill(
                    <StarFill style={{ color: "yellow", fontSize: "1rem" }} />
                  )}
                </label>
              </div>
              <div>
                {" "}
                <label>Korisnik: {user.korisnik.username}</label>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
};
export default OcjenaModal;
