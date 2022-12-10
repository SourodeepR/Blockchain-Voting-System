const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/ElectionFactory.json');
const compiledElection = require('../ethereum/build/Election.json');

let accounts;
let factory;
let electionAddress;
let election;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)))
        .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '3000000' });

    await factory.methods.createElectionContract('abc', 'abc', 'abc', 'abc', 'abc').send({
        from: accounts[0],
        gas: '3000000'
    });

    [electionAddress] = await factory.methods.getDeployedElection().call();
    election = await new web3.eth.Contract(
        JSON.parse(JSON.stringify(compiledElection.abi)),
        electionAddress
    );
});

describe('Elections', () => {
    it('deploys a factory and an election', () => {
        assert.ok(factory.options.address);
        assert.ok(election.options.address);
    });

    it('marks caller as the election admin', async () => {
        const admin = await election.methods.admin().call();
        assert.equal(accounts[0], admin);
    });

});