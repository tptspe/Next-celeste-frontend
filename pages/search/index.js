import React from 'react';
import Link from 'next/link';

import Layout from '../../components/Layout';


class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artist: {}
        };

    }

    render() {
        return (
            <Layout title={'Search'}>
                <div className="profile">
                    <div className="container">
                        <h1> Search </h1>
                    </div> 
                </div>
            </Layout>
        );
    }
  }
  
  export default DashboardPage;