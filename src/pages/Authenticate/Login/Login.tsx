import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { login } from "../../../services/auth";

type Props = {};

const Login = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div className="lm-login">
      <h4>Login</h4>
      {/* E-Mail */}
      <div className="lm-login__email">
        <FloatingLabel controlId="email" label="E-Mail">
          <Form.Control
            type="text"
            placeholder="E-Mail"
            {...formik.getFieldProps("email")}
          ></Form.Control>
        </FloatingLabel>
      </div>
      {/* Password */}
      <div className="lm-login__password">
        <FloatingLabel controlId="password" label="Pasword">
          <Form.Control
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          ></Form.Control>
        </FloatingLabel>
      </div>
    </div>
  );
};

export default Login;
