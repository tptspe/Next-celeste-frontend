import React from 'react';
import {
    Spinner
  } from "react-bootstrap";
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import * as Yup from "yup";

import Layout from '../../components/Layout';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

class ServicesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            services: [],
            durations: [],
            duration_units: [],
            locations: []
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { token } = this.props
        this.setState({loading: true}, () => {
            axios.get(process.env.SERVER_URL + 'api/services', { headers: { 'Authorization': token } })
            .then((response) => {

                response.data.services.map((service, i) => {
                    service.duration = response.data.durations.find(item => item.id == service.duration_id)
                    service.duration_unit = response.data.duration_units.find(item => item.id == service.duration_unit_id)
                    service.location = response.data.locations.find(item => item.id == service.location_id)
                })
                this.setState({
                    loading: false,
                    ...response.data
                });
                
            })
            .catch((error) => {
                Router.push('/')
                this.setState({loading: false});
            });
        });
    }

    render() {
        const { loading, services } = this.state

        return (
            <Layout title={'Services'}>
            <div className="container-fluid">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fas fa-table"></i>&nbsp;Services
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">

                        { loading ? <Spinner animation="border" variant="dark"/> : 
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Max Number of People</th>
                                        <th>Base Price</th>
                                        <th>Extra Per Person</th>
                                        <th>Duration</th>
                                        <th>Duration Unit</th>
                                        <th>Location</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { services.map((service, i) => {
                                        return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{service.username}</td>
                                            <td>{service.name}</td>
                                            <td>{service.description}</td>
                                            <td>{service.max_number_of_people}</td>
                                            <td>{service.base_price}</td>
                                            <td>{service.extra_per_person}</td>
                                            <td>{service.duration ? service.duration.name : ''}</td>
                                            <td>{service.duration_unit ? service.duration_unit.name : ''}</td>
                                            <td>{service.location ? service.location.name : ''}</td>
                                            {/* <td>
                                                <a className="btn btn-primary" onClick={() => this.editService(service.id)}><i className="fas fa-pencil-alt"></i> Edit</a> 
                                                <a className="btn btn-danger" onClick={() => this.deleteService(service.id)}><i className="fas fa-trash-alt"></i> Delete</a>
                                            </td> */}
                                        </tr>
                                        ) 
                                    })}
                                </tbody>
                            </table>
                        }

                        </div>
                    </div>
                </div>
            </div>
            </Layout>
        );
    }
  }
  
  export default ServicesPage;