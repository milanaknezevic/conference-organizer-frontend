import { Modal, Table } from "antd";

const Pokusaj = ({
  dogadjaj,
  selectedDogadjaj,
  handlePrikaziModalZaResurse,
  handlePrikaziPosjetioceModal,
  handleOdjaviSeSaDogadjaja,
  konferencija,
  formatirajDatum,
  handlePrijaviSeNaDogadjaj,
  showError,
  showSucess,
  errorMessage,
  succesMessage,
  prijavljeniDogadjaj,
  show,
  onClose,
}) => {
  const title1 = `Dogadjaji:`;
  console.log("dogadjaji", dogadjaj);
  return (
    <Modal
      title={title1}
      visible={show}
      maskClosable={false}
      onCancel={onClose}
      footer={[]}
    >
      <p>{dogadjaj}</p>
    </Modal>
  );
};

export default Pokusaj;
