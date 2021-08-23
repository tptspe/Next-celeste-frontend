import React from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import SignupModal from "../../components/auth/signup";
import LoginWallModal from "../../components/auth/LoginWall";
import LoginModal from "../../components/auth/login";

class ArtistLandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showLoginWallModal: false,
      showLoginModal: false,
      showSignUp: false
    };
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
    return (
      <Layout title={"Artist Landing"}>
        <div className="overall" id="artist-landing">
          <div className="content">
            <div className="container">
              <div className="artist_landing join">
                <div className="artist_landing_item">
                  <h3>Get access to hundreds of new clients</h3>
                  {/* <Link href="/artist/signup"> */}
                    <button className="btn btn-primary ellipsis "  onClick={this.showSignUpModal}>Join now</button>
                  {/* </Link> */}
                </div>
              </div>
              <div className="artist_landing">
                <div className="artist_landing_item">
                  <h3>
                    Marketing content about the benefits of joining as an artist
                  </h3>
                </div>
              </div>
            </div>
          </div>
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
        </SignupModal>
      </Layout>
    );
  }
}

export default ArtistLandingPage;
