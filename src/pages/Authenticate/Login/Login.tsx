import React, { useState, useEffect } from "react"
import { FloatingLabel, Form } from "react-bootstrap"
import { ErrorMessage, useFormik } from "formik"
import { login } from "../../../services/auth"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import ErrorModal from "./SubComponents/ErrorModal/ErrorModal"
import useAppDispatch from "../../../hooks/useAppDispatch"
import { toggleIsLoggedIn } from "../../../state/redux/features/authSlice"

type Props = {}

const Login = (props: Props) => {
  const [errors, setErrors] = useState<undefined | string>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .required()
      .email()
      .min(5, "To short")
      .max(40, "Too long"),
    password: yup.string().required().min(7, "Too short").max(40, "Too long"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    // validate: (values) => {},
    onSubmit: async (values) => {
      const res: any = await login(values)
      if (res.result === "success") {
        dispatch(toggleIsLoggedIn(""))
        navigate("/booksviewer", { replace: true })
        location.reload()
      } else {
        setErrors(res.reason)
      }
    },
  })

  useEffect(() => {}, [errors])
  return (
    <div className="lm-login">
      <div className="login-container">
        <h4>Login</h4>
        {/* E-Mail */}
        <form>
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
        </form>
        <div className="lm-login__errors">
          {errors ? <p>{errors}</p> : null}
        </div>
        <div className="lm-login__button">
          {formik.dirty && formik.isValid ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                formik.handleSubmit()
              }}
            >
              Login
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                formik.handleSubmit()
              }}
              disabled
            >
              Login
            </button>
          )}
        </div>
        <div className="register-redirect">
          <p>Don't have an account?</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/register", { replace: true })}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
