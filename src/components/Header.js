import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../pages/store";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Header = (props) => {
  // Pretpostavljamo da imate informaciju o prijavi korisnika
  // const ulogovan = useSelector((state) => state.ulogovan.value);
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.value.ulogovan;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/");
    console.log("ulogovan", isLoggedIn);
    dispatch(logout());
  };

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
