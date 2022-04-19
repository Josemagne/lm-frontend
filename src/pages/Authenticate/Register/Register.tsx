import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import User from "../../../classes/User";
import { register } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type Props = {};

/**
 * Component where we register
 * @param props
 * @returns
 */
const Register = (props: Props) => {
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>();
  const registerSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required()
      .min(5, "Too short")
      .max(40, "Too long"),
    password: yup.string().required().min(7, "Too short").max(30, "Too long"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      passwordConfirm: "",
    },
    validate: (values) => {
      let errors: any = {};

      if (!(values.password.length > 6)) {
        errors.password = "Password must be at least 7 characters long";
      }

      if (values.email !== values.passwordConfirm) {
        errors.password = "The password are not the same";
      }

      registerSchema.isValid(values);
    },
    onSubmit: async (values) => {
      const { password, email } = values;
      const result = await register({ password, email });

      console.log("The result: ", result);
      if (result === "success") {
        navigate("/", { replace: true });
      } else {
        setError("The email already exists");
      }
    },
  });

  return (
    <div className="lm-register">
      <div className="lm-register__container">
        <h4>Register</h4>
        <Form>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="E-Mail"
              {...formik.getFieldProps("email")}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <Form.Control
              type="password"
              placeholder="Password again"
              {...formik.getFieldProps("passwordConfirm")}
            />
          </Form.Group>
          <div className="register__btn">
            <button
              type="button"
              className="btn btn-secondary "
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Register
            </button>
          </div>
          <div className="lm-register__form-error">
            <p>{error ? error : null}</p>
          </div>
        </Form>
        <div className="login-redirec">
          <p>Already registered?</p>
          <button
            className="login-redirect__btn"
            onClick={() => navigate("/login", { replace: true })}
          >
            Login
          </button>
        </div>
        {/* TODO Error */}
      </div>
    </div>
  );
};

export default Register;
