import { useState, useEffect } from "react";
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
import LM_Icon from "../../assets/images/favicon.svg";

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
                className="lm-offcanvas"
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
                      <Nav.Item
                        as={Link}
                        to={
                          localStorage.getItem("token")
                            ? "/user"
                            : "/authenticate"
                        }
                        className="lm-navbar__link"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
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
        <BNavbar>
          <BNavbar.Brand as={Link} to="/" className="lm-navbar__brand">
            <img src={LM_Icon} alt="brand" />
          </BNavbar.Brand>
          <Nav className="lm-navbar__linkscontainer">
            <Nav.Item as={Link} to="/" className="lm-navbar__link">
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
            <Nav.Item as={Link} to="/flashcards" className="lm-navbar__link">
              FlashCards
            </Nav.Item>
            <Nav.Item
              as={Link}
              to={localStorage.getItem("token") ? "/user" : "/authenticate"}
              className="lm-navbar__link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Nav.Item>
          </Nav>
        </BNavbar>
      )}
    </div>
  );
};

export default Navbar;
