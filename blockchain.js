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
  artifacts.abi,
  "0x9C814142aeec04283eaF71ae4f89D7c65A22b6F5" // smart contract addr
);

// // get the total stored attendances in table
// $("#btnGetAllAtten").click(function () {
//   console.log("Total attendence of the employee in the blockchain");

//   // to clear table view
//   document.getElementById("headTableEntry").innerHTML =
//     "<tr>  <th scope='col' class='px-6 py-3'>Employee ID</th>  <th scope='col' class='px-6 py-3'>Name</th>  <th scope='col' class='px-6 py-3'>Date</th>  <th scope='col' class='px-6 py-3'>Time</th></tr>";

//   EmployeeAttendence.methods.getAllAttendance().call(function (error, result) {
//     const _totalAttendenceRecorded = result[0];

//     var emps = result[1];
//     var empIds = result[2];
//     var timeStampInUnixTime = result[3];
//     console.log(emps, empIds);
//     for (let i = 0; i < _totalAttendenceRecorded; i++) {
//       var timeStamp = new Date(timeStampInUnixTime[i] * 1000);
//       var date =
//         timeStamp.getDate() +
//         "/" +
//         (timeStamp.getMonth() + 1) +
//         "/" +
//         timeStamp.getFullYear();
//       var time =
//         timeStamp.getHours() +
//         ":" +
//         timeStamp.getMinutes() +
//         ":" +
//         timeStamp.getSeconds();
//       document.getElementById("tableEntry").innerHTML +=
//         "<tr	  class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center'><th scope='row' class='px-6 py-4 font-medium text-gray-900 dark:text-white'>" +
//         empIds[i] +
//         "</th><td class='px-6 py-4'>" +
//         emps[i] +
//         "</td><td class='px-6 py-4'>" +
//         date +
//         "</td><td class='px-6 py-4'>" +
//         time +
//         "</td>";
//       console.log(emps[i]);
//     }
//   });
//   $("#tableEntry").empty();
// });

module.exports = {
  Blockchain,
  web3,
};
