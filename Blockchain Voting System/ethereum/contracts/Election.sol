// SPDX-License-Identifier: MIT
pragma solidity >=0.4.26 <0.9.0;

contract Election {
    address public admin;
    string adminName;
    string adminTitle;
    string electionTitle;
    string organizationTitle;
    string constituency;
    uint256 candidateCount;
    uint256 voterCount;
    bool start;
    bool end;

    // Constructor
    constructor(
        address adminAddress,
        string memory _adminName,
        string memory _adminTitle,
        string memory _electionTitle,
        string memory _organizationTitle,
        string memory _constituency
    ) {
        // Initilizing default values
        admin = adminAddress;
        adminName = _adminName;
        adminTitle = _adminTitle;
        electionTitle = _electionTitle;
        organizationTitle = _organizationTitle;
        constituency = _constituency;
        candidateCount = 0;
        voterCount = 0;
        start = false;
        end = false;
    }

    // Model a candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 age;
        string gender;
        string imageurl;
        string aadhar;
        string partyName;
        uint256 voteCount;
    }

    // Modifier for only admin access
    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    // store candidates
    mapping(string => bool) public candidateAadhar;
    Candidate[] public candidateList;

    // Add new candidates
    function addCandidate(
        string memory _name,
        uint256 _age,
        string memory _gender,
        string memory _imageurl,
        string memory _aadhar,
        string memory _partyName
    ) public onlyAdmin {
        // require that election has not started
        require(start == false);
        bool isnewCandidate = true;
        // check if candidate already exists
        if (candidateAadhar[_aadhar] == true) isnewCandidate = false;
        require(isnewCandidate, "This candidate already exists");
        candidateCount++;
        Candidate memory newCandidate = Candidate({
            id: candidateCount,
            name: _name,
            age: _age,
            gender: _gender,
            imageurl: _imageurl,
            aadhar: _aadhar,
            partyName: _partyName,
            voteCount: 0
        });
        candidateList.push(newCandidate);
        candidateAadhar[_aadhar] = true;
    }

    // Start election
    function startElecetion() public onlyAdmin {
        start = true;
        end = false;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store accounts that have registered
    mapping(string => address) public registeredVoters;

    function registerVoter(string memory _aadharNo) public {
        require(
            registeredVoters[_aadharNo] == address(0),
            "Voter already registered or voted"
        );
        registeredVoters[_aadharNo] = msg.sender;
        voterCount++;
    }

    //voted event
    event votedEvent(uint256 indexed _candidateId);

    function vote(uint256 _candidateId) public {
        // require that voter has not voted before
        require(voters[msg.sender] == false, "You have already voted.");
        // require a valid candidate
        require(
            _candidateId >= 0 && _candidateId < (candidateCount),
            "Candidate does not exist."
        );
        // require the election has started
        require(start == true, "Election event has not started yet.");
        // require the election has not ended
        require(end == false, "Election event has ended.");
        // update candidate vote count
        candidateList[_candidateId].voteCount++;
        voters[msg.sender] = true; // record that voter has voted
        // trigger voted event
        emit votedEvent(_candidateId);
    }

    // Get Elections details
    function getAdminName() public view returns (string memory) {
        return adminName;
    }

    function getAdminTitle() public view returns (string memory) {
        return adminTitle;
    }

    function getElectionTitle() public view returns (string memory) {
        return electionTitle;
    }

    function getOrganizationTitle() public view returns (string memory) {
        return organizationTitle;
    }

    function getConstituency() public view returns (string memory) {
        return constituency;
    }

    // Get number of candidates
    function getCandidateCount() public view returns (uint256) {
        // Returns total number of candidates
        return candidateCount;
    }

    // Get all candidates
    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidateList;
    }

    // Get number of voters
    function getVoterCount() public view returns (uint256) {
        // Returns total number of voters
        return voterCount;
    }

    // End election
    function endElection() public onlyAdmin {
        end = true;
        start = false;
        declarewinner();
    }

    uint256 public winnerindex;

    function declarewinner() private {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < candidateList.length; p++) {
            if (candidateList[p].voteCount > winningVoteCount) {
                winningVoteCount = candidateList[p].voteCount;
                winnerindex = p;
            }
        }
    }

    // Get winner name
    function winnername()
        public
        view
        returns (
            string memory,
            string memory,
            string memory
        )
    {
        require(end == true, "Election has not ended yet.");
        return (
            candidateList[winnerindex].name,
            candidateList[winnerindex].partyName,
            candidateList[winnerindex].imageurl
        );
    }

    // Get election start and end values
    function getStart() public view returns (bool) {
        return start;
    }

    function getEnd() public view returns (bool) {
        return end;
    }
}
