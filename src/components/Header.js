import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { odjaviSe, odjavi } from "../redux/features/userSlice";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
const Header = (props) => {
  const user = useSelector((state) => state.login);
  const isLoggedIn = user.ulogovan;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
    dispatch(odjaviSe(false));
    dispatch(odjavi());
  };
  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.headerContainer}>
          <h1>Pro Event Conference</h1>
          {isLoggedIn && (
            <button
              className={`${classes.logoutButton}`}
              onClick={handleLogout}
            >
              Odjavi se
            </button>
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
