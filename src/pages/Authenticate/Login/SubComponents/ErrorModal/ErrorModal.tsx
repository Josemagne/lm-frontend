import React from "react"
import { Modal } from "rsuite"
import { useNavigate } from "react-router"

type Props = {
  errorMessage: string
}

const ErrorModal = ({ errorMessage }: Props) => {
  const navigate = useNavigate()
  return (
    <Modal open={true}>
      <p className="text-danger">{errorMessage}</p>
      <a onClick={() => navigate("/register", { replace: true })}>Register</a>
    </Modal>
  )
}

export default ErrorModal
