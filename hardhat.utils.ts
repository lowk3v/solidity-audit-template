import { utils } from "ethers";
import * as fs from "fs";

export const DEBUG = true;
const { isAddress, getAddress } = utils;

export default function debug(text: string) {
  if (DEBUG) {
    console.log(text);
  }
}

export function send(signer: any, txparams: any) {
  return signer.sendTransaction(txparams, (error: any, transactionHash: any) => {
    if (error) {
      debug(`Error: ${error}`);
    }
    debug(`transactionHash: ${transactionHash}`);
    // checkForReceipt(2, params, transactionHash, resolve)
  });
}

export const addr = async (ethers: any, addr: any) => {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts[addr] !== undefined) {
    return accounts[addr];
  }
  throw `Could not normalize address: ${addr}`;
}

export const mnemonic = (defaultNetwork: string = "localhost") => {
  try {
    return fs.readFileSync("./mnemonic.txt").toString().trim();
  } catch (e) {
    if (defaultNetwork !== "localhost") {
      console.log(
        "☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`."
      );
    }
  }
  return "";
}

export const getRemappings = () => {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}
