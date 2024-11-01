import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


function Navbar() {
    return (
      <BootstrapNavbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
      >
        <Container>
          {/* Brand */}
          <LinkContainer to="/">
            <BootstrapNavbar.Brand>UF Clubs</BootstrapNavbar.Brand>
          </LinkContainer>
          <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
          <BootstrapNavbar.Collapse id="responsive-navbar-nav">
            {/* Left Side of NavBar*/}
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/calendar">
                <Nav.Link>Calendar</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            </Nav>
            {/* Right Side of NavBar*/}
            <Nav>
              {/* {isLoggedIn && ( */}
              <LinkContainer to="/logout">
                <Nav.Link>Logout</Nav.Link>
              </LinkContainer>
              {/* )} */}
  
              {/* {!isLoggedIn && ( */}
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <LinkContainer to="/login">
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/register">
                  <NavDropdown.Item>Sign up</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              {/* )} */}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    );
  }
  
  export default Navbar;
