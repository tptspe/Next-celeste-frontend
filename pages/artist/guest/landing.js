import React from 'react';
import Link from 'next/link';

import Layout from '../../../components/Layout';

class ArtistGuestLandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }


    render() {
        return (
            <Layout title={'Artist Landing'}>
                <div className="suggest">
                    <h1> Artists Landing </h1>
                    <div className="inner_suggest">
                        <div className="container-fluid">
                            <div className="artists">

                                <Link href="/artist/login">
                                    <a className="btn btn-success">Log in</a>
                                </Link>

                                <Link href="/artist/signup">
                                    <a className="btn btn-primary">Sign Up</a>
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .artists a{
                        margin: 20px;
                    }
                `}</style>
            </Layout>
        );
    }
  }
  
  export default ArtistGuestLandingPage;