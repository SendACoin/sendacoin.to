import { useQuery } from 'urql';
import { GetNfts } from 'graphql/queries';
import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatImageUrl, isEmpty } from 'libs/helpers';

dayjs.extend(relativeTime);

const ShowNFTs = ({ ownerAddress }) => {
	const [nfts, setNFT] = useState([]);
	const [result] = useQuery({
		query: GetNfts,
		variables: {
			address: ownerAddress,
		},
	});

	useEffect(() => {
		if (result && result.data && result.data.nfts) {
			setNFT(result.data.nfts.items);
		}
	}, [result]);

	return (
		<div>
			{isEmpty(nfts) ? (
				<p className="text-gray-500 text-center text-sm">user doesn{"'"}t have a NFT yet!</p>
			) : null}
			<div className="grid grid-cols-2 gap-2">
				{nfts.map((nft) => (
					<article key={nft.originalContent.uri} className="bg-white rounded-lg p-2 mb-1 border">
						{nft.originalContent.uri ? (
							<img
								height={125}
								className="rounded-lg mb-2 bg-gray-100"
								src={formatImageUrl(nft.originalContent.uri)}
								alt=""
							/>
						) : null}
						<p className="text-xs">{nft.name}</p>
					</article>
				))}
			</div>
		</div>
	);
};

export default ShowNFTs;
