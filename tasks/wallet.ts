const wallet = async (_, { ethers }) => {
    const randomWallet = ethers.Wallet.createRandom();
    const privateKey = randomWallet._signingKey().privateKey;
    console.log("🔐 WALLET Generated as " + randomWallet.address + "");
    console.log("🔗 http://localhost:3000/pk#" + privateKey);
}

export default wallet;