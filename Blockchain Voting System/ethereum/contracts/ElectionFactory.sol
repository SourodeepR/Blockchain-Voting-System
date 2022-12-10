// SPDX-License-Identifier: MIT
pragma solidity >=0.4.26 <0.9.0;
import "./Election.sol";

contract ElectionFactory {
    address[] public deployedElectionList;
    mapping(string => address) electionConstituency;
    struct ElecDetails {
        string adminName;
        string adminTitle;
        string electionTitle;
        string organizationTitle;
        string constituency;
        address elec_address;
    }
    ElecDetails[] public electionDetails;

    // function to deploy new Election Contract
    function createElectionContract(
        string memory _adminName,
        string memory _adminTitle,
        string memory _electionTitle,
        string memory _organizationTitle,
        string memory _constituency
    ) public {
        Election newElection = new Election(
            msg.sender,
            _adminName,
            _adminTitle,
            _electionTitle,
            _organizationTitle,
            _constituency
        );
        deployedElectionList.push(address(newElection));
        electionConstituency[_constituency] = address(newElection);
        ElecDetails memory newElec = ElecDetails({
            adminName: _adminName,
            adminTitle: _adminTitle,
            electionTitle: _electionTitle,
            organizationTitle: _organizationTitle,
            constituency: _constituency,
            elec_address: address(newElection)
        });
        electionDetails.push(newElec);
    }

    // get list of all deployed election Contracts
    function getDeployedElection() public view returns (address[] memory) {
        return deployedElectionList;
    }

    // get all election details
    function getElectionDetails() public view returns (ElecDetails[] memory) {
        return electionDetails;
    }

    // get the address of the contract from the constituency
    function getAddressFromConstituency(string memory _constituency)
        public
        view
        returns (address)
    {
        return electionConstituency[_constituency];
    }
}
