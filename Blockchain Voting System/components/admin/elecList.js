import React, { useState, useEffect } from 'react';
import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory';
import { Link } from '../../routes';
import { Container, Card } from 'semantic-ui-react';

function ElecList() {
    const [electionList, setElectionList] = useState([]);

    useEffect(() => {
        (async function fetchDetails() {
            try {
                const list = await factory.methods.getElectionDetails().call();
                // console.log(list);
                setElectionList(list);
                // console.log(list[0]);
            }
            catch (err) {
                console.log(err);
            }
        })();
    }, []);
    // console.log(electionList);
    const items = electionList.map((value) => {
        return {
            header: value.electionTitle,
            meta: `Constituency: ${value.constituency}`,
            description: (<Link route={`/admin/${value.elec_address}`} >
                < a > View Election Details</a>
            </Link>),
            fluid: true
        };
    });
    // console.log(items);

    return (
        <Card.Group items={items} />
    )
}

export default ElecList;