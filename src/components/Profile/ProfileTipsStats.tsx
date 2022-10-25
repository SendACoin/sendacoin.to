import { abi } from 'constants/index';
import { ethers } from 'ethers';
import useContractAddress from 'hooks/useContractAddress';
import { formatNumber } from 'libs/helpers';
import { useContractRead } from 'wagmi';

const ProfileTipsStats = ({ ownerAddress }) => {
	const { contractAddress } = useContractAddress();

	const { data, isError, isLoading } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: 'totalDonated',
		args: [ownerAddress],
	});

	const {
		data: received,
		isLoading: isReceivedLoading,
		isError: isReceivedError,
	} = useContractRead({
		address: contractAddress,
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
