import Card from 'components/Layout/Card';
import { abi } from 'constants/index';
import { ethers } from 'ethers';
import { UserProfile } from 'graphql/queries';
import { formatNumber, isEmpty, shortenAddress } from 'libs/helpers';
import { useQuery } from 'urql';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { useAccount, useContractRead } from 'wagmi';
import PageTitle from 'components/Layout/PageTitle';
import useContractAddress from 'hooks/useContractAddress';

const StatsCard = ({ label, value }) => {
	return (
		<div className="bg-gray-50 border p-2 rounded-lg">
			<p className="text-sm text-gray-500 mb-1">{label}</p>
			<b>{value ? String(formatNumber(ethers.utils.formatEther((value as any)._hex))) : '-'} </b>
			<span className="text-sm text-gray-500">Polygon</span>
		</div>
	);
};

const FeedItem = ({ feed }) => {
	const [result] = useQuery({
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
					{feed[1] ? String(ethers.utils.formatEther((feed[1] as any)._hex)) : '-'}
					<img
						src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/matic.svg"
						alt=""
						className="w-4 h-4 ml-2"
					/>
				</span>
			</div>

			<p className="text-base">{feed[2]}</p>

			<div className="space-x-5">
				<a
					target="_BLANK"
					rel="noreferrer noopener"
					className="text-sm text-gray-500 hover:text-gray-900"
					href={`https://polygonscan.com/address/${feed[0]}`}
				>
					View on polygonscan
				</a>
				<CopyToClipboard text={feed[0]} onCopy={() => toast.success('Copied!')}>
					<a className="text-sm cursor-pointer text-gray-500 hover:text-gray-900">Copy address</a>
				</CopyToClipboard>
			</div>
		</div>
	);
};

const Dashboard = () => {
	const { contractAddress } = useContractAddress();

	const { address } = useAccount();

	const {
		data: tipHistory,
		isError: tipHistoryError,
		isLoading: tipHistoryLoading,
	} = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: 'getTipsHistory',
		args: [address],
	});

	const {
		data: donated,
		isError: donatedError,
		isLoading: donatedLoading,
	} = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: 'totalDonated',
		args: [address],
	});

	const {
		data: received,
		isLoading: isReceivedLoading,
		isError: isReceivedError,
	} = useContractRead({
		address: contractAddress,
		abi: abi,
		functionName: 'totalReceived',
		args: [address],
	});

	return (
		<section className="w-full bg-gradient-to-b ">
			<PageTitle title={'Dashboard'} />

			<Card title="Dashboard">
				<div className="grid md:grid-cols-5 gap-5 mt-5">
					<StatsCard label="Donated" value={donated} />
					<StatsCard label="Received" value={received} />
				</div>

				<div className="mt-10">
					<div className="font-medium mb-4">History</div>
					{tipHistoryLoading && tipHistory ? (
						'Loading'
					) : (
						<>
							{isEmpty(tipHistory) ? (
								<>
									<p className="text-gray-500 text-center text-sm">Your Tip{"'"}s Feed is Empty! </p>
								</>
							) : (
								<>
									{tipHistory && (
										<>
											{(tipHistory as [])?.map((feed) => (
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
			</Card>
		</section>
	);
};

export default Dashboard;
