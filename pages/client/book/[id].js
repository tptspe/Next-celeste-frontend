import React from 'react';
import { Spinner } from 'react-bootstrap';
import Router from 'next/router';
import axios from 'axios';


import Layout from '../../../components/Layout';
import Rate from '../../../components/profile/Rate';
import Skills from '../../../components/profile/Skills';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';

class ArtistProfilePage extends React.Component {

    // static getInitialProps ({ query: { id } }) {
    //     console.log('query id', id)
        
    //     return { id };
    // }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            artist: {}
        };

    }

    componentDidMount() {
       this.fetchData();
    }

    fetchData() {
        let token = this.props.token
        this.setState({loading: true}, () => {
            axios.get(serverUrl + 'api/artists/' + this.props.id, { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('get artist response', response)
                
                this.setState({
                    loading: false,
                    artist: response.data.artist
                });
            })
            .catch((error) => {
                Router.push('/')
                this.setState({loading: false});
            });
        });
    }

    render() {
        const { artist, loading } = this.state
        //const { artist } = this.props;
        return (
            <Layout title={'Profile'}>
            { loading ? <Spinner animation="border" variant="dark"/> : 
            <div className="profile">
                <h1>Booking</h1>
            </div>
            }
            </Layout>
        );
    }
  }
  
  export default ArtistProfilePage;