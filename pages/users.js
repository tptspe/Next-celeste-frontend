import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';

import Layout from '../components/Layout';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

class UsersPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artists: []
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let token = cookie.get('token')
        this.setState({loading: true}, () => {
            axios.get(serverUrl + 'api/users', { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('users response', response)
                this.setState({
                    loading: false,
                    artists: response.data.users
                });
                
            })
            .catch((error) => {
                Router.push('/')
                this.setState({loading: false});
            });
        });
    }

    createTable = () => {
        
        let table = []
    
        // Outer loop to create parent
        for (let i = 0; i < 3; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 5; j++) {
            children.push(<td>{`Column ${j + 1}`}</td>)
          }
          //Create the parent and add the children
          table.push(<tr>{children}</tr>)
        }
        return table
      }

    render() {
        const { artists } = this.state
        return (
            <Layout title={'Users'}>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"></link>
            <link rel="stylesheet" type="text/css" href="css/profile.css"></link>
            <div id="student_public">
                
                <div className="content">
                    <div className="row">
                        <div className="container">
                            <div className="header">
                                <div className="profile">
                                    <br/>
                                    <br/>
                                </div>
                            </div>
                            
                            <div className="portfolio">
                                <p className="category">Users</p>
                                <div className="row">
                                    { artists.map((artist, i) => {     
                                        return (
                                            <div className="col s12 m6 l6 xl6 " key={i}>
                                                <div className="card">
                                                    <div className="card-content">
                                                        <span className="card-title">
                                                            <img src="images/1.png" alt=""/>
                                                            {artist.first_name} {artist.last_name}
                                                        </span>
                                                        <p>
                                                            {artist.email}
                                                        </p>
                                                    </div>
                                                    <div className="card-action">
                                                        <p className="italic">Role : {artist.role}</p>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        ) 
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Layout>
        );
    }
  }
  
  export default UsersPage;