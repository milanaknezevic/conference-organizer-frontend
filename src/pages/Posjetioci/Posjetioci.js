import { Modal, Table } from "antd";

const Posjetioci = ({ dogadjaj, show, onClose }) => {
  const title1 = `Posjetioci:`;

  const columns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      title: "Korisničko ime",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const dataSource = dogadjaj.posjetilacs.map((user) => ({
    key: user.korisnik.id,
    naziv: user.korisnik.naziv,
    username: user.korisnik.username,
    email: user.korisnik.email,
  }));

  return (
    <Modal
      title={title1}
      visible={show}
      onCancel={onClose}
      maskClosable={false}
      footer={[]}
    >
      {dogadjaj.posjetilacs.length === 0 ? (
        <span style={{ color: "red" }}>Nema posjetilaca!</span>
      ) : (
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      )}
    </Modal>
  );
};

export default Posjetioci;
