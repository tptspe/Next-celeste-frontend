import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import Layout from '../../components/Layout';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

class AccountPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profile: {},
            name: '',
            avatar: '',
            avatar_filename: '',
            bio: ''
        };
    }

    componentDidMount() {
        this.fetchData();
     }
 
     fetchData() {
         let token = this.props.token
         this.setState({loading: true}, () => {
             axios.get(serverUrl + 'api/profiles/me/getProfile', { headers: { 'Authorization': token } })
             .then((response) => {
                console.log('me response', response)

                this.setState({
                    loading: false,
                    ...response.data
                });
             })
             .catch((error) => {
                 console.log(error)
                 Router.push('/')
             });
         });
     }
     
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    fileSelectedHandler = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        if(!file)
            return
        reader.onloadend = () => {
            this.setState({
                avatar_filename: file.name,
                avatar: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    saveProfile = () => {
        let token = this.props.token
        let {...profile} = this.state

        axios.put(serverUrl + 'api/profiles/me/updateProfile', profile, { headers: { 'Authorization': token } })
          .then((response) => {
            
          })
          .catch((error) => {
            console.log(error)
          })
    }

    render() {
        let {avatar, loading} = this.state

        let $imagePreview = null;
        if (avatar) {
            $imagePreview = (<img width="200" height="200" src={avatar} />);
        } else {
            $imagePreview = (<img width="200" height="200" src={'/images/product.png'} />);
        }

        return (
            <Layout title={'Account'}>
                <div className="profile">
                    <h1> Artist Account </h1>
                    
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="settings-tab" data-toggle="tab" href="#settings" role="tab" aria-controls="settings" aria-selected="true">Account Settings</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="payment-tab" data-toggle="tab" href="#payment" role="tab" aria-controls="payment" aria-selected="false">Payment methods</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="email-tab" data-toggle="tab" href="#email" role="tab" aria-controls="email" aria-selected="false">Email</a>
                        </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                            { loading ? <Spinner animation="border" variant="dark"/> : 
                            <div >
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name" className="control-label">Name</label> 
                                            <input id="name" placeholder="Name" className="form-control" onChange={this.handleChange}
                                                name="name"
                                                type="text"
                                                value={this.state.name}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatar" className="control-label">Profile Picture</label> 
                                            <input id="avatar" placeholder="avatar" type="file" 
                                                    name="avatar"
                                                    className="form-control" onChange={this.fileSelectedHandler}
                                                    accept=".jpg,.jpeg,.png,.bmp"
                                                    value="" 
                                                />
                                            <div className="imgPreview">
                                                {$imagePreview}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="bio" className="control-label">Bio</label> 
                                            <textarea id="bio" placeholder="Bio" className="form-control" onChange={this.handleChange}
                                                name="bio"
                                                value={this.state.bio}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-primary ellipsis" onClick={() => {this.saveProfile()}}> Save </button>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        <div className="tab-pane fade" id="payment" role="tabpanel" aria-labelledby="payment-tab">Add/Remove payment methods</div>
                        <div className="tab-pane fade" id="email" role="tabpanel" aria-labelledby="email-tab">Email Preferences </div>
                    </div>

                </div>
            </Layout>
        );
    }
  }
  
  export default AccountPage;