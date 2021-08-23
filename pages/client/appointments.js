import React from 'react';
import Link from 'next/link';

import Layout from '../../components/Layout';


class AppointmentPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            pageTitle : 'Appointments'
        };

    }

    render() {
        const { pageTitle } = this.state
        return (
            <Layout title={ pageTitle }>
                <div className="profile">
                    <h1> { pageTitle } </h1>
                    <Link href={`/client/dashboard`}><a className="btn btn-primary">Go to dashboard</a></Link>
                </div>
            </Layout>
        );
    }
  }
  
  export default AppointmentPage;