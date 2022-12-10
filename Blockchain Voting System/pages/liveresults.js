import React, { Component } from 'react';
import Election from '../ethereum/election';
import factory from '../ethereum/factory';

class LiveResults extends Component {
    static async getInitialProps() {
        const elecList = await factory.methods.getElectionDetails().call();
        const addressList = await factory.methods.getDeployedElection().call();
        let resultList = [];
        let candidateList = [];
        //console.log(addressList.length)
        for (let i = 0; i < addressList.length; i++) {
            const election = Election(addressList[i]);
            const status = await election.methods.getEnd().call();
            // console.log(status);
            if (status === false) {
                resultList.push(null);
                candidateList.push(null);
                continue;
            }
            const cl = await election.methods.getAllCandidates().call();
            const winner = await election.methods.winnername().call();
            //console.log(winner)
            //console.log(cl);
            resultList.push(winner);
            candidateList.push(cl);
        }
        // console.log(resultList);
        // console.log(candidateList);
        // console.log(elecList);
        return {
            result: resultList,
            candidateList: candidateList,
            elecList: elecList
        }
    }

    render() {
        return "Results";
    }
}
export default LiveResults;