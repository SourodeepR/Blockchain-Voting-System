import web3 from "./web3";
import ElectionFactory from './build/ElectionFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(JSON.stringify(ElectionFactory.abi)),
    '0x8A59f8979fa18DF290D565bA110a738912458807'
);

export default instance;