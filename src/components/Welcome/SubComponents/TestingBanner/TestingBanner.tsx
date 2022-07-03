import React, { useEffect, useState } from "react"
import { Modal, Nav } from "rsuite"
import "./testingbanner.scss"
import { useNavigate } from "react-router-dom"

type Props = {}

const TestingBanner = (props: Props) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {
    setShowModal(false)
  }

  const handleClick = () => {
    setShowModal(false)
    sessionStorage.removeItem("isTesting")
    window.location.reload()
    navigate("/register", { replace: true })
  }

  useEffect(() => {}, [showModal])

  return (
    <div className="lm-testingbanner" onClick={() => setShowModal(true)}>
      <h1>Testing</h1>
      <p>Click here if you want to register</p>
      <Modal
        data-testid="testingbanner__modal"
        open={showModal}
        onClose={handleClose}
        className="testingbanner__modal"
      >
        <Modal.Header>Register</Modal.Header>
        <Modal.Body>
          <p>Have enough of testing? Here you can register:</p>
          <Nav.Item onClick={handleClick}>Register</Nav.Item>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TestingBanner
