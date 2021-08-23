import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';

import ArtistNavbar from './ArtistNavbar';
import GuestNavbar from './GuestNavbar';
import AdminNavbar from './AdminNavbar';

class Navbar extends React.Component {


    printNavbar() {
        let token = cookie.get('token')
        let role = cookie.get('role')
        //console.log('printNavbar', token, role)
        if(!token) {
            return (<GuestNavbar></GuestNavbar>)
        }
        else if(role == 'super_admin' || role == 'admin') {
            return (<AdminNavbar></AdminNavbar>)
        }
        else
            return (<ArtistNavbar></ArtistNavbar>)
    }
    
  render() {
    return (
        this.printNavbar()
    );
  }
}

export default Navbar;
