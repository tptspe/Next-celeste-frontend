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

class PoliciesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            policies: []
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { token } = this.props
        this.setState({loading: true}, () => {
            axios.get(serverUrl + 'api/policies', { headers: { 'Authorization': token } })
            .then((response) => {

                response.data.policies.map((policy, i) => {
                    policy.distance = response.data.distances.find(item => item.id == policy.travel_distance_id)
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
        const { policies, loading } = this.state

        return (
            <Layout title={'Policys'}>
            <div className="container-fluid">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fas fa-table"></i>&nbsp;Policies
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">

                        { loading ? <Spinner animation="border" variant="dark"/> : 
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User ID</th>
                                        <th>Address 1</th>
                                        <th>Address 2</th>
                                        <th>City</th>
                                        <th>State ID</th>
                                        <th>Zip</th>
                                        <th>Travel Distance</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { policies.map((policy, i) => {
                                        return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{policy.username}</td>
                                            <td>{policy.address1}</td>
                                            <td>{policy.address2}</td>
                                            <td>{policy.city}</td>
                                            <td>{policy.state}</td>
                                            <td>{policy.zip}</td>
                                            <td>{policy.distance ? policy.distance.name : ''}</td>
                                            {/* <td>
                                                <a className="btn btn-primary" onClick={() => this.editPolicy(policy.id)}><i className="fas fa-pencil-alt"></i> Edit</a> 
                                                <a className="btn btn-danger" onClick={() => this.deletePolicy(policy.id)}><i className="fas fa-trash-alt"></i> Delete</a>
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
  
  export default PoliciesPage;