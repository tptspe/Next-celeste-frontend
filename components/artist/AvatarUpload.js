import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'


export default function AvatarUpload(props) {

    const  [loading, setLoading] =  useState(false)
    
    useEffect(() => {
        let token = props.token;
        setLoading(true)

        axios
            .get(serverUrl + "api/categories/me", {
                headers: { Authorization: token }
            })
            .then(response => {
                setLoading(false)
                setCategories(response.data.categories)
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
                Router.push("/");
            });
       
    }, []);

    return (
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
    )
}