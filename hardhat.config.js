require("@nomicfoundation/hardhat-toolbox");

const NEXT_PUBLIC_RPC_URL = "https://rpc.ankr.com/eth_holesky";
const NEXT_PUBLIC_PRIVATE_KEY =
  "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      evmVersion: "london",
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    besu_local: {
      gas: -1,
      gasPrice: 0,
      url: "http://localhost:8545", // Besu RPC URL (or your custom one)
      accounts: [
        `0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3`,
      ], // Your wallet private key (make sure it's in an .env file)
    },
    localhost: {
      gas: 1000000000000000,
      gasPrice: 0,
      chainId: 1337,
      url: "http://127.0.0.1:8545", // Besu local RPC (if that's where Besu is running)
      accounts: [
        `0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3`,
      ],
    },
  },
};
