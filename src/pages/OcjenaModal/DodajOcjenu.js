import { Button, Modal, Input, Form, Select, Rate } from "antd";
import { useDispatch } from "react-redux";
import { dodajOcjenu } from "../../redux/features/posjetilacSlice";
const { TextArea } = Input;
const { Option } = Select;

const DodajOcjenu = ({ korisnik, arg, show, onClose }) => {
  const [form] = Form.useForm();

  const title1 = `Ocjeni ${arg.naziv}:`;
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleFormSubmit = (values) => {
    form
      .validateFields()
      .then(() => {
        const ocjenaRequest = {
          zvjezdica: values.stars,
          komentar: values.comment,
          korisnikId: korisnik.user.id,
          konferencijaId: arg.id,
        };
        dispatch(
          dodajOcjenu({
            token: korisnik.user.token,
            ocjenaRequest: ocjenaRequest,
          })
        )
          .then((response) => {
            onClose();
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  return (
    <>
      <Modal
        title={title1}
        footer={[]}
        visible={show}
        onCancel={onClose}
        maskClosable={false}
        bodyStyle={{ maxHeight: "300px", overflowY: "auto" }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={handleFormSubmit}
          style={{ maxWidth: 600 }}
          onClick={(event) => event.stopPropagation()}
        >
          <Form.Item
            name="stars"
            label="Stars"
            rules={[{ required: true, message: "Ocjena je obavezna!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Comment"
            name="comment"
            rules={[
              { required: true, message: "Unesite komentar." },
              {
                max: 100,
                message: "Komentar ne smije sadržati više od 100 karaktera.",
              },
            ]}
          >
            <TextArea rows={4} style={{ resize: "none" }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {" "}
              {/* Promijenjen onClick atribut */}
              Sačuvaj
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DodajOcjenu;
