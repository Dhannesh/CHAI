// const hre = require("hardhat");
const { ethers } = require("hardhat");

async function getBalances(address) {
  const adrs = await address.getAddress();
  const balanceBigInt = await ethers.provider.getBalance(adrs)
  // const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    // console.log(`Address ${counter} balance:`, await address);
    counter++;
  }
}
async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, name ${name}, address ${from}, message ${message}`
    );
  }
}
async function main() {
  const [owner, from1, from2, from3] = await ethers.getSigners();
  // console.log(owner, from1, from2);
  const chai = await ethers.getContractFactory("chai");
  const contract = await chai.deploy();

  await contract.waitForDeployment();
  // console.log(contract);
  console.log("Address of contract: ", contract.target);
  const addresses = [
    owner,
    from1,
    from2,
    from3,
  ];
  console.log("before buying chai");
  await consoleBalances(addresses);
  const amount = { value: ethers.parseEther("1") };
  await contract.connect(from1).buyChai("from1", "Nice Chai 1", amount);
  await contract.connect(from2).buyChai("from2", "Nice Chai 2", amount);
  await contract.connect(from3).buyChai("from3", "Nice Chai 3", amount);
  console.log("after buying chai");
  await consoleBalances(addresses);
  const memos = await contract.getMemos();
  consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});