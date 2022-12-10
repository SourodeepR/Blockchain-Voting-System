import React, { Component } from 'react'
import factory from '../../ethereum/factory';
import Election from '../../ethereum/election'
import { Card, Segment, Header } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Logout from '../../components/Logout';
class ViewResults extends Component {
    static async getInitialProps() {
        console.log("xasx");
        const address = await factory.methods.getAddressFromConstituency('Abc').call();
        const election = Election(address);
        //console.log(address);
        const status = await election.methods.getEnd().call();
        console.log(status);
        const constituency = await election.methods.getConstituency().call();
        const electionTitle = await election.methods.getElectionTitle().call();
        let winner = []
        if (status == true)
            winner = await election.methods.winnername().call();
        return {
            election: election,
            constituency: constituency,
            electionTitle: electionTitle,
            status: status,
            winner: winner
        };
    }

    render() {
        if (this.props.status == true) {
            return (
                <>
                    <Layout>
                        <Logout />
                        <Header as='h1' textAlign='center'>Election Results</Header>
                        <Segment placeholder>
                            <Header as='h3' textAlign='center'>
                                <br></br>Title : {this.props.electionTitle}
                                <br></br> Constituency : {this.props.constituency}
                                <br></br> This Election is won by {this.props.winner[0]} from {this.props.winner[1]}.
                            </Header>
                            <br></br>
                        </Segment>
                    </Layout>

                </>
            )
        }
        else {
            return (
                <>
                    <Layout>
                        <Logout />
                        <Header textAlign='center'>Election is still active!! Results have not been declared yet.</Header>
                    </Layout>
                </>
            )
        }
    }

}

export default ViewResults;