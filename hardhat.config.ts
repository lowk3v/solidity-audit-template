import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "@tenderly/hardhat-tenderly";
import "chalk";
import "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";

import wallet from "./tasks/wallet";
import fundedwallet from "./tasks/fundedwallet";
import generate from "./tasks/generate";
import mineContractAddress from "./tasks/mineContractAddress";
import account from "./tasks/account";
import send from "./tasks/send";
import balance from "./tasks/balance";
import accounts from "./tasks/accounts" ;
import blockNumber from "./tasks/blockNumber";
import pair from "./tasks/pair";

import process from "process";
import { getRemappings, mnemonic } from "./hardhat.utils";
import "@nomicfoundation/hardhat-toolbox";

/*
  📡 This is where you configure your deploy configuration for 🏗 scaffold-eth

  check out `scripts/deploy.js` to customize your deployment

  out of the box it will auto deploy anything in the `contracts` folder and named *.sol
  plus it will use *.args for constructor args
*/

//
// Select the network you want to deploy to here:
//
const defaultNetwork = "hardhat";

const mainnetGwei = 21;

const config: HardhatUserConfig = {
  defaultNetwork,

  /**
   * gas reporter configuration that let's you know
   * an estimate of gas for contract deployments and function calls
   * More here: https://hardhat.org/plugins/hardhat-gas-reporter.html
   */
  gasReporter: {
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP || "",
  },

  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16"
      }
    ],
  },

  // if you want to deploy to a testnet, mainnet, or xdai, you will need to configure:
  // 1. An Infura key (or similar)
  // 2. A private key for the deployer
  // DON'T PUSH THESE HERE!!!
  // An `example.env` has been provided in the Hardhat root. Copy it and rename it `.env`
  // Follow the directions, and uncomment the network you wish to deploy to.

  networks: {
    hardhat: {},

    eth: {
      url: "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: mainnetGwei * 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },

    fantom: {
      url: "https://rpcapi.fantom.network",
      gasPrice: 1000000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    polygon: {
      url: "https://polygon-rpc.com",
      // url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXx/polygon/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: 3200000000,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
      chainId: 97,
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
      //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/rinkeby", // <---- YOUR MORALIS ID! (not limited to infura)
      accounts: {
        mnemonic: mnemonic(),
      },
    },
    // kovan: {
    //   url: "https://kovan.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
    //   //    url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/eth/kovan", // <---- YOUR MORALIS ID! (not limited to infura)
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // ropsten: {
    //   url: "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
    //   //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",// <---- YOUR MORALIS ID! (not limited to infura)
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // goerli: {
    //   url: "https://goerli.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
    //   //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/goerli", // <---- YOUR MORALIS ID! (not limited to infura)
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // xdai: {
    //   url: "https://rpc.xdaichain.com/",
    //   gasPrice: 1000000000,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // testnetFantom: {
    //   url: "https://rpc.testnet.fantom.network",
    //   gasPrice: 1000000000,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // mumbai: {
    //   url: "https://rpc-mumbai.maticvigil.com",
    //   // url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXX/polygon/mumbai", // <---- YOUR MORALIS ID! (not limited to infura)
    //   gasPrice: 3200000000,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // matic: {
    //   url: "https://rpc-mainnet.maticvigil.com/",
    //   gasPrice: 1000000000,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // optimism: {
    //   url: "https://mainnet.optimism.io",
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    //   companionNetworks: {
    //     l1: "mainnet",
    //   },
    // },
    // kovanOptimism: {
    //   url: "https://kovan.optimism.io",
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    //   companionNetworks: {
    //     l1: "kovan",
    //   },
    // },
    // localOptimism: {
    //   url: "http://localhost:8545",
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    //   companionNetworks: {
    //     l1: "localOptimismL1",
    //   },
    // },
    // localOptimismL1: {
    //   url: "http://localhost:9545",
    //   gasPrice: 0,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    //   companionNetworks: {
    //     l2: "localOptimism",
    //   },
    // },
    // localAvalanche: {
    //   url: "http://localhost:9650/ext/bc/C/rpc",
    //   gasPrice: 225000000000,
    //   chainId: 43112,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // fujiAvalanche: {
    //   url: "https://api.avax-test.network/ext/bc/C/rpc",
    //   gasPrice: 225000000000,
    //   chainId: 43113,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // mainnetAvalanche: {
    //   url: "https://api.avax.network/ext/bc/C/rpc",
    //   gasPrice: 225000000000,
    //   chainId: 43114,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // testnetHarmony: {
    //   url: "https://api.s0.b.hmny.io",
    //   gasPrice: 1000000000,
    //   chainId: 1666700000,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // mainnetHarmony: {
    //   url: "https://api.harmony.one",
    //   gasPrice: 1000000000,
    //   chainId: 1666600000,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // moonbeam: {
    //   url: 'https://rpc.api.moonbeam.network',
    //   chainId: 1284,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // moonriver: {
    //   url: 'https://rpc.api.moonriver.moonbeam.network',
    //   chainId: 1285,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // moonbaseAlpha: {
    //   url: 'https://rpc.api.moonbase.moonbeam.network',
    //   chainId: 1287,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // },
    // moonbeamDevNode: {
    //   url: 'http://127.0.0.1:9933',
    //   chainId: 1281,
    //   accounts: {
    //     mnemonic: mnemonic(),
    //   },
    // }
  },

  ovm: {
    solcVersion: "0.7.6",
  },

  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },

  etherscan: {
    apiKey: {
      mainnet: "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW",
      // add other network's API key here
    },
  },

  paths: {
    cache: "./cache_hardhat", // Use a different cache for Hardhat than Foundry
  },

  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: () => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
};

export default config;

// TASKS
// task("getPair", "Get pair of tokens")
//   .addParam("t0", "Address of token0")
//   .addParam("t1", "Address of token1")
//   .setAction(pair);
  
task("wallet", "Create a wallet (pk) link").setAction(wallet);
task("fundedwallet", "Create a wallet (pk) link and fund it with deployer?")
  .addOptionalParam(
    "amount",
    "Amount of ETH to send to wallet after generating"
  )
  .addOptionalParam("url", "URL to add pk to")
  .setAction(fundedwallet);
task( "generate",
  "Create a mnemonic for builder deploys",
).setAction(generate);

task("mineContractAddress",
  "Looks for a deployer account that will give leading zeros"
).addParam("searchFor", "String to search for")
  .setAction(mineContractAddress);

task("account",
    "Get balance informations for the deployment account."
  ).setAction(async() => {    
    await account(config.networks);
  });

task("send", "Send ETH")
  .addParam("from", "From address or account index")
  .addOptionalParam("to", "To address or account index")
  .addOptionalParam("amount", "Amount to send in ether")
  .addOptionalParam("data", "Data included in transaction")
  .addOptionalParam("gasPrice", "Price you are willing to pay in gwei")
  .addOptionalParam("gasLimit", "Limit of how much gas to spend")

  .setAction(send);

task("balance", "Prints an account's balance")
  .addPositionalParam("account", "The account's address")
  .setAction(balance);

task("accounts", "Prints the list of accounts").setAction(accounts);

task("blockNumber", "Prints the block number").setAction(blockNumber);