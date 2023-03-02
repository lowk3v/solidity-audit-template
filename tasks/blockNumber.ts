const blockNumber = async (_, { ethers }) => {
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log(blockNumber);
}

export default blockNumber;