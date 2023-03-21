const accounts = async (ethers: any) => {
    const accounts: string[] = await ethers.provider.listAccounts();
    accounts.forEach((account) => console.log(account));
}

export default accounts;