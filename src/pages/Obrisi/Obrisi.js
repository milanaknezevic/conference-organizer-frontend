import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { obrisiKonferenciju } from "../../redux/features/organizatorSlice";
import classes from "./Obrisi.module.css";

const Obrisi = (props) => {
  const { onClose, konferencija, token, idKonferencije } = props;
  const dispatch = useDispatch();

  const handleObrisi = () => {
    console.log("token", token);

    console.log("idKonferencije u Obrisi", idKonferencije);
    dispatch(obrisiKonferenciju({ token, idKonferencije }))
      .then((response) => {
        console.log("response !", response);
        onClose(); // Zatvorite modal nakon brisanja konferencije
        props.onSave();
      })
      .catch((error) => {
        console.error("Greška prilikom brisanja konferencije:", error);
      });
  };

  return (
    <Modal>
      <div className={classes.obrisi}>
        <div className={classes.obrisiContent}>
          <h3>Da li ste sigurni da želite obrisati {konferencija.naziv}?</h3>
          <button onClick={handleObrisi}>Da</button>
          <button onClick={onClose}>Ne</button>
        </div>
      </div>
    </Modal>
  );
};

export default Obrisi;
