import React from 'react'
import App from 'next/app'

import {auth} from '../utils/auth';

import css from "../public/css/app.css"


export default class MyApp extends App {
  
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    let token = auth(ctx);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    console.log('pageprops', pageProps)
    pageProps.token = token
    return { pageProps }
  }

  state = {
    name: "App",
  }

  render () {
    const { Component, pageProps } = this.props

    return (
        <Component {...pageProps}  {...this.state}/>
    )
  }
}