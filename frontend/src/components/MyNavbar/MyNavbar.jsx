import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


function MyNavbar() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        data-bs-theme="dark"
      >
        <Container>
          {/* Brand */}
          <LinkContainer to="/">
            <Navbar.Brand>UF Clubs</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  
  export default MyNavbar;
