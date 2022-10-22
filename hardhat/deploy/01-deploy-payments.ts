import { network } from 'hardhat';
import { developmentChains } from '../helper-hardhat-config';
import verify from '../utils/verify';


const func = async ({ getNamedAccounts, deployments }: any) => {

	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const sacPayments = await deploy('SacPayments', {
		from: deployer,
		args: [],
		log: true,
		// we need to wait if on a live network so we can verify properly
		waitConfirmations: (network.config as any).blockConfirmations || 2,
	});


	log(`SacPayments (${network.config.chainId}) deployed at ${sacPayments.address}`);


	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		await verify(sacPayments.address, []);
	}
};


export default func;

func.id = "sac_payments";
func.tags = ["all", 'payments'];
