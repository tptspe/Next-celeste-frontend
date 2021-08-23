import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Layout from '../../components/Layout';
import ConfirmModal from "../../components/common/ConfirmModal";

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'

export default function ShopProfilePage(props) {

    const pageTitle = 'Shop Profile'

    const  [loading, setLoading] =  useState(false)
    const  [isConfirmModalVisible, setIsConfirmModalVisible] =  useState(false)
    const  [user, setUser] =  useState({
        policy: {},
        services: [],
        categories: [],
        images: []
    })

    useEffect(() => {
        fetchData()
    }, []);

    let fetchData = () => {
        let token = props.token;
        setLoading(true)

        axios
            .get(serverUrl + "api/users/me/shop", {
                headers: { Authorization: token }
            })
            .then(response => {
                console.log('shop', response.data)
                setLoading(false)
                setUser(response.data.user)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                Router.push("/");
            });
       
    }

    let toggleDetails = (e, id) => {
        var downArrow = e.currentTarget.childNodes[0].childNodes[0];
        var upArrow = e.currentTarget.childNodes[0].childNodes[1];
        var itemPanel = e.currentTarget.closest(".item");
    
        if (downArrow.classList.contains("hidden")) {
          // do some stuff
          downArrow.classList.remove("hidden");
          upArrow.classList.add("hidden");
        } else {
          downArrow.classList.add("hidden");
          upArrow.classList.remove("hidden");
        }
    
        var detailPanel = itemPanel.childNodes[1];
        detailPanel.classList.toggle("hidden");
    };

    let getLocation = (id) => {
        let location = "";
        if (id != null) {
  
          let location = user.locations.find(item => {
            return item.id == id;
          });
  
          return location ? location.name : ''
        }
        return location;
    }
    
    let getTime = (id) => {
        let sTime = "";
        if (id != null) {
          let sTime = user.durations.find(item => {
            return item.id == id;
          })
          return sTime ? sTime.name : '';
        }
    
        return sTime;
    }

    let invertPublicState = () => {
        let is_public = !user.is_public
        let token = props.token;
    
        axios
          .put(
            serverUrl + "api/users/me/updatePublicState",
            { is_public },
            { headers: { Authorization: token } }
          )
          .then(response => {
            fetchData()
          })
          .catch(error => {
            console.log(error);
          });
    };

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
              setUser({...user, avatar: ''})
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
            setUser({...user, avatar_filename: file.name, avatar: reader.result})
          
        };
    
        reader.readAsDataURL(file);
    };

    let toggleConfirmModal = () => {
        if (user.avatar == "") return;
        
        setIsConfirmModalVisible(!isConfirmModalVisible)
    };

    
    return (
        <Layout title={ pageTitle }>
            <div className="account profile">
                <div className="container">
                    <div className="row">
                        <div className="intro">
                            <div className="sub_intro">
                                <img src={"/images/profile-avatar.png"} alt=""/>
                                <div className="name">
                                    <h4>{user.name}</h4>
                                    <p>{ user.is_public ? 'Public' : 'Private' }</p>
                                </div>
                            </div>
                            <Link href="/artist/profile"><a className="btn btn-primary">View Profile</a></Link>
                        </div>
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">Policies</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">Photos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">Services</a>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="divider"></div>
                    </div>
                    <div className="row">
                        <div className="tab-content">
                            <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                <div className="shop layout">
                                    <p>Your shop is currently { user.is_public ? 'Public' : 'Private' }</p>
                                    <button className="btn btn-primary" onClick={invertPublicState}>Go { user.is_public ? 'Private' : 'Public' }</button>
                                </div>
                                <div className="divider"></div>
                                <div className="bio">
                                    <div className="sub_bio layout">
                                        <div className="left_span">
                                            <p>Name:</p>
                                            <p>{user.name}</p>
                                        </div>
                                        <div className="right_span">
                                            <Link href="/artist/edit/profile"><a className="btn btn-primary">Edit</a></Link>
                                        </div>
                                    </div>
                                    <div className="sub_bio layout">
                                        <div className="left_span">
                                            <p>Bio:</p>
                                            <p>{user.bio}</p>
                                        </div>
                                        <div className="right_span"></div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="category">
                                    <div className="sub_cat layout">
                                        <p>Categories</p>
                                        <Link href="/artist/edit/category"><a className="btn btn-primary">Edit</a></Link>
                                    </div>
                                    <div className="categoryList">
                                        {user.categories.map((category, idx) => (
                                            <div className="item" key={idx}>
                                            <label className="cat_container">
                                                <div className="checkmark active">{category.name}</div> 
                                            </label>                          
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="instagram">
                                    <div className="sub_inst layout">
                                        <div className="left_span">
                                            <p>Instagram:</p>
                                            <p>@MylahMorales</p>
                                        </div>
                                        <div className="right_span">
                                            <button className="btn btn-primary">Edit</button>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input type="checkbox"/>
                                            <span className="checkbox-custom"></span>
                                        </label>
                                        <div className="input-title">Show on profile</div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="picture">
                                    <div className="form-group">
                                        <label htmlFor="avatar" className="form-label">
                                            Profile Picture
                                        </label>
                                        
                                        <div className="column-2-start">
                                            <div className="imgPreview">
                                                { user.avatar ? 
                                                    (<img src={user.avatar} />)
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
                            <div className="tab-pane" id="tabs-2" role="tabpanel">
                                <div className="bio">
                                    <div className="sub_bio layout">
                                       { !user.policy ? (<div className="left_span"></div>) :
                                        (<div className="left_span">
                                            <p>Your studio:</p>
                                            <p>{user.policy.address1} {user.policy.address2}</p>
                                            <p>{user.policy.city}, {user.policy.state} {user.policy.zip}</p>
                                            &nbsp;
                                            <p>You will travel up to {user.policy.travel_distance_id} for appointments</p>
                                        </div>) }
                                        <div className="right_span">
                                            <Link href="/artist/edit/policies">
                                                <a className="btn btn-primary">Edit</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="bio">
                                    <div className="sub_bio layout">
                                        <div className="left_span">
                                            <p>Appointments must be made at least 1 day in advance</p>
                                            &nbsp;
                                            <p>Allow appointments to be scheduled up to 60 rolling days from today</p>
                                        </div>
                                        <div className="right_span">
                                            <Link href="/artist/create-profile/availability">
                                                <a className="btn btn-primary">Edit</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-3" role="tabpanel">
                                <div className="shop layout">
                                    <p>42 photos uploaded</p>
                                    <Link href="/artist/edit/work-photos"><a className="btn btn-primary">Edit Photos</a></Link>
                                </div>
                                <div className="shop layout">
                                    <p>Your account is set to sync photos from Instagram</p>
                                    <button className="btn btn-primary">Pause Syncing</button>
                                </div>
                                <div className="shop layout">
                                    <div className="row uploadImageList">
                                        {user.images.map((image, idx) => (
                                            <div className="form-group col-sm-12 col-md-6 col-lg-4" key={idx}>
                                                <div className="form-group item">
                                                    <img width="200" height="200" src={image.image} />
                                                </div>
                                                <div className="form-group title">
                                                    <i className="fas fa-bookmark"></i>
                                                    {image.title}
                                                </div>                      
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane" id="tabs-4" role="tabpanel">
                                <div className="shop layout">
                                    <p>{user.services.length} services offered</p>
                                    <Link href="/artist/edit/services"><a className="btn btn-primary">Edit Services</a></Link>
                                </div>
                                <div className="shop layout">
                                {user.services.map((service, idx) => (
                                    <div className="row service" key={idx}>
                                        <div className="item col-sm-12">
                                        <div className=" row column-2-space">
                                            <div className="body">
                                            <h6>{service.name}</h6>
                                            <p>{service.description}</p>
                                            </div>
                                            <div className="action  ">
                                            <div className="column-2-space">
                                                
                                            </div>
                                            <div
                                                className="center"
                                                onClick={e => {
                                                toggleDetails(e, "a");
                                                }}
                                            >
                                                <label>
                                                <i className="fas fa-chevron-down"></i>
                                                <i className="fas fa-chevron-up hidden"></i>
                                                </label>
                                            </div>
                                            </div>
                                        </div>

                                        <div className="details hidden">
                                            <div className=" row column-2-start">
                                            <div className="left_detail">
                                                <h6>Max number of people:</h6>
                                                <p>{service.max_number_of_people}</p>
                                                <h6>Extra per person:</h6>
                                                <p>{service.extra_per_person}</p>
                                                <h6>Base Price:</h6>
                                                <p>{service.base_price}</p>
                                            </div>
                                            <div className="">
                                                <h6>Location:</h6>
                                                <p>{getLocation(service.location_id)}</p>
                                                <h6>Time:</h6>
                                                <p>{getTime(service.duration_id)}</p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
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