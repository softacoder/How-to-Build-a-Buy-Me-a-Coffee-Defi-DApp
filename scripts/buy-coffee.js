// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

// async function getBalance(address) {
//   const balanceBigInt = await hre.waffle.provider.getBalance(address);
//   return hre.ethers.utils.formatEther(balanceBigInt);
// }

// async function printBalances(addresses) {
//   let idx = 0;
//   for (const address of addresses) {
//     console.log(`Address ${idx}' balance: `, await getBalance(address));
//     idx++;
//   }
// }

// async function printMemos(memos) {
//   for (const memo of memos) {
//     const timestamp = memo.timestamp;
//     const tipper = memo.name;
//     const tipperAddress = memo.from;
//     const message = memo.message;
//     console.log(
//       `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
//     );
//   }
// }

// // video at 29:33

// async function main() {
//   const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

//   const BuyMeACoffee = await hre.ethers.getContractFactory("buyMeACoffee");
//   const buyMeACoffee = await BuyMeACoffeeFactory.deploy();
//   await buyMeACoffee.deployed();
//   console.log("BuyMeACoffee deployed to " + buyMeACoffee.address);
// }

// const addresses = [owner.address, tipper.address, buyMeACoffee.address];
// console.log("== start ==");
// await printBalances(addresses);

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx}'s balance: `, await getBalance(address));
    idx++;
  }
}

async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`
    );
  }
}

// video at 36:11 you see it has not installed hardhat correct?

async function main() {
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deployed to " + buyMeACoffee.address);

  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("== start ==");
  await printBalances(addresses);

  const tip = { value: hre.ethers.utils.parseEther("1") };
  await buyMeACoffee
    .connect(tipper)
    .buyCoffee("Carolina", "You are the best!", tip);
  await buyMeACoffee
    .connect(tipper2)
    .buyCoffee("Vito", "Amazing teacher!", tip);
  await buyMeACoffee
    .connect(tipper3)
    .buyCoffee("Kay", "I love my proof of knowledge NFT!", tip);

  console.log("== bought coffee ==");
  await printBalances(addresses);

  await buyMeACoffee.connect(owner).withdrawTips();

  console.log("== withdrawTips ==");
  await printBalances(addresses);

  console.log("== memos ==");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);
}

// video at 47 min

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
