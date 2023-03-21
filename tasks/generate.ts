import { DEBUG } from "../hardhat.utils";
import * as bip39 from "bip39";
import HDKey from 'hdkey';
import * as fs from "fs";
import * as EthUtil from "ethereumjs-util";
import { mnemonicToSeedSync } from 'bip39';

const generate = async () => {
    const mnemonic = bip39.generateMnemonic();
    if (DEBUG) console.log("mnemonic", mnemonic);
    let seed = mnemonicToSeedSync(mnemonic);
    if (DEBUG) console.log("seed:", Buffer.from(seed).toString('hex'));

    const wallet_hdpath = "m/44'/60'/0'/0/";
    const account_index = 0;
    const fullPath = wallet_hdpath + account_index;
    if (DEBUG) console.log("fullPath:", fullPath);
   
    const hdwallet = HDKey.fromMasterSeed(seed);
    const wallet = hdwallet.derive(fullPath);
    const privateKey = "0x" + wallet.privateKey.toString("hex");
    if (DEBUG) console.log("privateKey", privateKey);
    const address =
      "0x" + EthUtil.privateToAddress(wallet.privateKey).toString("hex");
    console.log(
      "🔐 Account Generated as " +
        address +
        " and set as mnemonic in current directory"
    );
    console.log(
      "💬 Use 'yarn run account' to get more information about the deployment account."
    );

    fs.writeFileSync("./" + address + ".txt", mnemonic.toString());
    fs.writeFileSync("./mnemonic.txt", mnemonic.toString());
  }

export default generate;