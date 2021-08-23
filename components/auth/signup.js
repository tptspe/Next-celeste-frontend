import react, { useState } from "react";
import Link from "next/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "react-bootstrap";
// import "./styles.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import cookie from "js-cookie";
import Router from "next/router";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'

export default class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      setModalShow: false
    };
  }
  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  showLoginWall = e => {
    this.onClose(e);
    this.props.showLoginWall(e);
  };
  handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    axios
      .post(serverUrl + "api/auth/signup", values)
      .then(response => {
        if (response.data.auth == true) {
          cookie.set("token", response.data.token, { expires: 1 });
          cookie.set("role", response.data.role, { expires: 1 });
          cookie.set("name", response.data.name, { expires: 1 });
          
          if (response.data.role == "artist") {
            Router.push("/artist/create-profile");
          } else if (response.data.role == "client") {
            Router.push("/client/account");
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
            <Modal.Title>Sign up</Modal.Title>
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
              initialValues={{
                email: "",
                password: "",
                role: "artist",
                repassword: "",
                agreeTerm: false,
                newsletter: false
              }}
              validate={values => {
                console.log("values", values);
                let errors = {};
                if (values.email === "") {
                  errors.email = "Email is required";
                } else if (!emailTest.test(values.email)) {
                  errors.email = "Invalid email address format";
                }
                if (values.password === "") {
                  errors.password = "Password is required";
                }

                if (values.repassword === "") {
                  errors.repassword = "Confirm Password is required";
                }

                if (values.password != values.repassword) {
                  errors.repassword =
                    "Confirm password must be same with password";
                }

                if (values.agreeTerm == false) {
                  errors.agreeTerm =
                    "You must select the agree terms and conditions";
                }
                return errors;
              }}
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
                        placeholder="Enter email"
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
                        placeholder="Enter password"
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
                      <Field
                        type="password"
                        name="repassword"
                        placeholder="Enter Confirm password"
                        className={`form-control ${
                          touched.repassword && errors.repassword
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        component="div"
                        name="repassword"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className=" col-md-12 ">
                      <label className="checkbox_container">
                        agree to the terms and conditions
                        <Field
                          type="checkbox"
                          name="agreeTerm"
                          className={`form-control  ${
                            touched.agreeTerm && errors.agreeTerm
                              ? "is-invalid"
                              : ""
                          }`}
                        />
                        <span className="form-control checkmark"></span>
                        <ErrorMessage
                          component="div"
                          name="agreeTerm"
                          className="invalid-feedback"
                        />
                      </label>
                    </div>
                    <div className="form-group col-md-12">
                      <label className="checkbox_container">
                        Sign me up for the newsletter
                        <input
                          type="checkbox"
                          className="form-Control"
                          name="newsletter"
                        />
                        <span className="form-control checkmark"></span>
                      </label>
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={isSubmitting}
                      >
                        {" "}
                        Sign Up
                      </button>
                    </div>
                  </div>

                  <div className="row bottomCenter">
                    <div className="">
                      <p>
                        Already have an account?{" "}
                        <a href="#" onClick={this.showLoginWall}>
                          <b>Log in</b>
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
