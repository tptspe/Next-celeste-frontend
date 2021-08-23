import React from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import cookie from "js-cookie";
import SignupModal from "./auth/signup";



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      showSignUp: false
    };
  }

  componentDidMount() {
    let token = cookie.get("token");
    if (token) {
      this.setState({ logged_in: true });
    }
  }

  showSignUpModal = () => {
    this.setState({
      ...this.state,
      showSignUp: !this.state.showSignUp
    });
  };

  logout = () => {
    cookie.remove("token");
    console.log("logout called");
    this.setState({ logged_in: false });
    Router.push("/");
  };

  render() {
    const { logged_in } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light container">
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
        <Link href="/artist/landing">
          <a className="navbar-brand">LOGO</a>
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link href="/artist/landing">
                <a className="nav-link">Become an artist</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/login">
                <a className="nav-link">Log in</a>
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link href="/artist/signup"> */}
              <a className="nav-link" onClick={this.showSignUpModal}>
                Sign Up
              </a>
              {/* </Link> */}
            </li>

            {logged_in ? (
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={this.logout}>
                  Logout
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <SignupModal 
            show={this.state.showSignUp}
            onClose={this.showSignUpModal}
        >
          This message from modal.
        </SignupModal>
      </nav>
    );
  }
}

export default Header;
