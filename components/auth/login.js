import react, { useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "react-bootstrap";
import "../../public/sass/login.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import * as Yup from "yup";

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid e-mail address.")
    .required("Email is required."),
  password: Yup.string().required("Password is required.")
});

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      artist: {},
      modalShow: false,
      setModalShow: false
    };
  }
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  showSignupModal = e => {
    this.onClose(e);
    this.props.showSignUp(e);
  };
  handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    axios
      .post(serverUrl + "api/auth/login", values)
      .then(response => {
        if (response.data.auth == true) {
          cookie.set("token", response.data.token, { expires: 1 });
          cookie.set("role", response.data.role, { expires: 1 });
          cookie.set("name", response.data.name, { expires: 1 });

          if (response.data.role == "artist") {
            Router.push(response.data.profile_completion);
          } else if (response.data.role == "client") {
            Router.push("/client/dashboard");
          } else {
            Router.push("/");
          }
        } else {
          setErrors({ total: response.data.message });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        setErrors({ total: error.message });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose} centered>
          <Modal.Header>
            <Modal.Title>Log in</Modal.Title>
            <span
              className="closebutton"
              onClick={e => {
                this.onClose(e);
              }}
            >
              <i className="fas fa-times"></i>
            </span>
          </Modal.Header>
          <ModalBody>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidation}
              onSubmit={this.handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  {errors.success && (
                    <p className="success">{errors.success}</p>
                  )}
                  {errors.total && <p className="error">{errors.total}</p>}
                  <div className="row">
                    <div className="form-group col-md-12">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <ErrorMessage
                        component="div"
                        name="email"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className={`form-control ${
                          touched.password && errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="password"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                      >
                        {" "}
                        Log in
                      </button>
                    </div>
                  </div>

                  <div className="row bottomCenter">
                    <div className="">
                      <p>
                        Don't have an account?{" "}
                        <a href="#" onClick={this.showSignupModal}>
                          <b>Sign up</b>
                        </a>
                      </p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
