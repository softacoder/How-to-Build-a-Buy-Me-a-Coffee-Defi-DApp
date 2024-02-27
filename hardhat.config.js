require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-waffle");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      account: PRIVATE_KEY,
    },
  },
};

// at 58 min do two other command in cli.
