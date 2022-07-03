import React, { useState } from "react"
import Logout from "../../components/Logout/Logout"
import "./userpage.scss"
type Props = {}

const UserPage = (props: Props) => {
  const [email, setEmail] = useState(localStorage.getItem("email"))

  return (
    <div className="lm-user lm-page">
      {/* TODO E-Mail */}
      <p>{email}</p>

      {/* TODO Password */}
      <div>
        Forgot your password? Reset it:{" "}
        <span>TODO Link with navigate() to /resetpassword</span>
      </div>

      {/* TODO Service */}
      <Logout />
    </div>
  )
}

export default UserPage
