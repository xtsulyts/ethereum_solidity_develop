import { ethers } from "hardhat";
import { TokenA } from "../../typechain-types";
import { TokenB } from "../../typechain-types";
import { SimpleDEX } from "../../typechain-types";
import "@nomicfoundation/hardhat-ignition-ethers";


async function main() {
  // Despliegue de Token A
  const TokenA = await ethers.getContractFactory("TokenA");
  const tokenA = (await TokenA.deploy("TKA", ethers.utils.parseUnits("1000", 18))) as TokenA;

  await tokenA.owner();
  console.log("Token A deployed to:", tokenA.owner);
  const tokenAAddress = TokenA.deploy;

  // Despliegue de Token B
  const TokenB = await ethers.getContractFactory("TokenB");
  const tokenB = (await TokenB.deploy( "TKB", ethers.utils.parseUnits("1000", 18))) as TokenB;
  await tokenB.owner();
  console.log("Token B deployed to:", tokenB.owner);

  // Ahora que tenemos las direcciones de Token A y Token B, desplegamos el contrato SimpleDEX
  const SimpleDex = await ethers.getContractFactory("SimpleDEX");
  const simpleDex = (await SimpleDex.deploy(tokenA, tokenB.owner)) as SimpleDEX;
  await simpleDex.deploy();

  console.log("SimpleDEX deployed to:", simpleDex.address);
  
  // Verifica el owner y las direcciones de token en SimpleDex
  const [deployer] = await ethers.getSigners();
  console.log("Deployer Address:", deployer.address);

  const deployedTokenA = await simpleDex.tokenA();
  const deployedTokenB = await simpleDex.tokenB();

  console.log("Token A in SimpleDEX:", deployedTokenA);
  console.log("Token B in SimpleDEX:", deployedTokenB);
}

// Manejo de errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
