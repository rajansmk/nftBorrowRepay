/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle")
const urls=process.env.DB_URL
const privatekey=process.env.DB_KEY
//require("@nomiclabs/hardhat-ganache");
module.exports = {
  defaultNetwork: "ganache",
     networks: {
         ganache: {
             url: "HTTP://127.0.0.1:7545",
             // accounts: [privateKey1, privateKey2, ...]
         },
         hardhat: {
        },
       
        // rinkeby: {
        //   url: "",
        //   accounts: [""]
        // }
     },
  solidity: "0.8.9",
};
