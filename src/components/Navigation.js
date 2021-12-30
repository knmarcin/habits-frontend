import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import useToken from "../auth/useToken";

const Navigation = () => {
  const { token } = useToken();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {token && (
          <NavLink className="navbar-brand" to="/dashboard">
            Habitfy
          </NavLink>
        )}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <NavLink className="nav-link" to="/add">
                Add habit
              </NavLink>
            )}
          </Nav>
          <Nav>
            {token ? (
              <>
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
