import { DEBUG } from "../hardhat.utils";
import chalk from "chalk";
import * as fs from "fs";
import * as bip39 from "bip39";
import * as hdkey from "ethereumjs-wallet";
import * as EthUtil from "ethereumjs-util";
import * as qrcode from "qrcode-terminal";
import { ethers } from "ethers";

const account = async (networks: any) => {
    try {
      const mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim();
      if (DEBUG) console.log("mnemonic", mnemonic);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      if (DEBUG) console.log("seed", seed);
      const hdwallet = hdkey.fromMasterSeed(seed);
      const wallet_hdpath = "m/44'/60'/0'/0/";
      const account_index = 0;
      const fullPath = wallet_hdpath + account_index;
      if (DEBUG) console.log("fullPath", fullPath);
      const wallet = hdwallet.derivePath(fullPath).getWallet();
      const privateKey = "0x" + wallet._privKey.toString("hex");
      if (DEBUG) console.log("privateKey", privateKey);
      const address =
        "0x" + EthUtil.privateToAddress(wallet._privKey).toString("hex");

      qrcode.generate(address);
      console.log("‍📬 Deployer Account is " + address);
      for (const n in networks) {
        // console.log(networks[n],n)
        try {
          const provider = new ethers.providers.JsonRpcProvider(
            networks[n].url
          );
          const balance = await provider.getBalance(address);
          console.log(" -- " + n + " --  -- -- 📡 ");
          console.log("   balance: " + ethers.utils.formatEther(balance));
          console.log(
            "   nonce: " + (await provider.getTransactionCount(address))
          );
        } catch (e) {
          if (DEBUG) {
            console.log(e);
          }
        }
      }
    } catch (err) {
      console.log(`--- Looks like there is no mnemonic file created yet.`);
      console.log(
        `--- Please run ${chalk.greenBright("yarn generate")} to create one`
      );
    }
};

export default account;