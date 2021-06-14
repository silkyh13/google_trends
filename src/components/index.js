import React, { useState } from "react";

import Nav from "./Nav";
import Line from "./Line";
import Sidebar from "./Sidebar";
export default function LineGraph() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Nav toggleModal={toggleModal} />

      <Line isOpen={isOpen} />
      <Sidebar isOpen={isOpen} toggleModal={toggleModal} />
      <div className={"modalcover" + (isOpen ? " show" : " none")}></div>
    </>
  );
}
