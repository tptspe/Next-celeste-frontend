import React from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";
import ProgressBar from "../../../components/common/progress_bar";

class HowItWorksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      artist: {},
      percent:40
    };
  }

  render() {
    let { percent } = this.state;

    return (
      <Layout title={"How it works"}>
         {/* start progress bar  */}
         <div className="container progress_bar">
          <div className="row">
            <ProgressBar value={percent}></ProgressBar>
          </div>
        </div>
        {/* end progress bar  */}
        <div className="profile">
          <div className="container" id="profile-checklist">
            <div className="row">
              <div className="list-item active">
                <div className="description">
                  <h3>How it works</h3>
                  <div className="divider15" />
                  <div className="divider15" />
                  <div className="divider15"></div>
                  <p>
                    <label>
                      <span className="lineNo">1</span>&nbsp;
                      <span className="subTitle3">Clients find you</span>
                    </label>
                    <label className="detail leftSpace25">
                      Clients find you and read your profile. Clients choose
                      from your list of services, enter the required deetails
                      and submit an appointment request.
                    </label>
                  </p>

                  <p>
                    <label>
                      <span className="lineNo">2</span>&nbsp;
                      <span className="subTitle3">
                        They send you an appointment request
                      </span>
                    </label>
                    <label className="detail leftSpace25">
                      Clients shoose from your list of services, enter the
                      required details and submit an appointment request.
                      Clients have to enter a credit card in order to start an
                      appointment request.
                    </label>
                  </p>

                  <p>
                    <label>
                      <span className="lineNo">3</span>&nbsp;
                      <span className="subTitle3">You get notified</span>
                    </label>
                    <label className="detail leftSpace25">
                      You'll recieve a notification of a client appointment
                      request as soon as it comes in. Once a client sends a
                      request you'll have the opportunity to decline or accept
                      it before it goes on your calendar.
                    </label>
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="page-navs">
                  <div className="column-2-space">
                    <span className="button">
                      <Link href={`/artist/create-profile/policies`}>
                        <a className="btn btn-secondary btn-block">Back</a>
                      </Link>
                    </span>
                    <Link href={`/artist/create-profile/availability`}>
                      <span className="button">
                        <a className="btn btn-primary ellipsis btn-block">
                          Next
                        </a>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="profile" id="profile-checklist">
                    
                    <div className="container">
                        <h1>How it works</h1>
                        <div className="list-item active">
                            <div className="description">
                                <h3>1 Clients find you</h3>
                                <p>Tell your clients a little about yourself and why your passionate about makeup. Your bio gives clients a chance to get to know you better</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="description">
                                <h3>2 They send you an appointment request</h3>
                                <p>Tell your clients a little about yourself and why your passionate about makeup. Your bio gives clients a chance to get to know you better</p>
                            </div>
                        </div>
                        <div className="list-item">
                            <div className="description">
                                <h3>3 You get notified</h3>
                                <p>Tell your clients a little about yourself and why your passionate about makeup. Your bio gives clients a chance to get to know you better</p>
                            </div>
                        </div>
                        <div className="page-navs">
                            <Link href={`/artist/create-profile/service-complete`}><a className="btn btn-secondary">Back</a></Link>
                            <Link href={`/artist/create-profile/availability`}><a className="btn btn-secondary">Next</a></Link>
                        </div>
                    </div>
                </div> */}
      </Layout>
    );
  }
}

export default HowItWorksPage;
