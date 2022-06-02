// import Web3 from "web3";
// const Web3 = require("web3");
// const Web3 = require("web3");
// import { Web3 } from "web3";

import configuration from "../contracts/Blockchain.json" assert { type: "json" };
// console.log(Web3.version);

// console.log(configuration);

const CONTRACT_ADDRESS = configuration.networks["5777"].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const scvContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// console.log(scvContract);
// Button Elements
const btnAddDev = document.getElementById("btnAddDev");

// Elements
const devAddressField = document.getElementById("dev1");
const devIdField = document.getElementById("dev2");
const devNameField = document.getElementById("dev3");
const devDOJField = document.getElementById("dev4");

// console.log(btnAddDev);

const main = async () => {
  const accounts = await web3.eth.requestAccounts();
  console.log(accounts);
  const account = accounts[0];
};

main();

btnAddDev.addEventListener("click", function () {
  const devAddress = devAddressField.value;
  const devId = devIdField.value;
  const devName = devNameField.value;
  const devDoj = devDOJField.value;

  console.log(devAddress, devId, devName, devDoj);

  // function solidity

  scvContract.methods.addDeveloper(devAddress, devId, devName, devDoj).send({
    from: "0x2cc4b8E17407592C37C94c31DFBb92C2fccfDf4c",
  });
});
