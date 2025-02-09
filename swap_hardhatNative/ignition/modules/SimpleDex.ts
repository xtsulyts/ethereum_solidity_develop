import { ethers } from "hardhat";



async function main() {
  // Despliegue de Token A
  const TokenA = await ethers.getContractFactory("TokenA");
  const tokenA = (await TokenA.deploy("Token A", "TKA", 18, ethers.utils.parseUnits("1000", 18))) as TokenA;
  await tokenA.deployed();
  console.log("Token A deployed to:", tokenA.address);

  // Despliegue de Token B
  const TokenB = await ethers.getContractFactory("TokenB");
  const tokenB = (await TokenB.deploy("Token B", "TKB", 18, ethers.utils.parseUnits("1000", 18))) as TokenB;
  await tokenB.deployed();
  console.log("Token B deployed to:", tokenB.address);

  // Ahora que tenemos las direcciones de Token A y Token B, desplegamos el contrato SimpleDEX
  const SimpleDex = await ethers.getContractFactory("SimpleDEX");
  const simpleDex = (await SimpleDex.deploy(tokenA.address, tokenB.address)) as SimpleDEX;
  await simpleDex.deployed();

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
