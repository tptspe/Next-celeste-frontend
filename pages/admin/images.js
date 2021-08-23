import React from 'react';
import {
    Spinner
  } from "react-bootstrap";
import Router from 'next/router';
import axios from 'axios';

import Layout from '../../components/Layout';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

class ImagesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            images: []
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { token } = this.props
        this.setState({loading: true}, () => {
            axios.get(serverUrl + 'api/images', { headers: { 'Authorization': token } })
            .then((response) => {
                this.setState({
                    loading: false,
                    images: response.data.images
                });
                
            })
            .catch((error) => {
                Router.push('/')
                this.setState({loading: false});
            });
        });
    }

    render() {
        const { images, loading } = this.state

        return (
            <Layout title={'Policys'}>
            <div className="container-fluid">
                <div className="card mb-3">
                    <div className="card-header">
                        <i className="fas fa-table"></i>&nbsp;Images
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">

                        { loading ? <Spinner animation="border" variant="dark"/> : 
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User ID</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { images.map((image, i) => {
                                        return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{image.username}</td>
                                            <td>{image.title}</td>
                                            <td>{image.description}</td>
                                            <td><img style={{width: '40px', height: '40px'}} src={image.image} alt="work image" /></td>
                                            {/* <td>
                                                <a className="btn btn-primary" onClick={() => this.editPolicy(image.id)}><i className="fas fa-pencil-alt"></i> Edit</a> 
                                                <a className="btn btn-danger" onClick={() => this.deletePolicy(image.id)}><i className="fas fa-trash-alt"></i> Delete</a>
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
  
  export default ImagesPage;