import React from 'react'

import Layout from "../components/Layout";
import { Card, Segment, Header, TableBody } from 'semantic-ui-react';
import { Box, DialogContentText } from '@material-ui/core';
import Header1 from '../components/Header';
function About()
{

    return(
        <div>
            <br></br>
            <br></br>
            <Header1 />
            <Layout>
                <br></br>
                <br></br>
    
         <center>  <Header as='h2'  style={{color:'teal'}} >About Us</Header></center>
               <br></br>
        
        <br></br>
        <br></br>
        <center> <Box p={1}>
        <Box p={1}>
       <DialogContentText style={{color:'teal'}}>Votify is an e-voting platform using the Blockchain technology. 
           <br></br>At Votify, we aim to empower citizens across the entire country to successfully and safely cast their votes using our decentralized, safe and easy-to-use system.
           <br></br> A truly democratic system that it is, Votify is ‘of the people, by the people and for the people’ from the very start to end.
           <br></br> With a system like Votify, the ever so dreaded and tedious task of in-person voting gets brought down to a mere login and click, and voila, all of us emerge out to be responsible citizens on the other end just like that. 
           <br></br> What makes Votify stand out is the technology of Blockchain that it is based on, which makes it safe and transparent to use and thus helping us deliver as promised.
           <br></br>To conclude, although this is the ‘About Us’ page, but at Votify, we’re about you! </DialogContentText>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  </Box>
   </Box>
   </center>
   </Layout>
    </div>
    )
   }
export default About