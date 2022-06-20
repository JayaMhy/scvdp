const Web3 = require("web3");
const contract = require("truffle-contract");

const artifacts = require("./build/contracts/Blockchain.json");
// assert { type: "json" };
// console.log(Web3.version);

// console.log(configuration);

const CONTRACT_ADDRESS = artifacts.networks["5777"].address;
const CONTRACT_ABI = artifacts.abi;

let web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const scvContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// blockchin codes
// abi

// const LMS = contract(artifacts);
// LMS.setProvider(web3.currentProvider);

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}
web3.eth.defaultAccount = web3.eth.accounts[0];

const Blockchain = new web3.eth.Contract(
  // artifacts.abi,
  CONTRACT_ABI,
  // "0x9C814142aeec04283eaF71ae4f89D7c65A22b6F5" // smart contract addr
  CONTRACT_ADDRESS
);

module.exports = {
  Blockchain,
  web3,
};
