import React from "react";
import { useNavigate } from "react-router";

type Props = {};

const Authenticate = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="lm-authenticate">
      <div className="go-to-register">
        {" "}
        You do not have yet an account? Let's register:{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </div>
      <div className="go-to-login"></div>
    </div>
  );
};

export default Authenticate;
