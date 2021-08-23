import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import StepButtons from "./StepButtons";
import ConfirmModal from "../../components/common/ConfirmModal"

export default function EditWorkPhotos(props) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [new_images, setNewImages] = useState([]);
  const [deleted_images, setDeleteImages] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [delId, setDelId] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const backLinks = {
    create: "/artist/create-profile/category",
    edit: "/artist/shop"
  };

  useEffect(() => {
    let token = props.token;
    setLoading(true);

    axios
      .get(serverUrl + "api/images/me", {
        headers: { Authorization: token }
      })
      .then(response => {
        setLoading(false);
        console.log("work photos", response);
        setImages(response.data.images);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        Router.push("/");
      });
  }, []);

  let filesSelectedHandler = e => {
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      let file = files[i];

      console.log(file);
      if (file) {
        reader.readAsDataURL(file);

        reader.onloadend = () => {
          let image = {
            blob: reader.result,
            filename: file.name,
            title: file.name,
            description: ""
          };

          let addedNewImages = [...new_images, image];
          setNewImages(addedNewImages);
        };
      }
    }
  };

  let handleUploadBtnClick = () => {
    document.getElementById("images").click();
  };

  let handleTitleChange = (idx, evt) => {
    const Images = images.map((image, sidx) => {
      if (idx !== sidx) return image;
      return { ...image, title: evt.target.value };
    });

    setImages(Images);
  };
  
  let showConfirmModal = (delId = null, type = 0) => {
      type ? setIsNew(true) : setIsNew(false);
      setIsConfirmModalVisible(!isConfirmModalVisible)
      setDelId(delId)    
  };

  let handleDeleteImage = ()  => {
    //deleted_images.push(images[idx].id);
    var idx = delId;
    setDeleteImages([images[idx].id, ...deleted_images]);
    let id = images[idx].id;

    setImages(images.filter(image => image.id !== id));
  };

  let handleNewImageTitleChange = (idx, evt) => {
    const newImages = new_images.map((image, sidx) => {
      if (idx !== sidx) return image;
      return { ...image, title: evt.target.value };
    });

    setNewImages(newImages);
  };

  let handleNewImageDeleteImage = () => {
    var idx = delId;
    new_images.splice(idx, 1);
    setNewImages([...new_images]);
  };

  let save = async () => {
    let token = props.token;
    let mode = props.mode;

    try {
      let resp = await axios.put(
        serverUrl + "api/images/me",
        { images, new_images, deleted_images },
        { headers: { Authorization: token } }
      );
      if (mode == "create")
        Router.push("/artist/create-profile/profile-complete");
      else Router.push("/artist/shop");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="profile">
      <div className="container">
        {/* <div className="row"> */}
          {loading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            <div className="row">
              <div className="column-2-start">
                <div className="imgPreview">
                  <h3> Upload images </h3>
                  <p>
                    Upload examples for your best work for your clients to see
                    on your profile
                  </p>
                </div>
                <div className="button-group">
                  <input
                    id="images"
                    placeholder="images"
                    type="file"
                    name="images"
                    multiple
                    className="form-control hidden"
                    onChange={filesSelectedHandler}
                    accept=".jpg,.jpeg,.png,.bmp"
                    value=""
                  />

                  <span className="button">
                    <button
                      type="button"
                      className="btn btn-primary ellipsis btn-block"
                      onClick={handleUploadBtnClick}
                    >
                      Choose files
                    </button>
                  </span>
                </div>
              </div>

              <div className="row col-sm-12 uploadImageList">
                {images.map((image, idx) => (
                  <div className="outer col-sm-6 col-md-6 col-lg-4" key={idx}>
                    <div className="form-group item">
                      <img width="200" height="200" src={image.image} />
                      <div className="remove_icon">
                        <i
                          className="fas fa-trash-alt"
                          onClick={() =>   showConfirmModal(idx, 0)}
                        ></i>
                      </div>
                      <div className="form-group title">
                        <i className="fas fa-bookmark"></i>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Add a caption`}
                          value={image.title}
                          onChange={evt => handleTitleChange(idx, evt)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {new_images.map((image, idx) => (
                  <div className="outer col-sm-6 col-md-6 col-lg-4" key={idx}>
                    <div className="form-group item">
                      <img width="200" height="200" src={image.blob} />
                      <div className="remove_icon">
                        <i
                          className="fas fa-trash-alt"
                          nClick={() =>   showConfirmModal(idx, 1)}                          
                        ></i>
                      </div>

                      <div className="form-group title">
                        <i className="fas fa-bookmark"></i>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={`Add a caption`}
                          value={image.title}
                          onChange={evt => handleNewImageTitleChange(idx, evt)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <StepButtons
                save={save}
                mode={props.mode}
                backLink={backLinks[props.mode]}
              ></StepButtons>
            </div>
          )}
        </div>
        <ConfirmModal
            show={isConfirmModalVisible}
            onClose={showConfirmModal}
            action={isNew ? handleNewImageDeleteImage : handleDeleteImage }
            title="Are you sure to remove this image?"
          ></ConfirmModal>
      {/* </div> */}
    </div>
  );
}
