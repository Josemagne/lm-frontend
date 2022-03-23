import { useState, useEffect } from "react";
import { Navbar as LMNBavbar, Dropdown, Nav } from "rsuite";
import {
  Navbar as BNavbar,
  Offcanvas,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
  NavLink,
} from "react-bootstrap";
import Library from "./assets/icons/library.svg";

type Props = {};

const Navbar = (props: Props) => {
  const [width, setWidth] = useState<number>(0);
  window.addEventListener("resize", () => {
    setWidth(global.window.innerWidth);
  });

  useEffect(() => {}, [width]);
  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);
  }, []);

  return (
    <div className="lm-BNavbar">
      {width < 576 ? (
        <div className="lm-BNavbar">
          <BNavbar bg="light" expand={false}>
            <Container fluid>
              <BNavbar.Brand href="#">LibriMem</BNavbar.Brand>
              <BNavbar.Toggle aria-controls="offcanvasBNavbar" />
              <BNavbar.Offcanvas
                id="offcanvasBNavbar"
                aria-labelledby="offcanvasBNavbarLabel"
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasBNavbarLabel">
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink href="#action1">Home</NavLink>
                    <NavLink href="#action2">Link</NavLink>
                    <NavDropdown title="Dropdown" id="offcanvasBNavbarDropdown">
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                  <Form className="d-flex">
                    <FormControl
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </BNavbar.Offcanvas>
            </Container>
          </BNavbar>
        </div>
      ) : (
        <LMNBavbar>
          <LMNBavbar.Brand>
            <p>i</p>
          </LMNBavbar.Brand>
          <Nav>
            <Nav.Item href="/">Books</Nav.Item>
            <Nav.Item href="/bookmodifier">Modifier</Nav.Item>
            <Dropdown title="Other">
              <Nav.Item href="/settings">Settings</Nav.Item>
            </Dropdown>
            <Nav.Item>Coordinator</Nav.Item>
            <Nav.Item href="/flashcards">FlashCards</Nav.Item>
          </Nav>
        </LMNBavbar>
      )}
    </div>
  );
};

export default Navbar;
