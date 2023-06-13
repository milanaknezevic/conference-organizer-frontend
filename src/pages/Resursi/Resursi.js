import { Modal, Table } from "antd";

const Resursi = ({ dogadjaj, show, onClose }) => {
  const title1 = `Resursi:`;

  const columns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
      key: "naziv",
    },
    {
      title: "Količina",
      dataIndex: "kolicina",
      key: "kolicina",
    },
  ];

  const dataSource = dogadjaj.rezervacijas?.map((rezervacija) => ({
    key: rezervacija.resurs.id,
    naziv: rezervacija.resurs.naziv,
    kolicina: rezervacija.resurs.kolicina,
  }));

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
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      )}
    </Modal>
  );
};

export default Resursi;
