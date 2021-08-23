import React, { useState, useEffect, Fragment } from "react";
import Link from 'next/link';
import Router from 'next/router';
import axios from 'axios';
import { Spinner, Tab, Tabs } from 'react-bootstrap';

import Layout from '../../components/Layout';
import ConfirmModal from "../../components/common/ConfirmModal";

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

export default function AccountPage(props) {

    const pageTitle = 'Account'

    const  [loading, setLoading] =  useState(false)
    const  [isConfirmModalVisible, setIsConfirmModalVisible] =  useState(false)
    const  [profile, setProfile] =  useState({
        name: '',
        avatar: '',
        avatar_filename: '',
        bio: '',
    })

    const  [emailModel, setEmailModel] =  useState({
        new_email: '',
        confirm_email: '',
        password: ''
    })

    const  [passwordModel, setPasswordModel] =  useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })

    const  [notifications, setNotifications] =  useState([])
    const  [subscriptions, setSubscriptions] =  useState([])

    useEffect(() => {
        fetchAccountData()
    }, []);
 
    let fetchAccountData = () => {
         let token = props.token

         setLoading(true)
         
        axios.get(serverUrl + 'api/users/me/profile', { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('me response', response)

                setLoading(false)
                setProfile(response.data)
            
            })
            .catch((error) => {
                console.log(error)
                Router.push('/')
            });
         
    }

    let fetchEmailPreferenceData = () => {
        let token = props.token
        setLoading(true)
        axios.get(serverUrl + 'api/preferences/me/email', { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('me response', response)

                setNotifications(response.data.notifications)
                setSubscriptions(response.data.subscriptions)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                Router.push('/')
            });
   }
    
    let handleTabSelect = (key) => {
         console.log('key', key)
        if (key === 'account') {
            fetchAccountData();
        }
        else if(key === 'payment') {

        }
        else if(key === 'email') {
            fetchEmailPreferenceData();
        }
    }

    let handleProfileChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let data = {...profile}
        data[name] = value
        setProfile(data)
    }

    let handleDelete = () => {
        console.log("click delete button");
        let token = props.token;
        
        setLoading(true)

          axios
            .delete(serverUrl + "api/users/me/deleteAvatar", {
              headers: { Authorization: token }
            })
            .then(response => {
              console.log("remove response", response);
    
              setLoading(false)
              setProfile({...profile, avatar: ''})
            })
            .catch(error => {
              console.log(error);
              Router.push("/");
            });
        
    };

    let handleUploadBtnClick = () => {
        document.getElementById("avatar").click();
    };
    

    let fileSelectedHandler = e => {
        let reader = new FileReader();
        let file = e.target.files[0];
    
        if (!file) return;
        reader.onloadend = () => {
            setProfile({...profile, avatar_filename: file.name, avatar: reader.result})
        };
    
        reader.readAsDataURL(file);
    };

    let toggleConfirmModal = () => {
        if (profile.avatar == "") return;
        
        setIsConfirmModalVisible(!isConfirmModalVisible)
    };

    let saveProfile = () => {
        let token = props.token

        axios.put(serverUrl + 'api/users/me/profile', profile, { headers: { 'Authorization': token } })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error)
          })
    }

    let handleEmailFormChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let data = {...emailModel}
        data[name] = value
        setEmailModel(data)
    }

    let changeEmail = () => {
        let token = props.token

        if(emailModel.new_email !== emailModel.confirm_email) {
            //@TODO : show validation error
            return;
        }

        axios.put(serverUrl + 'api/users/me/updateEmail', emailModel, { headers: { 'Authorization': token } })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error)
          })
    }

    let handlePasswordFormChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        
        let data = {...passwordModel}
        data[name] = value
        setPasswordModel(data)
    }

    let changePassword = () => {
        let token = props.token

        if(passwordModel.new_password !== passwordModel.confirm_new_password) {
            //@TODO : show validation error
            return;
        }

        axios.put(serverUrl + 'api/users/me/updatePassword', passwordModel, { headers: { 'Authorization': token } })
          .then((response) => {
          })
          .catch((error) => {
            console.log(error)
          })
    }

    let handlePreferenceChange = (e, index, type) => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
    
        if(type == 'notification') {
            let data = [...notifications]
            data[index].checked = value;
            setNotifications(data)
        }
        else {
            let data = [...subscriptions]
            data[index].checked = value;
            setSubscriptions(data)
        }
    };

    let saveEmailPreference = () => {
        let token = props.token;

        let preferences = [...notifications, ...subscriptions]

        let data = preferences.map(item => {
            return { id: item.id, checked: item.checked };
        });

        axios
        .put(
            serverUrl + "api/preferences/me/email",
            { preferences: data },
            { headers: { Authorization: token } }
        )
        .then(response => {

        })
        .catch(error => {
            console.log(error);
        });
    }

    let resetPassword = () => {

    }

    return (
        <Layout title={ pageTitle }>
            <div className="account profile">
                <div className="container">
                    <div className="row">
                        <Tabs defaultActiveKey="account" onSelect={handleTabSelect}>
                            <Tab eventKey="account" title="Account Settings">
                                <div className="my_profile">
                                    <h2> Profile </h2>
                                    <div className="row">
                                        { loading ? <Spinner animation="border" variant="dark"/> : 
                                        <div className="inner_profile">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="name" className="control-label">Name</label> 
                                                        <input id="name" placeholder="Name" className="form-control" onChange={handleProfileChange}
                                                            name="name"
                                                            type="text"
                                                            value={profile.name}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="avatar" className="form-label">
                                                            Profile Picture
                                                        </label>
                                                        
                                                        <div className="column-2-start">
                                                            <div className="imgPreview">
                                                                { profile.avatar ? 
                                                                    (<img src={profile.avatar} />)
                                                                :
                                                                    ( <img src={"/images/profile-avatar.png"} />)
                                                                }    
                                                            </div>
                                                            <div className="button-group">
                                                            <input
                                                                id="avatar"
                                                                placeholder="avatar"
                                                                type="file"
                                                                name="avatar"
                                                                className="form-control hidden"
                                                                onChange={fileSelectedHandler}
                                                                accept=".jpg,.jpeg,.png,.bmp"
                                                                value=""
                                                            />

                                                            <span className="button">
                                                                <button
                                                                type="button"
                                                                className="btn btn-secondary ellipsis btn-block"
                                                                onClick={() => {
                                                                    toggleConfirmModal();
                                                                }}
                                                                >
                                                                Delete
                                                                </button>
                                                                <button
                                                                type="button"
                                                                className="btn btn-primary ellipsis btn-block"
                                                                onClick={() => {
                                                                    handleUploadBtnClick();
                                                                }}
                                                                >
                                                                Choose file
                                                                </button>
                                                            </span>
                                                            <p>Must be a .png or .jpg file smaller than 100MB</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <button type="button" className="btn btn-primary ellipsis" onClick={() => {saveProfile()}}>
                                                        Change name
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                </div>
                                <div className="email">
                                    <h2> Email </h2>
                                    <div className="row">
                                        <div className="inner_email">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="new_email" className="control-label">New Email</label> 
                                                        <input id="new_email" placeholder="New Email" className="form-control" onChange={handleEmailFormChange}
                                                            name="new_email"
                                                            type="text"
                                                            value={emailModel.new_email}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="confirm_email" className="control-label">Confirm Email</label> 
                                                        <input id="confirm_email" placeholder="Confirm Email" className="form-control" onChange={handleEmailFormChange}
                                                            name="confirm_email"
                                                            type="text"
                                                            value={emailModel.confirm_email}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password" className="control-label">Password</label> 
                                                        <input id="password" placeholder="Password" className="form-control" onChange={handleEmailFormChange}
                                                            name="password"
                                                            type="password"
                                                            value={emailModel.password}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <button type="button" className="btn btn-primary ellipsis" onClick={changeEmail}>
                                                        Change email
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="password">
                                    <h2> Password </h2>
                                    <div className="row">
                                        <div className="inner_password">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <span>Don't know your password? &nbsp; </span>
                                                    <button type="button" className="btn btn-primary ellipsis" onClick={resetPassword}> Reset Password </button>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="current_password" className="control-label">Current Password</label> 
                                                        <input id="current_password" placeholder="Current Password" className="form-control" onChange={handlePasswordFormChange}
                                                            name="current_password"
                                                            type="text"
                                                            value={passwordModel.current_password}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="new_password" className="control-label">New Password</label> 
                                                        <input id="new_password" placeholder="New Password" className="form-control" onChange={handlePasswordFormChange}
                                                            name="new_password"
                                                            type="text"
                                                            value={passwordModel.new_password}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="confirm_new_password" className="control-label">Confirm New Password</label> 
                                                        <input id="confirm_new_password" placeholder="Confirm New Password" className="form-control" onChange={handlePasswordFormChange}
                                                            name="confirm_new_password"
                                                            type="password"
                                                            value={passwordModel.confirm_new_password}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <button type="button" className="btn btn-primary ellipsis" onClick={changePassword}>
                                                        Change password
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="payment" title="Payment method">
                                Payment method
                            </Tab>
                            <Tab eventKey="email" title="Email Preference">
                            <p>email settings for MylahMorales@gmail.com</p>
                            <br/>
                            { loading ? <Spinner animation="border" variant="dark"/> : 
                                <Fragment>
                                <div className="notifications">
                                    <h5>Notifications</h5>
                                    {notifications.map((preference, idx) => (
                                        <div className="form-group" key={idx}>

                                            <label className="checkbox-label">
                                                    <input type="checkbox" checked={preference.checked} onChange={e => handlePreferenceChange(e, idx, 'notification')} />
                                                    <span className="checkbox-custom"></span>
                                            </label>
                                            <div className="input-title">{preference.name}</div>

                                        </div>
                                    ))}
                                    
                                </div>
                                
                                <div className="subscriptions">
                                    <h5>Subscriptions</h5>
                                    {subscriptions.map((preference, idx) => (
                                        <div className="form-group" key={idx}>

                                            <label className="checkbox-label">
                                                    <input type="checkbox" checked={preference.checked} onChange={e => handlePreferenceChange(e, idx, 'subscription')} />
                                                    <span className="checkbox-custom"></span>
                                            </label>
                                            <div className="input-title">{preference.name}</div>

                                        </div>
                                    ))}
                                </div>
                                
                                <button
                                    type="button"
                                    className="btn btn-primary ellipsis"
                                    onClick={saveEmailPreference}
                                >
                                    Save
                                </button>
                                </Fragment>
                            }  
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <ConfirmModal
                show={isConfirmModalVisible}
                onClose={toggleConfirmModal}
                action={handleDelete}
                title="Are you sure to remove your picture?"
            ></ConfirmModal>  
        </Layout>
    );

  }
  