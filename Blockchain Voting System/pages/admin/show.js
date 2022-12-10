import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Election from '../../ethereum/election';
import CandidatePrompt from '../../components/admin/candidateprompt';
import CandidateList from '../../components/admin/candidateList';
import { Grid, Card, Button } from 'semantic-ui-react';
import { Link } from '../../routes';
import election from '../../ethereum/election';
import web3 from '../../ethereum/web3';
import Logout from '../../components/Logout';
class ElectionShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const election = Election(address);
        const start = await election.methods.getStart().call();
        const end = await election.methods.getEnd().call();
        const electionTitle = await election.methods.getElectionTitle().call();
        const adminName = await election.methods.getAdminName().call();
        const adminTitle = await election.methods.getAdminTitle().call();
        const orgTitle = await election.methods.getOrganizationTitle().call();
        const constituency = await election.methods.getConstituency().call();
        const candidates = await election.methods.getAllCandidates().call();

        //console.log(candidates);

        return {
            address: address,
            start: start,
            end: end,
            electionTitle: electionTitle,
            adminName: adminName,
            adminTitle: adminTitle,
            orgTitle: orgTitle,
            constituency: constituency,
            candidates: candidates,
        };
    }

    state = {
        startDisabled: this.props.start,
        startLoading: false,
        endDisabled: this.props.end,
        endLoading: false
    };

    handleStartClick = async (event) => {
        // event.preventDefault();
        this.setState({ startLoading: true });
        try {
            const accounts = await web3.eth.getAccounts();
            const election = Election(this.props.address);
            await election.methods.startElecetion().send({ from: accounts[0] });
            this.setState({
                startLoading: false,
                startDisabled: true,
                endDisabled: false
            })
        } catch (err) {
            console.log(err);
            this.setState({
                startLoading: false
            });
        }
    };

    handleEndClick = async (event) => {
        // event.preventDefault();
        this.setState({ endLoading: true });
        try {
            const accounts = await web3.eth.getAccounts();
            //console.log(this.props.election)
            const election = Election(this.props.address);
            await election.methods.endElection().send({ from: accounts[0] });
            this.setState({
                endLoading: false,
                endDisabled: true,
                startDisabled: false
            })
        } catch (err) {
            console.log(err);
            this.setState({
                endLoading: false
            });
        }
    };

    render() {

        return (
            <Layout>
                <Logout />
                <div style={{ padding: 10 }}></div>
                <Button
                    floated='right'
                    color='red'
                    loading={this.state.endLoading}
                    disabled={this.state.endDisabled}
                    onClick={this.handleEndClick}
                    content='End'
                />
                <Button
                    floated='right'
                    color='green'
                    loading={this.state.startLoading}
                    disabled={this.state.startDisabled}
                    onClick={this.handleStartClick}
                    content='Start'
                />

                <h2>{this.props.electionTitle}</h2>

                <Card fluid>
                    <Card.Content>
                        <Grid column={2}>
                            <Grid.Row>
                                <Grid.Column width={7}>
                                    Admin : {this.props.adminName}
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    Title : {this.props.adminTitle}
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={7}>
                                    Organization : {this.props.orgTitle}
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    Constituency : {this.props.constituency}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Card.Content>

                </Card>

                <h3>Candidates</h3>
                <hr></hr>

                <CandidatePrompt address={this.props.address}></CandidatePrompt>
                <CandidateList candidates={this.props.candidates}></CandidateList>


            </Layout>
        );
    }
}

export default ElectionShow;