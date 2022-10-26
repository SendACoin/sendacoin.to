import Card from 'components/Layout/Card';
import PageTitle from 'components/Layout/PageTitle';
import ViewProfileCard from 'components/Profile/ViewProfileCard';
import Spinner from 'components/Spinner';
import { ExploreProfiles } from 'graphql/queries';

import { useState } from 'react';
import { useQuery } from 'urql';

const filterModes = [
	'CREATED_ON',
	'MOST_FOLLOWERS',
	'LATEST_CREATED',
	'MOST_POSTS',
	'MOST_COMMENTS',
	'MOST_MIRRORS',
	'MOST_PUBLICATION',
	'MOST_COLLECTS',
];

const Explore = () => {
	const [filterMode, setFilterMode] = useState('MOST_FOLLOWERS');
	const [result] = useQuery({
		query: ExploreProfiles,
		variables: {
			request: { sortCriteria: filterMode },
		},
	});

	return (
		<section className="w-full bg-gradient-to-b">
			<PageTitle title={'Explore'} />

			<Card title="Explore">
				<div className="flex  flex-grow  overflow-x-scroll md:flex-wrap space-x-2 mt-5 w-full">
					{filterModes.map((mode) => (
						<div
							onClick={() => setFilterMode(mode)}
							key={mode}
							className={`capitalize  ${
								filterMode === mode ? 'text-gray-900' : 'text-gray-500'
							} cursor-pointer flex-1 text-center hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 border rounded-full text-sm `}
						>
							{mode.toLocaleLowerCase().replace('_', ' ')}
						</div>
					))}
				</div>
				<Spinner loading={result.fetching}>
					<div className="mt-5 text-gray-500">
						<div className="grid md:grid-cols-4 gap-3">
							{result.data?.exploreProfiles?.items.map((profile) => (
								<ViewProfileCard profile={profile} key={profile.handle} />
							))}
						</div>
					</div>
				</Spinner>
			</Card>
		</section>
	);
};

export default Explore;
