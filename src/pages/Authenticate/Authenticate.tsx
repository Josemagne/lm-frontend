import React, {useEffect} from "react";
import { useNavigate } from "react-router";
import Login from "./Login/Login";
import Register from "./Register/Register";

type Props = {};

const Authenticate = (props: Props) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(()=> {
  //If we have the token in localStorage then we navigate to the UserPage
  //Else we navigate to RegisterPage
  token ? navigate("/user",{replace: true}) : navigate("/register", {replace: true})

  },[])

  return (
    <div className="lm-authenticate">
    </div>
  );
};

export default Authenticate;
