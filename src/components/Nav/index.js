import React from "react";
import { Navbar, Form, FormControl, Button, Nav } from "react-bootstrap";
import Search from "../Search";

const TheNav = ({ toggleModal }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Button onClick={toggleModal} className="mr-2" size="lg">
          <i className="fas fa-bars"> </i>
        </Button>

        <Navbar.Brand href="#home">Google Trends</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Search />
      </Navbar>
    </>
  );
};

export default TheNav;
