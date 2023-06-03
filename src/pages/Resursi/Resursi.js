import { Modal } from "antd";

const Resursi = ({ dogadjaj, show, onClose }) => {
  const title1 = `Resursi:`;

  // Definišite imena polja
  const fields = ["Naziv", "Količina"];
  console.log("gledaj", dogadjaj);
  return (
    <Modal
      title={title1}
      visible={show}
      maskClosable={false}
      onCancel={onClose}
      footer={[]}
    >
      {dogadjaj.rezervacijas?.length === 0 ? (
        <span style={{ color: "red" }}>Nema resursa!</span>
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
              gap: "6rem",
            }}
          >
            {fields.map((field) => (
              <span key={field} style={{ textAlign: "left" }}>
                {field}
              </span>
            ))}
          </li>

          {/* Prikaz vrednosti polja za svakog člana liste */}
          {dogadjaj.rezervacijas?.map((rezervacija) => (
            <li
              style={{
                fontSize: 16,
                display: "flex",
                gap: "5rem",
              }}
              key={rezervacija.resurs.id}
            >
              <span style={{ textAlign: "left", width: "80px" }}>
                {rezervacija.resurs.naziv}
              </span>
              <span style={{ textAlign: "left" }}>
                {rezervacija.resurs.kolicina}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default Resursi;
