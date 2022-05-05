import React, {useState} from "react";
import Logout from "../../components/Logout/Logout"
type Props = {};

const UserPage = (props: Props) => {


  const [email, setEmail] = useState(localStorage.getItem("email"))
  
  return (
    <div>
      {/* TODO E-Mail */}
      <p>{email}</p> 

      {/* TODO Password */}
    <div>Forgot your password? Reset it: <span>
      TODO Link with navigate() to /resetpassword
    </span></div>

      {/* TODO Service */}
      <Logout />
    </div>
  );
};

export default UserPage;
