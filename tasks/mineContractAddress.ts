import { DEBUG } from "../hardhat.utils";
import * as bip39 from "bip39";
import * as hdkey from "ethereumjs-wallet";
import * as fs from "fs";
import chalk from "chalk";
import * as rlp from "rlp";
import * as keccak from "keccak";
import * as EthUtil from "ethereumjs-util";

const mineContractAddress = async (taskArgs, { network, ethers }) => {
  let contract_address = "";
  let address;

  let mnemonic = "";
  while (contract_address.indexOf(taskArgs.searchFor) != 0) {
    mnemonic = bip39.generateMnemonic();
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
    address =
      "0x" + EthUtil.privateToAddress(wallet._privKey).toString("hex");

    const nonce = 0x00; // The nonce must be a hex literal!
    const sender = address;

    const input_arr = [sender, nonce];
    const rlp_encoded = rlp.encode(input_arr);

    const contract_address_long = keccak("keccak256")
      .update(rlp_encoded)
      .digest("hex");

    contract_address = contract_address_long.substring(24); // Trim the first 24 characters.
  }

  console.log(
    "⛏  Account Mined as " +
      address +
      " and set as mnemonic in current directory"
  );
  console.log(
    "📜 This will create the first contract: " +
      chalk.magenta("0x" + contract_address)
  );
  console.log(
    "💬 Use 'yarn run account' to get more information about the deployment account."
  );

  fs.writeFileSync(
    "./" + address + "_produces" + contract_address + ".txt",
    mnemonic.toString()
  );
  fs.writeFileSync("./mnemonic.txt", mnemonic.toString());
}

export default mineContractAddress;