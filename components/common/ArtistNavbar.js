import React from "react";
import { Button } from "react-bootstrap";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import cookie from "js-cookie";

class ArtistNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    cookie.remove("token");
    console.log("logout called");
    Router.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link href="/">
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
          {/* <div className="col-md-12 col-lg-4 has-search">
            <span className="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Artist near Brooklyn, NY"
            />
          </div> */}
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link href="/artist/dashboard">
                <a className="nav-link">Dashboard</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/messages">
                <a className="nav-link">Messages</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/calendar">
                <a className="nav-link">Calendar</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/appointments">
                <a className="nav-link">Appointments</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/artist/shop">
                <a className="nav-link">Your shop</a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user"></i>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link href="/artist/account">
                  <a className="dropdown-item">
                    <p>Account</p>
                  </a>
                </Link>
                <Link href="/help">
                  <a className="dropdown-item">
                    <p>Help</p>
                  </a>
                </Link>
                <Link href="/client/dashboard">
                  <a className="dropdown-item">
                    <p>Celeste for clients</p>
                  </a>
                </Link>
                <a className="dropdown-item" href="#" onClick={this.logout}>
                  <p>Logout</p>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default ArtistNavbar;
