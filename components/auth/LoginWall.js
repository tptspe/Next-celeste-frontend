import react, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "react-bootstrap";

export default class LoginWallModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      setModalShow: false,
      showSignUp: false,
    };
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  showLoginModal = (e) => {
    this.onClose(e)
    this.props.showLogin(e);  
  }
  showSignUp = (e) => {
    this.onClose(e)
    this.props.showSignUp(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onClose}  centered>
          <Modal.Header>
            <Modal.Title>Log in to continue</Modal.Title>
            <span
              className="closebutton"
              onClick={e => {
                this.onClose(e);
              }}
            >
              <i className="fas fa-times"></i>
            </span>
          </Modal.Header>
          <ModalBody>
            <div className="row">
              <div className="form-group col-md-12">
                <button className="btn btn-primary btn-block">
                  Log in with facebook
                </button>
               
                <button className="btn btn-primary btn-block" onClick={this.showLoginModal}>
                Log in with email
                </button>
               
              </div>

              <div className="form-group col-md-12">
                <label>Don't have an account yet?</label>
                <button className="btn btn-primary btn-block" onClick={this.showSignUp}>Sign up</button>                
              </div>
            </div>
          </ModalBody>
        </Modal>
       
      </div>
    );
  }
}
