import React from "react";
import { useNavigate } from "react-router";
import Login from "./Login/Login";
import Register from "./Register/Register";

type Props = {};

const Authenticate = (props: Props) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <div className="lm-authenticate">
      {/* If we have already a token then we redirect to the login */}
      {token ? <Login /> : <Register />}
    </div>
  );
};

export default Authenticate;
