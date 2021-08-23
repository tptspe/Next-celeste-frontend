import React from "react";
import Link from "next/link";
import Router from "next/router";
import cookie from "js-cookie";

class AdminNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      showSignUp: false
    };
  }

    logout = () => {
        cookie.remove("token")
        console.log('logout called')
        Router.push('/')
    }

  componentDidMount() {
    let token = cookie.get("token");
    if (token) {
      this.setState({ logged_in: true });
    }
  }


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
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link href="/admin/users">
                <a className="nav-link">Users</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/categories">
                <a className="nav-link">Categories</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/images">
                <a className="nav-link">Images</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/services">
                <a className="nav-link">Services</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/policies">
                <a className="nav-link">Policies</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link" onClick={this.logout}>
                    Logout
                </a>
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
}

export default AdminNavbar;
