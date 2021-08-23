import React from 'react';
import Link from 'next/link';

import Layout from '../../../components/Layout';

class CreateProfileCheckListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artist: {}
        };

    }

    render() {
        return (
            <Layout title={'Create Profile Checklist'}>
                <div className="profile">
          <div className="container" id="profile-checklist">
            <div className="row">
              <div className="list-item active">
                <div className="description">
                  <h3>Create your profile</h3>
                  <p>
                    Tell your clients a little about yourself and why your
                    passionate about makeup. Your bio gives clients a chance to
                    get to know you better
                  </p>
                </div>
                <div className="right-span">
                  <i className="fas fa-check-circle"></i>
                </div>
              </div>
              <div className="list-item active">
              <div className="description">
                <h3>Set your services</h3>
                <p>
                  Tell your clients a little about yourself and why your
                  passionate about makeup. Your bio gives clients a chance to
                  get to know you better
                </p>
              </div>
              <div className="right-span">
              <i className="fas fa-check-circle"></i>
              </div>
            </div>
            <div className="list-item active">
              <div className="description">
                <h3>Shop policies and availability</h3>
                <p>
                  Tell your clients a little about yourself and why your
                  passionate about makeup. Your bio gives clients a chance to
                  get to know you better
                </p>
              </div>
              <div className="right-span">
              <Link href={`/artist/create-profile/policies`}><a className="btn btn-block standard">Start</a></Link>
              </div>
            </div>
            </div>
          </div>
        </div> 
                {/* <div className="overall" id="profile-checklist">
                    <div className="container">
                        <div className="list-item active">
                            <div className="description">
                                <h3>Create your profile</h3>
                                <p>Tell your clients a little about yourself and why your passionate about makeup. Your bio gives clients a chance to get to know you better</p>
                            </div>
                            <div className="right-span"><i className="fas fa-check-circle"></i></div>
                        </div>
                        <div className="list-item active">
                            <div className="description">
                                <h3>Set your services</h3>
                                <p>Tell your clients a little about yourself and why your passionate about makeup. Your bio gives clients a chance to get to know you better</p>
                            </div>
                            <div className="right-span"><i className="fas fa-check-circle"></i></div>
                        </div>
                        <div className="list-item active">
                            <div className="description">
                                <h3>Shop policies and availability</h3>
                                <p>Tell your clients a little about yourself and why your passionate about makeup. Your bio gives clients a chance to get to know you better</p>
                            </div>
                            <div className="right-span"><Link href={`/artist/create-profile/policies`}><a className="btn standard">Start</a></Link></div>
                        </div>
                    </div>
                </div> */}
            </Layout>
        );
    }
  }
  
  export default CreateProfileCheckListPage;