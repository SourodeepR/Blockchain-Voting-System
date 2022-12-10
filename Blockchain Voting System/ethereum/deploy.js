const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/ElectionFactory.json');

const provider = new HDWalletProvider(
    'jazz clump end debate lobster destroy legal merry aspect club proud apple',
    // change this to your own mnemonic phrase!
    // 'HTTP://127.0.0.1:7545'
    'https://rinkeby.infura.io/v3/e091a80604ef41ba883039ae7ba79367'
    // change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)))
        .deploy({ data: '0x' + compiledFactory.evm.bytecode.object })
        .send({ gas: '4000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};
deploy();
