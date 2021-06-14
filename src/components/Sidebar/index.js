import React from "react";

import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";

export default function Sidebar({ isOpen, toggleModal }) {
  const modalStyles = {
    overlay: {
      background: "rgba(0, 0, 0, 0)",
      opacity: "1",
    },
  };
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="dialog">
      <Modal
        show={isOpen}
        ariaHideApp={false}
        closeTimeoutMS={500}
        isOpen={isOpen}
        style={modalStyles}
        className={"modal" + (isOpen && " show")}
      >
        <button onClick={toggleModal}>Close Modal</button>
        <div>Hello World</div>
      </Modal>
    </CSSTransition>
  );
}
