import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../App.css";
import { fetchKorisnici } from "../../redux/features/adminSlice";
import Toolbar from "../../components/Toolbar";
import Edit from "../Edit/Edit";

const Admin = () => {
  const [korisnici, setKorisnici] = useState([]);
  const [izbor, setIzbor] = useState("aktivni");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const user = useSelector((state) => state.login);
  const token = user.user.token;
  const userId = user.user.id;
  const dispatch = useDispatch();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    dispatch(fetchKorisnici({ token, userId, izbor }))
      .then((response) => {
        console.log("response", response);
        setKorisnici(response.payload);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [dispatch, token, userId, izbor, refreshKey]);

  const handleEdit = (korisnik) => {
    setSelectedUser(korisnik);
    setOpenModal(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  const handleSaveEdit = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  let korisniciList;
  if (korisnici && korisnici.length > 0) {
    korisniciList = korisnici.map((korisnik) => (
      <li
        key={korisnik.id}
        className={openModal ? "admin-container zatamniListu" : "korisnik-item"}
      >
        <div>
          <div className="underline">
            <span className="polja-color">Naziv:</span>{" "}
            <span> {korisnik.naziv}</span>
          </div>
          <div className="underline">
            <span className="polja-color">Korisnicko ime:</span>{" "}
            <span> {korisnik.username}</span>
          </div>
          <div className="underline">
            <span className="polja-color">Email:</span>{" "}
            <span> {korisnik.email}</span>
          </div>
          <div className="underline">
            <p>
              <span className="polja-color">Status:</span>{" "}
              <span>{korisnik.status}</span>
            </p>
          </div>
          <div className="underline">
            <span className="polja-color">Rola:</span>{" "}
            <span> {korisnik.rola}</span>
          </div>
        </div>
        <button
          className={openModal ? "zzz" : "editButton"}
          onClick={() => handleEdit(korisnik)}
        >
          Izmjeni
        </button>
      </li>
    ));
  } else {
    korisniciList = <li>Trenutno nema dostupnih korisnika.</li>;
  }

  const handleIzborAktivnih = async (e) => {
    e.preventDefault();
    setIzbor("aktivni");
  };

  const handleIzborBlokiranih = async (e) => {
    e.preventDefault();
    setIzbor("blokirani");
  };

  const handleIzborZahtjeva = async (e) => {
    e.preventDefault();
    setIzbor("zahtjevi");
  };

  return (
    <div>
      <div className={openModal ? "toolbar-active" : "toolbar"}>
        <Toolbar
          dugme1={"Aktivni Korisnici"}
          dugme2={"Blokirani Korisnici"}
          dugme3={"Zahtjevi"}
          izbor1={handleIzborAktivnih}
          izbor2={handleIzborBlokiranih}
          izbor3={handleIzborZahtjeva}
        />
      </div>

      <section>
        <ul>{korisniciList}</ul>
      </section>

      {selectedUser && (
        <Edit
          user={selectedUser}
          onClose={handleClose}
          token={token}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Admin;