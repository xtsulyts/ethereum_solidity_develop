import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers"
// This adds support for typescript paths mappings
import "tsconfig-paths/register";
//require("@nomiclabs/hardhat-ethers");



const config: HardhatUserConfig = {
  solidity: "0.8.28", // O la versión de Solidity que estés usando
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Red local de Hardhat
    },
  },
};


export default config;
