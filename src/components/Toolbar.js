import React from "react";
import classes from "./Toolbar.module.css";

const Toolbar = (props) => {
  const { izbor1, izbor2, izbor3, open } = props;

  return (
    <div className={open ? classes["toolbarActive"] : classes.toolbar}>
      <button className={classes.toolbarButton} type="button" onClick={izbor1}>
        {props.dugme1}
      </button>
      <button className={classes.toolbarButton} type="button" onClick={izbor2}>
        {props.dugme2}
      </button>
      <button className={classes.toolbarButton} type="button" onClick={izbor3}>
        {props.dugme3}
      </button>
    </div>
  );
};

export default Toolbar;
