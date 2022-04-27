import React, {useState} from "react";

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
    </div>
  );
};

export default UserPage;
