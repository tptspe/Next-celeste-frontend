import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "react-bootstrap";
import { Spinner } from "react-bootstrap";

export default class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading : false};
  }

  componentDidMount() {}

  // Modal Action
  handleYes = () => {
      this.props.action();
      this.props.onClose();
  }

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    let { loading } = this.state;
    let { show, onClose, title } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="profile">
        {loading ? (
          <Spinner animation="border" variant="dark" />
        ) : (
          <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
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
                <div className="column-2-space">
                <span className="button confirm">
                  <button
                    onClick={() => this.handleYes()}
                    className="btn btn-danger btn-block"                
                  >                
                    Yes
                  </button>
                  </span>
                  <span className="button confirm">
                  <button
                    onClick={() => this.onClose()}
                    className="btn btn-primary btn-block"                
                  >                
                    No
                  </button>
                  </span>
                </div>
              </div>
            </ModalBody>
          </Modal>
        )}
      </div>
    );
  }
}
