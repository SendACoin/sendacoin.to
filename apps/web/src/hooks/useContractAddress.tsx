import { contractAddresses } from 'constants/index';
import { useNetwork } from 'wagmi';

const useContractAddress = () => {
	const { chain, chains } = useNetwork();

	const chainId = chain?.id ?? 80001;
	const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

	return {
		contractAddress,
	};
};

export default useContractAddress;
