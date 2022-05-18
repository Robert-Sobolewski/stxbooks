import React, { Fragment } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../features/user/userSlice";

const NavigationMain = () => {
  const dispatch = useDispatch();

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
                  <NavLink className="dropdown-item" to="/home/en">
                    English
                  </NavLink>
                  <NavLink className="dropdown-item" to="/home/pl">
                    Polish
                  </NavLink>
                </NavDropdown>
                <NavLink
                  className="nav-link"
                  onClick={(e: any) => dispatch(logout())}
                  to="/"
                >
                  Logout
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </section>
    </Fragment>
  );
};

export default NavigationMain;
