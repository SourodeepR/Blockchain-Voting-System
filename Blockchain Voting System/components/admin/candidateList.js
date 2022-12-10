import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class CandidateList extends Component {

    renderCandidates() {
        const items = this.props.candidates.map(candidate => {
            //console.log(candidate[1]);
            return (
                <Card>
                    {/* <Image src={candidate[4]} wrapped /> */}
                    <Card.Content>
                        <Card.Header>{candidate[1]}</Card.Header>
                        <Card.Description>
                            Party : {candidate[6]}
                        </Card.Description>
                    </Card.Content>

                    <Card.Content extra>
                        Age : {candidate[2]}<br></br>
                        Gender : {candidate[3]}<br></br>
                    </Card.Content>

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

                    <Card.Content extra>
                        Age : 45<br></br>
                        Gender : Male<br></br>
                    </Card.Content>

                </Card> */}
                <Card.Group>
                    {this.renderCandidates()}
                </Card.Group>
            </div>
        );
    }
}

export default CandidateList;