const accounts = async (_, { ethers }) => {
    const accounts = await ethers.provider.listAccounts();
    accounts.forEach((account) => console.log(account));
}

export default accounts;