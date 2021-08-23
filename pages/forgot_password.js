import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import cookie from 'js-cookie';

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : 'https://tigerdeveloper.net/';
import Layout from '../components/Layout';


const forgotPwdValidation = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid e-mail address.')
    .required('Email is required.'),
})

class ForgotPasswodPage extends React.Component {

  handleSubmit = async(values, { setSubmitting, setErrors, resetForm }) => {
    console.log(values)

    axios.post(serverUrl + 'api/auth/request_password', values)
      .then((response) => {
        console.log(response)
        
        if( response.data.success == true){
          setErrors({ "success" : response.data.message})
        }
        else {
          setErrors({ "total" : response.data.message})
        }
      })
      .catch((error) => {
        console.log('error', error)
      })
      .finally(() => {
          setSubmitting(false);
      });
  }

  render() {
    return (
      <Layout title={ 'Forgot Password' } leftTitle={'Welcome Back'} leftDescription={'Trouble Logging in?'}>
        <div className="login1">
            <div className="container">
                <div className="row">
                    <div className="login_header">
                        <h3>Forgot Password?</h3>
                        <h6>Send Password Reset Email.</h6>
                    </div>
                    <div className="divider"></div>
                    <div className="login_content">
                    <Formik
                      initialValues={{ email: '', password: ''}}
                      validationSchema={forgotPwdValidation}
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

                          <button 
                            type="submit" 
                            className="auth-btn" 
                            disabled={isSubmitting}>
                            Send
                          </button>
                        </form>
                        
                      )}
                    </Formik>
                    </div>
                    <div className="divider"></div>
                    <div className="login_footer">
                        <h3>Sign In via Social Account</h3>
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
                            <p><span>Can Log in?</span> &nbsp;<Link href="/client/login"><a>Back to Login</a></Link></p>
                            <button>Forgot Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Layout>
    );
  }
}

export default ForgotPasswodPage;
