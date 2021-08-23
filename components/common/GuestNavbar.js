import React from "react";
import Link from "next/link";
import Router from "next/router";
import cookie from "js-cookie";
import LoginWallModal from "../auth/LoginWall";
import SignupModal from "../auth/signup";
import LoginModal from "../auth/login";
import AutoSearch from "../../components/common/Search";

class GuestNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      showLoginWallModal: false,
      showLoginModal: false,
      showSignUp: false
    };
  }

  componentDidMount() {
    let token = cookie.get("token");
    if (token) {
      this.setState({ logged_in: true });
    }
  }

  showLoginWallModal = () => {
    this.setState({
      ...this.state,
      showLoginWallModal: !this.state.showLoginWallModal,
      showSignUp: false,
      showLoginModal: false,
    });
    console.log("login Wall", this.state.showLoginWallModal)
  };

  showLoginModal = () => {
    this.setState({
      ...this.state,
      showLoginModal: !this.state.showLoginModal,
      showSignUp: false,
      showLoginWallModal: false
    });
    console.log("login Wall", this.state.showLoginWallModal)
  };

  showSignUpModal = () => {
    this.setState({
      ...this.state,
      showSignUp: !this.state.showSignUp ,
      showLoginWallModal: false,
      showLoginModal: false
    });
    console.log("Signup modal", this.state.showSignUp)
  };


  render() {
    const { logged_in } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light container">
        
        <Link href="/artist/landing">
          <a className="navbar-brand">LOGO</a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <AutoSearch></AutoSearch>
          {/* <div className="col-md-12 col-lg-4 has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Artist near Brooklyn, NY" />
          </div> */}
          
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link href="/artist/landing">
                <a className="nav-link">Become an artist</a>
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link href="/artist/login"> */}
                <a className="nav-link" onClick={this.showLoginWallModal}>Log in</a>
              {/* </Link> */}
            </li>
            <li className="nav-item">
              {/* <Link href="/artist/signup"> */}
                {/* <a className="nav-link">Sign Up</a> */}
                <a className="nav-link" onClick={this.showSignUpModal}>
                    Sign Up
                </a>
              {/* </Link> */}
            </li>

          </ul>
        </div>
        <LoginWallModal 
            show={this.state.showLoginWallModal}
            onClose={this.showLoginWallModal}
            showSignUp={this.showSignUpModal}
            showLogin={this.showLoginModal}
        >          
        </LoginWallModal>
        <LoginModal 
            show={this.state.showLoginModal}
            onClose={this.showLoginModal}
            showSignUp={this.showSignUpModal}
        >          
        </LoginModal>
        <SignupModal 
            show={this.state.showSignUp}
            onClose={this.showSignUpModal} 
            showLoginWall={this.showLoginWallModal}           
        >
          This message from modal.
        </SignupModal>
      </nav>
    );
  }
}

export default GuestNavbar;
