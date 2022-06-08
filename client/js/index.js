// import Web3 from "web3";
// const Web3 = require("web3");
// const Web3 = require("web3");
// import { Web3 } from "web3";
// NEED TO REMOVE [MOST PROB]
import configuration from "../contracts/Blockchain.json" assert { type: "json" };
// assert { type: "json" };
// console.log(Web3.version);

// console.log(configuration);

const CONTRACT_ADDRESS = configuration.networks["5777"].address;
const CONTRACT_ABI = configuration.abi;

const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const scvContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

// // blockchin codes
// const abi = require("../../build/contracts/Blockchain.json"); // abi
// const Web3 = require("web3"); // importing web3

// if (typeof web3 !== "undefined") {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // set the provider you want from Web3.providers
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
// }
// web3.eth.defaultAccount = web3.eth.accounts[0];

// const Blockchain = new web3.eth.Contract(
//   abi.abi,
//   "0xD4E71357A312AaA94ed89aFAD31786a0a69A0855"
// );

// // console.log(Blockchain);

// Blockchain.methods
//   .workMlResult(
//     result,
//     vulscore,
//     nonvulscore,
//     filename,
//     ptimestamp,
//     utimestamp,
//     filepath
//   )
//   .send({
//     from: "0x2cc4b8E17407592C37C94c31DFBb92C2fccfDf4c",
//     gas: "6721975",
//   });

// //get details from blockchain
// document.querySelector("#btnGetData").addEventListener("click", function () {
//   console.log("Data from blockchain");

//   Blockchain.methods.getAttendenceCount().call(function (error, result) {
//     console.log(result);

//     $("#attendanceCount").html("Total Attendence Record: " + result);
//   });
// });

const main = async () => {
  const [account] = await web3.eth.requestAccounts();
  console.log("DEVELOPER ADDRESS", account);
};

main();

window.addDeveloper = function () {
  const devAddressField = document.getElementById("devloper_address");
  const devIdField = document.getElementById("developer_id");
  const devNameField = document.getElementById("developer_name");
  const devDOJField = document.getElementById("joining_date");
  const devAddress = devAddressField.value;
  const devId = devIdField.value;
  const devName = devNameField.value;
  const devDoj = devDOJField.value;

  scvContract.methods.addDeveloper(devAddress, devId, devName, devDoj).send({
    from: "0xE6B655A7AcD63f38f1c884bE364c9499f5C27dEC",
  });
};
