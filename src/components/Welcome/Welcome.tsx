import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Nav } from "rsuite"
import { Modal } from "rsuite"
import "./welcome.scss"

type Props = {}

const Welcome = (props: Props) => {
  const navigate = useNavigate()
  const [showWelcome, setShowWelcome] = useState(false)

  const handleClick = (site: string, test: boolean) => {
    if (test) {
      handleClose()
      sessionStorage.setItem("isTesting", "true")
      window.location.reload()
      navigate(site, { replace: true })
    } else {
      handleClose()
      navigate(site, { replace: true })
    }
  }

  const handleClose = () => {
    setShowWelcome(false)
  }

  useEffect(() => {
    // NOTE After 5 seconds we set the counter to true. If the welcome: boolean is set to true then we show the Welcome Modal to the user.
    if (!sessionStorage.getItem("isTesting")) {
      setTimeout(() => {
        if (!localStorage.getItem("token")) setShowWelcome(true)
      }, 3000)
    }
  }, [])

  useEffect(() => {}, [showWelcome])
  return (
    <>
      <Modal className="lm-welcome" open={showWelcome} onClose={handleClose}>
        <h1>Welcome to LibriMem</h1>
        <p>
          You want to test the app? Here you have the possibility to test it but
          know that your data won't be saved in a database.{" "}
        </p>
        <p>
          To persist your text you have to register{" "}
          <span>
            <Nav.Item onClick={() => handleClick("/register", false)}>
              Register
            </Nav.Item>
          </span>
        </p>
        <div className="welcome__test">
          <Nav.Item
            className="welcome__test__link"
            onClick={() => handleClick("/booksviewer", true)}
          >
            TEST
          </Nav.Item>
        </div>
      </Modal>
    </>
  )
}

export default Welcome
