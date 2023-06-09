import { Fragment, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { odjaviSe, odjavi } from "../redux/features/userSlice";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const user = useSelector((state) => state.login);
  const isLoggedIn = user.ulogovan;
  const [rola, setRola] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
    dispatch(odjaviSe(false));
    dispatch(odjavi());
  };

  useEffect(() => {
    // console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      setRola(user.user.rola);
    }
  }, [isLoggedIn, rola]); // Dodana rola kao ovisnost useEffect-a

  return (
    <Fragment>
      <header className={classes.header}>
        <div>
          <h1 className={classes.headerTitle}>Pro Event Conference</h1>
          {isLoggedIn && (
            <Link className={`${classes.logout}`} to="/" onClick={handleLogout}>
              Odjavi se
            </Link>
          )}
          {isLoggedIn && (
            <Link className={`${classes.myProfile}`} to="/user_details">
              Moj Profil
            </Link>
          )}

          {isLoggedIn && rola === "ORGANIZATOR" && (
            <Link className={`${classes.konferencije}`} to="/organizator">
              Konferencije
            </Link>
          )}
          {isLoggedIn && rola === "ADMIN" && (
            <Link className={`${classes.konferencije}`} to="/admin">
              Konferencije
            </Link>
          )}
          {isLoggedIn && rola === "POSJETILAC" && (
            <Link className={`${classes.konferencije}`} to="/posjetilac">
              Konferencije
            </Link>
          )}
          {isLoggedIn && rola === "POSJETILAC" && (
            <Link
              className={`${classes.mojeKonferencije}`}
              to="/moje_konferencije"
            >
              Moje Konferencije
            </Link>
          )}
          {isLoggedIn && rola === "MODERATOR" && (
            <Link className={`${classes.konferencije}`} to="/moderator">
              Moje Konferencije
            </Link>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default Header;
