import { Fragment } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = (props) => {
  const { resurs } = props;
  const modalClass =
    resurs === undefined ? classes.modal : classes.modalZaRezervaciju;

  return (
    <div className={modalClass}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  const { resurs } = props;

  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay resurs={resurs}>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
