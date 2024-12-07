import React from "react";
import ReactDOM from "react-dom";

import Style from "./Modal.module.css";
const Modal = ({ children }) => {
  const location = document.getElementById("modal");
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, location)}
      {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, location)}
    </>
  );
};

const Backdrop = () => {
  return <div className={Style.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={Style.modal}>
      <div className={Style.content}>{children}</div>
    </div>
  );
};

export default Modal;
