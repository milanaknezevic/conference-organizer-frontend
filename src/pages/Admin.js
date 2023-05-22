import React, { useEffect, useState } from "react";
import {
  getAktivni,
  getBlokirani,
  getZahtjevi,
} from "../services/admin.services";
import { useSelector } from "react-redux";
import "../App.css";
import Edit from "./Edit";

const Admin = () => {
  const [korisnici, setKorisnici] = useState([]);
  const [izbor, setIzbor] = useState("aktivni");
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  const user = useSelector((state) => state.user);
  const token = user.value.token;
  const userId = user.value.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (izbor === "aktivni") {
          const data = await getAktivni(token, userId);
          setKorisnici(data);
        } else if (izbor === "zahtjevi") {
          const data = await getZahtjevi(token, userId);
          setKorisnici(data);
        } else if (izbor === "blokirani") {
          const data = await getBlokirani(token, userId);
          setKorisnici(data);
        }
      } catch (error) {
        console.error("Greška prilikom dohvata korisnika:", error);
      }
    };

    const refresuj = async () => {
      try {
        if (refreshData) {
          console.log("izbor ", izbor);
          console.log("refreshedData ", refreshData);
          if (izbor === "aktivni") {
            const data = await getAktivni(token, userId);
            setKorisnici(data);
          } else if (izbor === "zahtjevi") {
            const data = await getZahtjevi(token, userId);
            setKorisnici(data);
          } else if (izbor === "blokirani") {
            const data = await getBlokirani(token, userId);
            setKorisnici(data);
          }
          setRefreshData(false);
        }
      } catch (error) {
        console.error("Greška prilikom dohvata korisnika:", error);
      }
    };
    fetchData();
    refresuj();
  }, [token, userId, izbor, refreshData]);

  const handleEdit = (korisnik) => {
    setSelectedUser(korisnik);
    setOpenModal(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpenModal(false);
  };

  let korisniciList;
  if (korisnici && korisnici.length > 0) {
    korisniciList = korisnici.map((korisnik) => (
      <li
        key={korisnik.id}
        className={
          openModal ? "admin-container .zatamniListu" : "korisnik-item"
        }
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
    try {
      const data = await getAktivni(token, userId);
      setKorisnici(data);
    } catch (error) {
      console.error("Greška prilikom dohvata aktivnih korisnika:", error);
    }
  };

  const handleIzborBlokiranih = async (e) => {
    e.preventDefault();
    setIzbor("blokirani");
    try {
      const data = await getBlokirani(token, userId);
      setKorisnici(data);
    } catch (error) {
      console.error("Greška prilikom dohvata blokiranih korisnika:", error);
    }
  };

  const handleIzborZahtjeva = async (e) => {
    e.preventDefault();
    setIzbor("zahtjevi");
    try {
      const data = await getZahtjevi(token, userId);
      setKorisnici(data);
    } catch (error) {
      console.error("Greška prilikom dohvata zahtjeva:", error);
    }
  };

  return (
    <div>
      <div className={openModal ? "toolbar-active" : "toolbar"}>
        <div>
          <button type="button" onClick={handleIzborAktivnih}>
            Aktivni Korisnici
          </button>
          <button type="button" onClick={handleIzborBlokiranih}>
            Blokirani Korisnici
          </button>
          <button type="button" onClick={handleIzborZahtjeva}>
            Zahtjevi
          </button>
        </div>
      </div>

      <section>
        <ul>{korisniciList}</ul>
      </section>

      {selectedUser && (
        <Edit
          user={selectedUser}
          onClose={handleClose}
          token={token}
          onStatusChange={() => setRefreshData(!refreshData)}
        />
      )}
    </div>
  );
};

export default Admin;
