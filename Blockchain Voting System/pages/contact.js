import { Box,  DialogContentText } from '@material-ui/core';
import React from 'react'
import { Header } from 'semantic-ui-react';
import Header1 from '../components/Header';
import Layout from '../components/Layout';
function contact()
{
    return(
        <div>
          <Header1 />
          <Layout>
            <br></br>
            <br></br>
          <center>  <Header as='h2'  style={{color:'teal'}} >Contact US</Header></center>
     <center> <Box p={6}>
        <Box p={1}>
        <DialogContentText> Sourodeep Roy  <br></br>      email: roysourodeep17@gmail.com     <br></br>     contactNo:+91 9163880480</DialogContentText></Box></Box>
      </center>
     
      </Layout>  
  </div> 
  
  )
}
export default contact