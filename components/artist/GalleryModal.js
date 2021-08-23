import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "react-bootstrap";
import axios from "axios";
import Router from "next/router";
import { Spinner } from "react-bootstrap";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'
import ProfileGallery from "./profileGallery";

export default function GalleryModal(props) {
  const [loading, setLoading] = useState(false);

  let onClose = e => {
    props.onClose && props.onClose(e);
  };

  let handleClick = e => {
    console.log("clicked", e);
  };
  
  return (
    <div>
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        <Modal
          show={props.show}
          onHide={onClose}
          className="full-screen-modal"
          centered
        >
          <div className="container">
            <Modal.Header>
              <Modal.Title>
                <div>Logo</div>
                <div>Estimate: $200</div>
                <div>
                  <span
                    className="closebutton"
                    onClick={e => {
                      onClose(e);
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              </Modal.Title>
            </Modal.Header>
            <ModalBody className="row">
              <div className="profileGallery col-sm-7">
                <ProfileGallery dataSet={props.dataSet}></ProfileGallery>
              </div>
              <div className="col-sm-5">
                <p>
                  Anny Chow provides on location makeup and hair service for
                  bridal or any special occasion. Anny Chow provides on location makeup and hair service for
                  bridal or any special occasion
                </p>
              </div>
            </ModalBody>
          </div>
        </Modal>
      )}
    </div>
  );
}
