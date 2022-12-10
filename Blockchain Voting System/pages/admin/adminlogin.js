import React, { Component } from 'react'
import '../../components/Header.module.css'
import Header1 from '../../components/Header';
import { Button, Card, Form, Grid, Header,  Segment } from 'semantic-ui-react'
import Election from '../../ethereum/build/Election.json';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import Layout from "../../components/Layout";
import ElecList from '../../components/admin/elecList';
import { Link, Router } from '../../routes.js';
const adminlist = require('./AdminList.json')

class adminlogin extends Component {
  state = {
    username:'',
    password:''
  }

 
  onSignInSubmit = (e) => {
    e.preventDefault()
    
    adminlist.forEach(element => {
      if(element.username == this.state.username && element.password == this.state.password){
        Router.pushRoute('/admin/elections');
      }
    });
}

  render() {
    return (
      <>
      <Header1 />
      <Layout>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='violet' textAlign='center'>
              Admin Login
            </Header>
           
            <Form size='large' onSubmit={this.onSignInSubmit}>
              <div id="Login"></div>
              
              <Segment stacked>
               
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name='Username'
                  value={this.state.username}
                  onChange={event => this.setState({ username: event.target.value })}
                />
                <Form.Input
                  fluid
                  icon='key'
                  iconPosition='left'
                  placeholder='Password'
                  name='Password'
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                />
                <Button color='violet' fluid size='large'>
                  Login
                </Button>
              </Segment>
            
            </Form>
        </Grid.Column>
        </Grid>
        </Layout>
      </>
    )
  }
}


export default adminlogin

