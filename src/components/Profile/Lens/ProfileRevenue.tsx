import { GetProfilesRevenueQuery } from 'graphql/queries';
import React from 'react';
import { useQuery } from 'urql';
import { Tooltip } from 'react-tippy';

const revenueAssetsLabel = (revenues) => {
	let label = '';

	revenues.forEach((asset) => {
		label += ` ${asset.total.value} ${asset.total.asset.symbol}`;
	});

	return label;
};

const ProfileRevenue = ({ profileId }) => {
	const [result] = useQuery({
		query: GetProfilesRevenueQuery,
		variables: {
			request: {
				profileId: profileId,
			},
		},
	});

	if (result.fetching) return null;

	if (result.data.profileFollowRevenue.revenues.length == 0) return null;

	return (
		<>
			{/* @ts-ignore */}
			<Tooltip
				position="bottom"
				sticky={false}
				trigger="mouseenter"
				size="small"
				arrowSize={'small'}
				offset={10}
				title={`${revenueAssetsLabel(result.data.profileFollowRevenue.revenues)}`}
			>
				<span>
					<span className="text-gray-900 mr-1">{result.data.profileFollowRevenue.revenues.length}</span>
					Assets from Followers
				</span>
			</Tooltip>
		</>
	);
};

export default ProfileRevenue;
