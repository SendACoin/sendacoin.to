import { abi, contractAddresses } from 'constants/index';
import { ethers } from 'ethers';
import { formatNumber } from 'libs/helpers';
import { useContractRead } from 'wagmi';

const ProfileTipsStats = ({ ownerAddress }) => {
	const chainId = 80001;
	const tipAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

	const { data, isError, isLoading } = useContractRead({
		address: tipAddress,
		abi: abi,
		functionName: 'totalDonated',
		args: [ownerAddress],
	});

	const {
		data: received,
		isLoading: isReceivedLoading,
		isError: isReceivedError,
	} = useContractRead({
		address: tipAddress,
		abi: abi,
		functionName: 'totalReceived',
		args: [ownerAddress],
	});

	return (
		<>
			<span>
				<span className="text-gray-900 mr-1">
					{!isLoading && !isError ? String(formatNumber(ethers.utils.formatEther((data as any)._hex))) : '-'}
				</span>
				Donated
			</span>
			<span>
				<span className="text-gray-900 mr-1">
					{!isReceivedLoading && !isReceivedError
						? String(formatNumber(ethers.utils.formatEther((received as any)._hex)))
						: '-'}{' '}
				</span>
				Received
			</span>
		</>
	);
};

export default ProfileTipsStats;
