import { Button, Modal } from "antd";

const VisitorsModal = ({ dogadjaj, show, onClose }) => {
  const title1 = `Posjetioci ${dogadjaj.naziv}`;

  // Definišite imena polja
  const fields = ["Naziv", "Korisničko ime", "Email"];

  return (
    <Modal
      title={title1}
      visible={show}
      onCancel={onClose}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          Izađi
        </Button>,
      ]}
    >
      {dogadjaj.posjetilacs.length === 0 ? (
        <span style={{ color: "red" }}>Nema posjetilaca!</span>
      ) : (
        <ul
          style={{
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Prikaz imena polja */}
          <li
            style={{
              fontSize: 16,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {fields.map((field) => (
              <span key={field} style={{ textAlign: "left" }}>
                {field}
              </span>
            ))}
          </li>

          {/* Prikaz vrednosti polja za svakog člana liste */}
          {dogadjaj.posjetilacs.map((user) => (
            <li
              style={{
                fontSize: 16,
                display: "flex",
                justifyContent: "space-between",
              }}
              key={user.korisnik.id}
            >
              <span style={{ textAlign: "left", width: "80px" }}>
                {user.korisnik.naziv}
              </span>
              <span style={{ textAlign: "left" }}>
                {user.korisnik.username}
              </span>
              <span style={{ textAlign: "left" }}>{user.korisnik.email}</span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default VisitorsModal;
