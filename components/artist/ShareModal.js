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

export default function ShareModal(props) {
  const [loading, setLoading] = useState(false);
  //   const [modalShow, setModalShow] = useState(props.show);
  //   const [modalShow, setModalShow] = useState(props.onClose);

  let onClose = e => {
    props.onClose && props.onClose(e);
  };

  let handleClick = e => {
    console.log("clicked", e);
  };

  return (
    <div className="">
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        <Modal show={props.show} onHide={onClose} className="aaa" centered>
          <Modal.Header>
            <Modal.Title>
              <h3>Share</h3>
            </Modal.Title>
            <span
              className="closebutton"
              onClick={e => {
                onClose(e);
              }}
            >
              <i className="fas fa-times"></i>
            </span>
          </Modal.Header>
          <ModalBody>
            <div className="share_list">
              <div className="item" onClick={e =>{onClose(e);}}>FaceBook</div>
              <div className="item" onClick={e =>{onClose(e);}}>Twitter</div>
              <div className="item" onClick={e =>{onClose(e);}}>Copy link</div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
}
