import { Fetcher,Token } from "@uniswap/sdk";

// todo 
const pair = async (params: any, {hre, network}) => {
  console.log(network.config.chainId);
  
  const token0 = new Token(network.config.chainId, params.t0, 18);
  const token1 = new Token(network.config.chainId, params.t1, 18);

  const pair = await Fetcher.fetchPairData(
    token0, 
    token1,
  );
  console.log(`The address of the ${token0.symbol}-${token1.symbol} pair is ${pair.address}`);

}

export default pair;