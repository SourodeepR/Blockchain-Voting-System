import React, { Component } from 'react'
import firebaseApp from '../firebase'
import Header1 from './Header'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link, Router } from '../routes.js';
import Layout from './Layout';
const voterlist = require('./voterlist.json')

class LoginForm extends Component {
  state = {
    aadharNo: '',
    constituency: '',
    mobile: '',
    otp: ''
  }

  configureCaptcha = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.onSignInSubmit();
        console.log("Recaptca varified")
      }
    }, auth);
  }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    voterlist.forEach(element => {
      if (element.aadharNo == this.state.aadharNo) {
        this.state.mobile = element.contactNo
        this.state.constituency = element.Address
      }
    });
    const phoneNumber = "+91" + this.state.mobile
    //console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // window.confirmationResult = confirmationResult;

        console.log("OTP has been sent")
        let code = window.prompt('OTP has been sent!! Please enter the 6 digit code');
        return confirmationResult.confirm(code)
        // ...
      }).then((result) => {
        // User signed in successfully.
        const user = result.user;
        //encrpt aadhar no
        //console.log(JSON.stringify(user))
        //console.log("User is verified")
        Router.pushRoute(`/voter/${this.state.constituency}/${this.state.aadharNo}`);
        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error)
      });
  }

  render() {
    return (
      <>
        <Header1 />
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='violet' textAlign='center'>
              Log-in to your account
            </Header>
            <Form size='large' onSubmit={this.onSignInSubmit}>
              <div id="sign-in-button"></div>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='phone'
                  iconPosition='left'
                  placeholder='Aadhar Number'
                  name='Aadhar'
                  value={this.state.aadharNo}
                  onChange={event => this.setState({ aadharNo: event.target.value })}
                />

                <Button color='violet' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>


            <Message>
              Click <Link route="/admin/adminlogin">
                <a>here</a>
              </Link> to login as admin
            </Message>

          </Grid.Column>
        </Grid>
      </>
    )
  }
}


export default LoginForm