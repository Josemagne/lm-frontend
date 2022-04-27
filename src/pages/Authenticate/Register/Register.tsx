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
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: registerSchema,
    validate: (values) => {
      let errors: any = {};

      if (!(values.password.length > 6)) {
        errors.password = "Password must be at least 7 characters long";
      }

      if (values.password !== values.passwordConfirm) {
        errors.password = "The passwords are not the same";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const { password, email } = values;
      const res: any = await register({ password, email });
      console.log("res: ", res)

      if (res.data.result === "success") {
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
            <div className="lm-register__errors">
              {formik.errors.email ? <p>{formik.errors.email}</p> : null}
            </div>
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
            <div className="lm-register__errors">
              {formik.errors.password ? <p>{formik.errors.password}</p> : null}
            </div>
          </Form.Group>
          <div className="register__btn">
            {formik.isValid && formik.dirty ? (
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
            ) : (
              <button type="button" className="btn btn-secondary " disabled>
                Register
              </button>
            )}
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
