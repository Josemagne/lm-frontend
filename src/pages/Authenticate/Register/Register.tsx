import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import User from "../../../classes/User";
import { register } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

type Props = {};

/**
 * Component where we register
 * @param props
 * @returns
 */
const Register = (props: Props) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
      emailConfirm: "",
    },
    validate: (values) => {
      let errors = {};
    },
    onSubmit: async (values, { resetForm }) => {
      const { password, email } = values;
      register({ password, email }).then(() => {
        resetForm();
        navigate("/");
      });
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
              className="btn btn-secondary "
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Register
            </button>
          </div>
        </Form>
        {/* TODO Error */}
        <div className="lm-register__error"></div>
      </div>
    </div>
  );
};

export default Register;
