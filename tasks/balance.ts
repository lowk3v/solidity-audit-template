import { addr } from "../hardhat.utils";

const balance = async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(
      await addr(ethers, taskArgs.account)
    );
    console.log(ethers.formatUnits(balance, "ether"), "ETH");
}

export default balance;