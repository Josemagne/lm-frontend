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
import { Link } from "react-router-dom";
import Library from "./assets/icons/library.svg";
import { nanoid } from "nanoid";
import Navigation from "../Navigation/Navigation";

type Props = {};

const Navbar = (props: Props) => {
  const [width, setWidth] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);
  window.addEventListener("resize", () => {
    setWidth(global.window.innerWidth);
  });

  useEffect(() => {}, [width, show]);
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
              <BNavbar.Toggle
                aria-controls="offcanvasBNavbar"
                onClick={() => setShow(true)}
              />
              <BNavbar.Offcanvas
                id="offcanvasBNavbar"
                aria-labelledby="offcanvasBNavbarLabel"
                placement="start"
                key={nanoid()}
                show={show}
                onHide={() => setShow(false)}
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasBNavbarLabel">
                    LibriMem
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div className=" d-flex ">
                    <Nav.Item
                      as={Link}
                      to="/"
                      href="/"
                      onClick={() => setShow(false)}
                    >
                      Books
                    </Nav.Item>
                    <Nav.Item
                      to="/bookmodifier"
                      as={Link}
                      onClick={() => setShow(false)}
                    >
                      Modify book
                    </Nav.Item>
                    <Dropdown title="Other">
                      <Nav.Item
                        to="/settings"
                        as={Link}
                        onClick={() => setShow(false)}
                      >
                        Settings
                      </Nav.Item>
                    </Dropdown>
                  </div>
                </Offcanvas.Body>
              </BNavbar.Offcanvas>
            </Container>
          </BNavbar>
        </div>
      ) : (
        <LMNBavbar>
          <LMNBavbar.Brand as={Link} to="/">
            LM
          </LMNBavbar.Brand>
          <Nav>
            <Nav.Item as={Link} to="/" href="/">
              Books
            </Nav.Item>
            {/* <Nav.Item href="/bookmodifier" to="/bookmodifier" as={Link}>
              Modifier
            </Nav.Item> */}
            <Dropdown title="Other">
              <Nav.Item href="/settings" to="/settings" as={Link}>
                Settings
              </Nav.Item>
            </Dropdown>
            {/* <Nav.Item>Coordinator</Nav.Item> */}
            {/* <Nav.Item href="/flashcards" as={Link} to="/flashcards">
              FlashCards
            </Nav.Item> */}
          </Nav>
        </LMNBavbar>
      )}
    </div>
  );
};

export default Navbar;
