require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
import 'solidity-coverage'
import "hardhat-deploy";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {
      accounts: {
        count: 500,
      },
    },
    bsc_testnet: {
      url: process.env.PROVIDER_URL,
      accounts: [process.env.privateKey],
      verify: {
        etherscan: {
          apiKey: process.env.apiKey,
        },
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    sender: 1,
  },
};
