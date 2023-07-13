const hre = require("hardhat");
const {ethers} = require("hardhat");

async function main() {
    // Getting deployment addresses (Signer)
    [contractOwner, ...actors] =  await ethers.getSigners();

    // We get the contract to deploy
    const InternetOfThingsContract = await ethers.getContractFactory("InternetOfThingsContractMonitoring");
    const iotc  = await InternetOfThingsContract.deploy();
    
    const receipt = await iotc.deployTransaction.wait();

    const transactionReceipt = await ethers.provider.getTransactionReceipt(receipt.transactionHash);
    const gasUsed = transactionReceipt.gasUsed;
    const gasPricePaid = transactionReceipt.effectiveGasPrice;
    const transactionFee = gasUsed.mul(gasPricePaid);

    await iotc.deployed();

    console.log("Contract address deployed at:", iotc.address, "gasUsed:",gasUsed);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });