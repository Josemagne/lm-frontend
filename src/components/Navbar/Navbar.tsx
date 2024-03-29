import { useState, useEffect } from "react"
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
} from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import Library from "./assets/icons/library.svg"
import { nanoid } from "nanoid"
import LM_Icon from "../../assets/images/favicon.svg"
import authorize from "../../services/authorize"
import Logout from "../Logout/Logout"
import useAppDispatch from "../../hooks/useAppDispatch"
import useAppSelector from "../../hooks/useAppSelector"
import { isLoggedInSelector } from "../../state/redux/features/authSlice"

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [width, setWidth] = useState<number>(0)
  const [show, setShow] = useState<boolean>(false)
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const [isTesting, setIsTesting] = useState(
    sessionStorage.getItem("isTesting") ? true : false
  )

  window.addEventListener("resize", () => {
    setWidth(global.window.innerWidth)
  })

  const requestAuthorization = async () => {
    const authorizeResult = await authorize()
    return authorizeResult
  }

  /**
   * Handles the click event on a link
   */
  const clickHandler = (where: string, inOffcanvas: boolean = false) => {
    console.log("clicked: ", where)
    if (inOffcanvas) setShow(false)
    navigate(where, {
      replace: true,
    })
  }

  useEffect(() => {
    const width = window.innerWidth
    setWidth(width)

    if (!sessionStorage.getItem("isTesting")) {
      // If we have a token then we request authorization to check if it is legit
      if (localStorage.getItem("token")) {
        requestAuthorization().then((authorizationResult) => {
          // If the authorization was not successful then we redirect to the login page
          setIsAuthorized(authorizationResult)
          if (!authorizationResult) {
            localStorage.removeItem("token")
            sessionStorage.removeItem("token")
            navigate("/login", { replace: true })
          }
        })
      }
    } else setIsAuthorized(true)
  }, [])

  // TODO Put that in own component
  const NavbarLink = (route: string, name: string) => (
    <div className="lm-navbar__link" onClick={() => clickHandler(route, true)}>
      <Nav.Item as={Link} to={route}>
        {name}
      </Nav.Item>
    </div>
  )

  return (
    <div className="lm-navbar">
      {width < 576 ? (
        <>
          <BNavbar expand={false} className="lm-navbar__inner">
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
                    {isTesting && (
                      <>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/booksviewer", true)}
                        >
                          <Nav.Item as={Link} to="/booksviewer">
                            Books
                          </Nav.Item>
                        </div>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/flashcards", true)}
                        >
                          <Nav.Item to="/flashcards" as={Link}>
                            Flashcards
                          </Nav.Item>
                        </div>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/notes", true)}
                        >
                          <Nav.Item to="/notes" as={Link}>
                            notes
                          </Nav.Item>
                        </div>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/chaptersviewer", true)}
                        >
                          <Nav.Item to="/chaptersviewer" as={Link}>
                            Chapters
                          </Nav.Item>
                        </div>
                        {/* <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/statistics", true)}
                        >
                          <Nav.Item as={Link} to="/statistics">
                            Statistics
                          </Nav.Item>
                        </div> */}
                      </>
                    )}

                    {isAuthorized && !isTesting && (
                      <>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/booksviewer", true)}
                        >
                          <Nav.Item as={Link} to="/booksviewer">
                            Books
                          </Nav.Item>
                        </div>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/flashcards", true)}
                        >
                          <Nav.Item to="/flashcards" as={Link}>
                            Flashcards
                          </Nav.Item>
                        </div>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/notes", true)}
                        >
                          <Nav.Item to="/notes" as={Link}>
                            notes
                          </Nav.Item>
                        </div>
                        <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/chaptersviewer", true)}
                        >
                          <Nav.Item to="/chaptersviewer" as={Link}>
                            Chapters
                          </Nav.Item>
                        </div>
                        {/* <div
                          className="lm-navbar__link"
                          onClick={() => clickHandler("/statistics", true)}
                        >
                          <Nav.Item as={Link} to="/statistics">
                            Statistics
                          </Nav.Item>
                        </div> */}
                      </>
                    )}
                    {!localStorage.getItem("token") && !isTesting ? (
                      <div
                        className="lm-navbar__link"
                        onClick={() => clickHandler("/login", true)}
                      >
                        <Nav.Item as={Link} to={"/login"}>
                          Login
                        </Nav.Item>
                      </div>
                    ) : null}
                  </div>
                </Offcanvas.Body>
              </BNavbar.Offcanvas>
            </Container>
          </BNavbar>
        </>
      ) : (
        <BNavbar className="lm-navbar__inner">
          <BNavbar.Brand as={Link} to="/" className="lm-navbar__brand">
            <img src={LM_Icon} alt="brand" />
          </BNavbar.Brand>
          <Nav className="lm-navbar__linkscontainer">
            {isAuthorized && (
              <>
                <Nav.Item
                  as={Link}
                  to="/booksviewer"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/chaptersviewer")}
                >
                  Books
                </Nav.Item>
                <Nav.Item
                  as={Link}
                  to="/flashcards"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/flashcards")}
                >
                  FlashCards
                </Nav.Item>
                <Nav.Item
                  as={Link}
                  to="/notes"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/notes")}
                >
                  Notes
                </Nav.Item>
                <Nav.Item
                  as={Link}
                  to="/chaptersviewer"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/chaptersviewer")}
                >
                  Chapters
                </Nav.Item>
                {/* <Nav.Item
                  as={Link}
                  to="/statistics"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/statistics")}
                >
                  Statistics
                </Nav.Item> */}
              </>
            )}
            {!isAuthorized && !isTesting && (
              <>
                <Nav.Item
                  as={Link}
                  to="/login"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/login")}
                >
                  Login
                </Nav.Item>
                <Nav.Item
                  as={Link}
                  to="/register"
                  className="lm-navbar__link"
                  onClick={() => clickHandler("/register")}
                >
                  Register
                </Nav.Item>
              </>
            )}
            <Nav.Item
              as={Link}
              to="/about"
              className="lm-navbar__link"
              onClick={() => clickHandler("/about")}
            >
              About
            </Nav.Item>
            <Nav.Item
              as={Link}
              to={"/authenticate"}
              className="lm-navbar__link "
              onClick={() => clickHandler("/user")}
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
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </Nav.Item>
          </Nav>
        </BNavbar>
      )}
    </div>
  )
}

export default Navbar
