import React from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import User from "../../../../classes/User";
import { register } from "../../../../services/auth";

type Props = {};

/**
 * Page where we register
 * @param props
 * @returns
 */
const Register = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      emailConfirm: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const { password, email } = values;
      register(values).then(() => {
        resetForm();
      });
    },
  });
  return (
    <div className="lm-register">
      <div className="register__container">
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="E-Mail"
              {...formik.getFieldProps("email")}
            />
            <Form.Control
              type="text"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <Form.Control
              type="text"
              placeholder="Password again"
              {...formik.getFieldProps("passwordConfimr")}
            />
          </Form.Group>
          <button
            className="btn btn-secondary"
            onClick={() => formik.handleSubmit()}
          >
            Register
          </button>
        </Form>
        {/* TODO Error */}
        <div className="lm-register__error"></div>
      </div>
    </div>
  );
};

export default Register;
