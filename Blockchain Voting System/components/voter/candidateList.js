import React, { Component } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import web3 from '../../ethereum/web3';
import Election from '../../ethereum/election';

class CandidateList extends Component {


    handleVote = async (id) => {
        try {
            const accounts = await web3.eth.getAccounts();
            const election = Election(this.props.address);
            await election.methods.vote(parseInt(id) - 1).send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
    };

    renderCandidates() {
        console.log(this.props.address);
        const items = this.props.candidates.map(candidate => {
            //console.log(candidate[1]);
            return (
                <Card>
                    {/* <Image src={this.props.avatarimg} wrapped /> */}
                    <Card.Content>
                        <Card.Header>{candidate[1]}</Card.Header>
                        <Card.Description>
                            Party : {candidate[6]}<br></br>
                        </Card.Description>
                    </Card.Content>
                    <Button
                        color='violet'
                        content='Vote'
                        floated='center'
                        onClick={() => this.handleVote(candidate[0])} />
                </Card>
            );

        });

        return items;
    }

    render() {
        return (
            <div>
                {/* <Card>
                    <Image src={candidate[4]} wrapped />
                    <Card.Content>
                        <Card.Header>ABC</Card.Header>
                        <Card.Description>
                            Party : BJP
                        </Card.Description>
                    </Card.Content>
                    <Button
                        color='teal'
                        content='Vote'
                        floated='center'
                        onClick={this.vote}
                    />
                </Card> */}

                <Card.Group itemsPerRow={4} stackable doubling>
                    {this.renderCandidates()}
                </Card.Group>`
            </div>
        );
    }
}

export default CandidateList;