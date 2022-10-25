import { useProvider } from 'wagmi';
import { useAccount } from 'wagmi';
import { abi } from 'constants/index';
import { useContractRead } from 'wagmi';
import { useState } from 'react';
import { isEmpty, shortenAddress } from 'libs/helpers';
import { ethers } from 'ethers';
import { useQuery } from 'urql';
import { UserProfile } from 'graphql/queries';
import useContractAddress from 'hooks/useContractAddress';

const FeedItem = ({ feed }) => {
	const [result, reexecuteQuery] = useQuery({
		query: UserProfile,
		variables: {
			request: {
				ownedBy: feed[0],
			},
		},
	});

	return (
		<div className="border bg-white rounded-lg p-2">
			<div className="flex justify-between items-center">
				<div className="text-sm">{shortenAddress(feed[0])}</div>

				<span className="text-gray-900 mr-1 bg-gray-100 rounded p-1 border text-xs flex items-center">
					{String(ethers.utils.formatEther((feed[1] as any)._hex))}
					<img
						src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/matic.svg"
						alt=""
						className="w-4 h-4 ml-2"
					/>
				</span>
			</div>

			<p className="text-base">{feed[2]}</p>
		</div>
	);
};

const Feed = ({ ownerAddress }) => {
	const [feeds, setFeeds] = useState([]);

	const provider = useProvider();
	const { address, connector } = useAccount();
	const { contractAddress } = useContractAddress();

	const { data, isError, isLoading } = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: 'getTipsHistory',
		args: [ownerAddress],
	});

	console.log(data);

	return (
		<div className="space-y-1">
			{isLoading && data ? (
				'Loading'
			) : (
				<>
					{isEmpty(data) ? (
						<>
							<p className="text-gray-500 text-center text-sm">Your Tip{"'"}s Feed is Empty! </p>
						</>
					) : (
						<>
							{data && (
								<>
									{(data as [])?.map((feed) => (
										<>
											<FeedItem feed={feed} key={feed[0]} />
										</>
									))}
								</>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Feed;
