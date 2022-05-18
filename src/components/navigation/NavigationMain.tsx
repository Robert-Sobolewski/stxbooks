import React, { Fragment } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const NavigationMain = () => {
  return (
    <Fragment>
      <section className="navigation-main">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">STX BookStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="/home">Home</Nav.Link> */}
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
                <NavDropdown title="Language" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/home/en">English</NavDropdown.Item>
                  <NavDropdown.Item href="/home/pl">Polish</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </Fragment>
  );
};

export default NavigationMain;
