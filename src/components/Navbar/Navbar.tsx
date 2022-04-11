import { useState, useEffect } from "react";
import { Navbar as LMNBavbar, Dropdown } from "rsuite";
import {
  Navbar as BNavbar,
  Offcanvas,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
  NavLink,
  Nav,
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
    <div className="lm-navbar">
      {width < 576 ? (
        <>
          <BNavbar expand={false}>
            <Container fluid>
              <BNavbar.Brand href="/">LibriMem</BNavbar.Brand>
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
                  <div className=" lm-navbar__linkscontainer ">
                    <div className="lm-navbar__link">
                      <Nav.Item as={Link} to="/" onClick={() => setShow(false)}>
                        Books
                      </Nav.Item>
                    </div>
                    <div className="lm-navbar__link">
                      <Nav.Item
                        to="/flashcards"
                        as={Link}
                        onClick={() => setShow(false)}
                      >
                        Flashcards
                      </Nav.Item>
                    </div>
                    {/* <Dropdown title="Other">
                      <Nav.Item
                        to="/settings"
                        as={Link}
                        onClick={() => setShow(false)}
                      >
                        Settings
                      </Nav.Item>
                    </Dropdown> */}
                  </div>
                </Offcanvas.Body>
              </BNavbar.Offcanvas>
            </Container>
          </BNavbar>
        </>
      ) : (
        <LMNBavbar>
          <LMNBavbar.Brand as={Link} to="/">
            LM
          </LMNBavbar.Brand>
          <Nav>
            <Nav.Item as={Link} to="/">
              Books
            </Nav.Item>
            {/* <Nav.Item href="/bookmodifier" to="/bookmodifier" as={Link}>
              Modifier
            </Nav.Item> */}
            {/* <Dropdown title="Other">
              <Nav.Item href="/settings" to="/settings" as={Link}>
                Settings
              </Nav.Item>
            </Dropdown> */}
            {/* <Nav.Item>Coordinator</Nav.Item> */}
            <Nav.Item as={Link} to="/flashcards">
              FlashCards
            </Nav.Item>
          </Nav>
        </LMNBavbar>
      )}
    </div>
  );
};

export default Navbar;
