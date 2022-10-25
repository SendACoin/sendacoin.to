import { contractAddresses } from 'constants/index';
import { useProvider } from 'wagmi';

const useContractAddress = () => {
	const provider = useProvider();

	const chainId = provider._network.chainId ?? 80001;
	const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

	return {
		contractAddress,
	};
};

export default useContractAddress;
