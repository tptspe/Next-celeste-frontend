import React from 'react';
import { Button } from 'react-bootstrap';
import Router from 'next/router';
import cookie from 'js-cookie';
import Link from 'next/link';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logged_in: false,
        };
    }
    
    componentDidMount() {
        let token = cookie.get('token')
        if(token) {
            this.setState({logged_in : true})
        }
    }

    logout = () => {
        cookie.remove("token")
        console.log('logout called')
        this.setState({logged_in : false})
        Router.push('/')
    }

    render() {
        const {logged_in} = this.state
        return (
            <footer>
                
                <div className="w3l-footer-bottom">
                    <div className="container-fluid">
                        <div className="col-md-4 w3-footer-logo">
                            { logged_in ? <Button className="logout-btn" onClick={this.logout} >Logout</Button> : '' }
                        </div>
                        {/* <div className="col-md-8 agileits-footer-class">
                        <p >© 2019 Celeste. All Rights Reserved</p>
                        </div> */}
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
