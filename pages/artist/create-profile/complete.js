import React from "react";
import Router from "next/router";
import axios from "axios";
import Layout from "../../../components/Layout";
const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/'

class CompletePage extends React.Component {
  constructor(props) {
    super(props);
  }

  changePublicState = is_public => {
    let token = this.props.token;

    axios
      .put(
        serverUrl + "api/users/me/updatePublicState",
        { is_public },
        { headers: { Authorization: token } }
      )
      .then(response => {
        Router.push("/artist/dashboard");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <Layout title={"Complete"}>
        <div className="profile">
          <div className="container">
            <div className="row smallrow">
              <center><h3>Your all set! </h3></center>
              <p>
                Your shop is all ready to go! you can make your shop public and
                start accepting requrest for bookings or you can keep it private
                for now.
              </p>
              <div className="page-navs">
                <div className="column-2-space">
                  <span className="button">
                    <button
                      type="button"
                      className="btn btn-primary ellipsis btn-block"
                      onClick={() => {
                        this.changePublicState(true);
                      }}
                    >
                      {" "}
                      Go Public{" "}
                    </button>
                  </span>
                  <span className="button">
                    <button
                      type="button"
                      className="btn btn-primary ellipsis btn-block"
                      onClick={() => {
                        this.changePublicState(false);
                      }}
                    >
                      {" "}
                      Stay Private{" "}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CompletePage;
