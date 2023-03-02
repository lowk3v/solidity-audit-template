import { DEBUG } from "../hardhat.utils";
import chalk from "chalk";
import * as fs from "fs";
import { mnemonicToSeedSync } from 'bip39';
import * as EthUtil from "ethereumjs-util";
import * as qrcode from "qrcode-terminal";
import { ethers } from "ethers";
import HDKey from 'hdkey';

const account = async (networks: any) => {
    
    try {
      const mnemonic = fs.readFileSync("./mnemonic.txt").toString().trim();
      if (DEBUG) console.log("mnemonic:", mnemonic);
      
      let seed = mnemonicToSeedSync(mnemonic);
      if (DEBUG) console.log("seed:", Buffer.from(seed).toString('hex'));

      const wallet_hdpath = "m/44'/60'/0'/0/";
      const account_index = 0;
      const fullPath = wallet_hdpath + account_index;
      if (DEBUG) console.log("fullPath:", fullPath);

      const hdwallet = HDKey.fromMasterSeed(seed);
      const wallet = hdwallet.derive(fullPath);
      const privateKey = "0x" + wallet.privateKey.toString("hex");
      if (DEBUG) console.log("privateKey:", privateKey);
      const address = "0x" + EthUtil.privateToAddress(wallet.privateKey).toString("hex");

      console.log("‍📬 Deployer Account is: " + address);
      qrcode.generate(address);

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
      console.log(err);
    }
};

export default account;