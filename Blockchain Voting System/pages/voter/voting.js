import React, { Component } from 'react';
import Election from '../../ethereum/election';
import factory from '../../ethereum/factory';
import CandidateList from '../../components/voter/candidateList';
import Layout from '../../components/Layout';
import { Button, Segment } from 'semantic-ui-react'
import { Link } from '../../routes'
import Logout from '../../components/Logout';
import web3 from '../../ethereum/web3';
import sha256 from 'crypto-js/sha256';

class Voting extends Component {
    static async getInitialProps(props) {
        const constituency = props.query.constituency;
        const aadhar = props.query.aadhar;
        const aadharhash = sha256(aadhar).toString();
        // console.log(constituency);
        // console.log(sha256(aadhar).toString());
        const address = await factory.methods.getAddressFromConstituency(constituency).call();
        const election = Election(address);
        // console.log(address);
        const candidates = await election.methods.getAllCandidates().call();
        const accounts = await web3.eth.getAccounts();
        // await election.methods.registerVoter(aadharhash).send({ from: accounts[0] });
        //console.log(candidates);
        return {
            candidates: candidates,
            address: address,
            constituency: constituency
        };
    }

    render() {
        return (
            <Layout>
                <Logout />
                <h2>Vote</h2>

                <Segment basic textAlign='center'>
                    <Link route={`/voter/results`}>
                        <a>
                            <Button
                                floated=""
                                content="View Results"
                                icon="eye"
                                color="violet"
                                size="big"
                            />
                        </a>
                    </Link>
                </Segment>

                <CandidateList candidates={this.props.candidates} address={this.props.address}></CandidateList>


            </Layout>
        );
    }
}

export default Voting;