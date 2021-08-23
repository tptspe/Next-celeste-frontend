import React from "react";
import Link from "next/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Router from "next/router";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import * as Yup from "yup";

const reportValidation = Yup.object().shape({
  reason: Yup.string().required("Required."),
  comment: Yup.string().required("Required.")  
});

export default class ReportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalShow: false      
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("modal props", nextProps);
    if (nextProps.mode == "edit") {
      this.setState({ loading: true });
      this.getServiceByID(nextProps.editId);
    } else {
      this.setState({ loading: false });
    }
  }
  // Modal Action

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  //Action
  getServiceByID = async id => {
    let token = this.props.token;
    console.log("modal getServiceID", id);

    axios
      .get(serverUrl + `api/services/${id}`, {
        headers: { Authorization: token }
      })
      .then(response => {
        this.setState({ service: response.data.service });
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
      .finally(() => {});
  };

  handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    let token = this.props.token;
    let { services } = this.state;
    console.log("submit");
  }

    
  handleUpdateSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    let token = this.props.token;
    let { services } = this.state;
    
  };

  editService = idx => {
    console.log(idx);
  };

  deleteService = idx => {
    console.log(idx);
  };

  render() {
    //let data = this.props.services;
    let { service, loading } = this.state;
    let { show, onClose, mode, services } = this.props;

    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : (
          <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
              <Modal.Title>
               Report an artist
              </Modal.Title>
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
                  reason: "",
                  comment: ""                  
                }}
                validationSchema={reportValidation}
                onSubmit={ this.handleSubmit }
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
                        <label>Why are you reporting this artist?</label>
                        <Field
                            name="reason"
                            component="select"
                            placeholder=""
                            className={`form-control ${
                              touched.reason &&
                              errors.reason
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled={true}></option>
                            <option value="1">Innappropriate language</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="reason"
                            className="invalid-feedback"
                          />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <label>Comments</label>
                        <Field
                          name="comment"
                          component="textarea"
                          rows="3"
                          placeholder="Description"
                          className={`form-control ${
                            touched.comment && errors.comment
                              ? "is-invalid"
                              : ""
                          }`}
                          value={values.comment}
                        />
                        <ErrorMessage
                          component="div"
                          name="comment"
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
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </Modal>
        )}
      </div>
    );
  }
}
