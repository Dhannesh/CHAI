const { ethers } = require("hardhat");

async function main() {
  const [owner, from1, from2, from3] = await ethers.getSigners();
  const chai = await ethers.getContractFactory("chai");
  const contract = await chai.deploy();

  await contract.waitForDeployment();
  console.log("Address of contract: ", contract.target);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
