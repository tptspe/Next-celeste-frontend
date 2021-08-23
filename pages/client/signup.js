import React from 'react';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cookie from 'js-cookie';
import Router from 'next/router';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';
import Layout from '../../components/Layout';

const registerValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid e-mail address.')
    .required('Email is required.'),
  password: Yup.string()
    .required('Password is required.')
})

class RegisterPage extends React.Component {

    handleSubmit = async(values, { setSubmitting, setErrors, resetForm }) => {

      axios.post(serverUrl + 'api/auth/signup', values)
        .then((response) => {
          
          if( response.data.auth == true  ){
            cookie.set("token", response.data.token, { expires : 1 })
            
            if(response.data.role == "artist") {
                Router.push('/artist/create-profile')
            }
            else if(response.data.role == "client") {
                Router.push('/client/account')
            }
            else {
                Router.push('/')
            }
          }
          else {
            setErrors({ "total" : response.data.message})
          }

        })
        .catch((error) => {
          this.setState({loading: false});
          setErrors({ "total" : error.message})
        })
        .finally(() => {
            setSubmitting(false);
        });
    }

    render() {
        return (
        <Layout title={ 'Register' }>
          <div className="login1">
              <div className="container">
                  <div className="row">
                      <div className="login_header">
                          <h3>Client Sign Up</h3>
                          <h6>Sign up via email and password.</h6>
                      </div>
                      <div className="divider"></div>
                      <div className="login_content">
                      <Formik
                        initialValues={{ email: '', role: 'client', password: ''}}
                        validationSchema={registerValidation}
                        onSubmit={this.handleSubmit}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                {errors.success && 
                                    (<p className="success">{errors.success}</p>) }
                                {errors.total && 
                                    (<p className="error">{errors.total}</p>) }

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className="form-control"
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    {errors.email && touched.email && 
                                    (<p className="error">{errors.email}</p>) }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        className="form-control"
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    {errors.password && touched.password && 
                                    (<p className="error">{errors.password}</p>) }                 
                                </div>

                                
                            <button 
                                type="submit" 
                                className="auth-btn" 
                                disabled={isSubmitting}>
                                Sign Up
                            </button>
                        </form>
                            
                        )}
                        </Formik>
                      </div>
                      <div className="divider"></div>
                      <div className="login_footer">
                          <h3>Sign Up via Social Account</h3>
                          <div className="btn_group">
                              <button type="button" className="google">
                                  <i className="fas fa-circle"></i>
                                  <span>Google</span>
                              </button>
                              <button type="button" className="facebook">
                                  <i className="fas fa-circle"></i>
                                  <span>Facebook</span>
                              </button>
                          </div>
                          <div className="link">
                              <p><span>Already has an account?</span> &nbsp;<Link href="/client/login"><a>Log in</a></Link></p>
                              <p><Link href="/artist/signup"><a>Artist Sign Up</a></Link></p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </Layout>
        );
    }
}

export default RegisterPage;
