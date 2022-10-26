import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-deploy'
import 'solidity-coverage'
import 'hardhat-gas-reporter'
import 'hardhat-contract-sizer'
import 'dotenv/config'

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MAINNET_RPC_URL =
	process.env.MAINNET_RPC_URL ||
	process.env.ALCHEMY_MAINNET_RPC_URL ||
	'https://eth-mainnet.alchemyapi.io/v2/your-api-key';
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || 'https://eth-goerli.alchemyapi.io/v2/your-api-key';
const POLYGON_MAINNET_RPC_URL =
	process.env.POLYGON_MAINNET_RPC_URL || 'https://polygon-mainnet.alchemyapi.io/v2/your-api-key';
const PRIVATE_KEY = process.env.PRIVATE_KEY || '0x';



// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || 'Your etherscan API key';
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || 'Your polygonscan API key';
const REPORT_GAS = process.env.REPORT_GAS || false;

const config: HardhatUserConfig = {
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {
			chainId: 31337,
		},
		localhost: {
			chainId: 31337,
		},
		goerli: {
			url: GOERLI_RPC_URL,
			accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
			saveDeployments: true,
			chainId: 80001,
		},
		mainnet: {
			url: MAINNET_RPC_URL,
			accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
			saveDeployments: true,
			chainId: 137,
		},
		polygon: {
			url: POLYGON_MAINNET_RPC_URL,
			accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
			saveDeployments: true,
			chainId: 137,
		},
	},
	etherscan: {
		// yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
		apiKey: {
			goerli: ETHERSCAN_API_KEY,
			polygonMumbai: POLYGONSCAN_API_KEY,
			polygon: POLYGONSCAN_API_KEY,
		},
	},
	gasReporter: {
		enabled: Boolean(REPORT_GAS),
		currency: 'USD',
		outputFile: 'gas-report.txt',
		noColors: true,
		// coinmarketcap: process.env.COINMARKETCAP_API_KEY,
	},
	contractSizer: {
		runOnCompile: false,
		only: ['Payments'],
	},
	namedAccounts: {
		deployer: {
			default: 0, // here this will by default take the first account as deployer
			1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
		},
		player: {
			default: 1,
		},
	},
	solidity: {
		compilers: [
			{
				version: '0.8.7',
			},
			{
				version: '0.4.24',
			},
		],
	},
	mocha: {
		timeout: 500000, // 500 seconds max for running tests
	},
};

export default config;
