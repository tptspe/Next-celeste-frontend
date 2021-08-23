import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import StepButtons from "./StepButtons";
import ConfirmModal from "../common/ConfirmModal";

export default function EditCategory(props) {

    const  [loading, setLoading] =  useState(false)
    
    const  [isConfirmModalVisible, setIsConfirmModalVisible] =  useState(false)
    const  [profile, setProfile] =  useState({
        name: "",
        avatar: "",
        avatar_filename: "",
        bio: "",
    })
    

    const backLinks = {
        'create' : '/artist/create-profile',
        'edit' : '/artist/shop'
    }
    
    useEffect(() => {
        let token = props.token;
        setLoading(true)

        axios
            .get(serverUrl + "api/users/me/profile", {
                headers: { Authorization: token }
            })
            .then(response => {
                console.log('profile', response.data)
                setLoading(false)
                setProfile(response.data)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                Router.push("/");
            });
       
    }, []);

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

    let toggleConfirmModal = () => {
        if (profile.avatar == "") return;
        
        setIsConfirmModalVisible(!isConfirmModalVisible)
    };
    
    let handleChange = e => {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
    
        let data = {...profile}
        data[name] = value 
        setProfile(data)
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
    

    let save = async () => {
        let token = props.token;
        let mode = props.mode;

        
        try {

            let resp = await axios.put(
                serverUrl + "api/users/me/profile",
                    profile,
                {
                headers: { Authorization: token }
                }
            );
             
            if(mode == 'create')
                Router.push("/artist/create-profile/category");
            else
                Router.push("/artist/shop");
        }
        catch(err) {
            console.log(err);
        }
    };

    let syncInstagram = async () => {
        
    }


    return (
        <div className="profile">
            <div className="container">
               
                {loading ? (
                    <Spinner animation="border" variant="dark" />
                ) : (
                    <div className="row">
                    <div className="profile-step">
                    <div className="col-lg-12">
                        <div className="form-group">
                        <h3> Tell us about you </h3>
                        <label htmlFor="name" className="form-label">
                            Shop Name
                        </label>
                        <p>
                            This is how clients will see your shop listed. You can use your business name or just your name.
                        </p>
                        <input
                            id="name"
                            placeholder="Type here"
                            className="form-control input"
                            onChange={handleChange}
                            name="name"
                            type="text"
                            value={profile.name}
                        />
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="avatar" className="form-label">
                                Profile Picture
                            </label>
                            <p>
                                Add a picture of yourself to help your clients get to
                                know you better.
                            </p>
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
                        <div className="form-group">
                        <label htmlFor="bio" className="form-label">
                            Bio
                        </label>
                        <p>
                            Tell your clients a little about yorusefl and why your
                            passionate about makeup. Your bio gives clients a chance
                            to get to know you better.
                        </p>
                        <br />
                        <textarea
                            id="bio"
                            placeholder="Type here"
                            className="form-control textarea"
                            onChange={handleChange}
                            name="bio"
                            rows="8"
                            value={profile.bio}
                        />
                        <br />
                        <p>
                            Keep it brief. Clients are more likely to read shorter
                            bios.
                            <br />
                            Don't sweat the details. You'll be able to outline your
                            policies and prices in a later step.
                        </p>
                        </div>
                        <div className="form-group">
                        <label htmlFor="sync" className="form-label">
                            Sync with Instagram
                        </label>
                        <div className="column-2-space">
                            <div>
                            <p>
                                Connect your Instagram to show your photos on your
                                profile page. You can also set this up later.
                            </p>
                            </div>
                            <div className="rightButton">
                            <span className="button">
                                <button
                                type="button"
                                className="btn btn-secondary ellipsis btn-block"
                                onClick={() => {
                                    syncInstagram();
                                }}
                                >
                                Sync
                                </button>
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <StepButtons save={save} mode={props.mode} backLink={backLinks[props.mode]}></StepButtons>
                    </div>
                )}

                
                </div>
                <ConfirmModal
                    show={isConfirmModalVisible}
                    onClose={toggleConfirmModal}
                    action={handleDelete}
                    title="Are you sure to remove your picture?"
                ></ConfirmModal>               
            
        </div>
        
    )
}