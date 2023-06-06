import React from "react";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.zaH1}>404</h1>
      <p className={classes.zaP}>Stranica nije pronađena</p>
      <a className={classes.zaA} href="/">
        Vratite se na početnu stranicu
      </a>
    </div>
  );
};

export default NotFound;
