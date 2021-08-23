import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';

import Layout from '../../components/Layout';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            users: []
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { token } = this.props

        this.setState({loading: true}, () => {
            axios.get(serverUrl + 'api/users', { headers: { 'Authorization': token } })
            .then((response) => {
                this.setState({
                    loading: false,
                    users: response.data.users
                });
                
            })
            .catch((error) => {
                Router.push('/')
                this.setState({loading: false});
            });
        });
    }

    editUser = (id) => {

    }

    resetPassword = (id) => {

    }

    deleteUser = (id) => {
        const { token } = this.props
        axios.delete(serverUrl + `api/users/${id}`, { headers: { 'Authorization': token } })
            .then((response) => {
                let leftUsers = this.state.users.filter(item => item.id != id);
                this.setState({
                    users: leftUsers
                }); 
            })
            .catch((error) => {
                Router.push('/')
                this.setState({loading: false});
            });
    }


    render() {
        const { users, loading } = this.state
        return (
            <Layout title={'Users'}>
            <div className="container-fluid">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fas fa-table"></i> &nbsp; Users
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">

                        { loading ? <Spinner animation="border" variant="dark"/> : 
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Name</th>
                                        <th>Avatar</th>
                                        <th>Bio</th>
                                        <th>Instagram Url</th>
                                        <th>Is Public</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { users.map((user, i) => {
                                        return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user.name}</td>
                                            <td> { user.avatar ? <img style={{width: '40px', height: '40px'}} src={user.avatar} alt="user avatar" /> : '' }</td>
                                            <td>{user.bio}</td>
                                            <td>{user.instagram_url}</td>
                                            <td>{user.is_public ? 'Public' : 'Private'}</td>
                                            {/* <td>
                                                <a className="btn btn-primary" href="#" onClick={() => this.editUser(user.id)}><i className="fas fa-pencil-alt"></i> Edit</a> 
                                                <a className="btn btn-danger" href="#" onClick={() => this.deleteUser(user.id)}><i className="fas fa-trash-alt"></i> Delete</a>
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
  
  export default UsersPage;