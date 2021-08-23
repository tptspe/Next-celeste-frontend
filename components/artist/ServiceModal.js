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

const serviceValidation = Yup.object().shape({
  name: Yup.string().required("Name is required."),
  description: Yup.string().required("Description is required."),
  max_number_of_people: Yup.string().required("Max people num is required."),
  duration_id: Yup.string().required("Service Time is required."),
  duration_unit_id: Yup.string().required("Per Person is required."),
  location_id: Yup.string().required("Service place is required."),
  base_price: Yup.string().required("Base price is required."),
  extra_per_person: Yup.string().required("Extra per person is required.")
});

export default class ServiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalShow: false,
      services: [],
      service: [],
      setModalShow: false,
      mode: this.props.mode
    };
  }

  componentDidMount() {}

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

    axios
      .post(serverUrl + "api/services/me/createService", values, {
        headers: { Authorization: token }
      })
      .then(response => {
        values.id = response.data.serviceInsert[0];
        this.props.action(values);
      })
      .catch(error => {
        this.setState({ loading: false });
        setErrors({ total: error.message });
        //this.setState({loading: false});
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  handleUpdateSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
  ) => {
    let token = this.props.token;
    let { services } = this.state;

    //return;
    axios
      .put(serverUrl + "api/services/me/updateService", values, {
        headers: { Authorization: token }
      })
      .then(response => {
        this.props.action(values);
        this.setState({ loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
        setErrors({ total: error.message });
        //this.setState({loading: false});
      })
      .finally(() => {
        setSubmitting(false);
      });
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
      <div className="profile">
        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : (
          <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
              <Modal.Title>
                {mode == "new" ? "New Service" : "Edit Service"}
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
                  name: mode == "new" ? "" : service.name,
                  description: mode == "new" ? "" : service.description,
                  base_price: mode == "new" ? "" : service.base_price,
                  extra_per_person:
                    mode == "new" ? "" : service.extra_per_person,
                  max_number_of_people:
                    mode == "new" ? "" : service.max_number_of_people,
                  duration_id: mode == "new" ? "" : service.duration_id,
                  duration_unit_id:
                    mode == "new" ? "" : service.duration_unit_id,
                  location_id: mode == "new" ? "" : service.location_id,
                  id: mode == "new" ? "" : service.id
                }}
                validationSchema={serviceValidation}
                onSubmit={
                  mode == "new" ? this.handleSubmit : this.handleUpdateSubmit
                }
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
                        <label>Service name</label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Name"
                          className={`form-control ${
                            touched.name && errors.name ? "is-invalid" : ""
                          }`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                        <ErrorMessage
                          component="div"
                          name="name"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-12">
                        <label>Description</label>
                        <Field
                          name="description"
                          component="textarea"
                          rows="3"
                          placeholder="Description"
                          className={`form-control ${
                            touched.description && errors.description
                              ? "is-invalid"
                              : ""
                          }`}
                          value={values.description}
                        />
                        <ErrorMessage
                          component="div"
                          name="description"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="column-2-start">
                        <div className="form-group col-md-6">
                          <label>Max number of people</label>
                          <Field
                            name="max_number_of_people"
                            component="select"
                            placeholder=""
                            className={`form-control ${
                              touched.max_number_of_people &&
                              errors.max_number_of_people
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled={true}></option>
                            <option value="1">1 person</option>
                            <option value="10">10 persons</option>
                            <option value="25">25 persons</option>
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="max_number_of_people"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="column-2-start">
                        <div className="form-group col-md-6">
                          <label>Base price</label>
                          <Field
                            type="text"
                            name="base_price"
                            placeholder="$0"
                            className={`form-control ${
                              touched.base_price && errors.base_price
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.base_price}
                          />

                          <ErrorMessage
                            component="div"
                            name="base_price"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>Extra per person</label>
                          <Field
                            type="text"
                            name="extra_per_person"
                            placeholder="$0"
                            className={`form-control ${
                              touched.extra_per_person &&
                              errors.extra_per_person
                                ? "is-invalid"
                                : ""
                            }`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.extra_per_person}
                          />
                          <ErrorMessage
                            component="div"
                            name="extra_per_person"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="column-2-start">
                        <div className="form-group col-md-6">
                          <label className="small">
                            How long will this service take?
                          </label>
                          <Field
                            name="duration_id"
                            component="select"
                            className={`form-control ${
                              touched.duration_id && errors.duration_id
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled={true}></option>
                            {services.durations.map(item => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="duration_id"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label>&nbsp;</label>
                          <Field
                            name="duration_unit_id"
                            component="select"
                            className={`form-control ${
                              touched.duration_unit_id &&
                              errors.duration_unit_id
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled={true}></option>
                            {services.duration_units.map(item => {
                              return (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="duration_unit_id"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="column-2-start">
                        <div className="form-group col-md-6">
                          <label className="small">
                            Where will this service happen?
                          </label>
                          <Field
                            name="location_id"
                            component="select"
                            className={`form-control ${
                              touched.location_id && errors.location_id
                                ? "is-invalid"
                                : ""
                            }`}
                          >
                            <option value="" disabled={true}></option>
                            {services.locations.map(item => {
                              return (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </Field>
                          <ErrorMessage
                            component="div"
                            name="location_id"
                            className="invalid-feedback"
                          />
                        </div>
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
