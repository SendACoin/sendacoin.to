import Card from 'components/Layout/Card';
import PageTitle from 'components/Layout/PageTitle';
import Spinner from 'components/Spinner';
import { ExploreProfiles } from 'graphql/queries';
import { formatImageUrl } from 'libs/helpers';
import Link from 'next/link';
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
	const [result, reexecuteQuery] = useQuery({
		query: ExploreProfiles,
		variables: {
			request: { sortCriteria: filterMode },
		},
	});

	console.log(result);

	return (
		<section className="w-full bg-gradient-to-b">
			<PageTitle title={'Explore'} />

			<Card title="Explore">
				<div className="flex flex-wrap space-x-2 mt-5">
					{filterModes.map((mode) => (
						<div
							onClick={() => setFilterMode(mode)}
							key={mode}
							className={`capitalize ${
								filterMode === mode ? 'text-gray-900' : 'text-gray-500'
							} cursor-pointer hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-2 border rounded-full text-sm`}
						>
							{mode.toLocaleLowerCase().replace('_', ' ')}
						</div>
					))}
				</div>
				<Spinner loading={result.fetching}>
					<p className="mt-5 text-gray-500">
						<div className="grid md:grid-cols-4 gap-3">
							{result.data?.exploreProfiles?.items.map((profile) => (
								<Link key={profile.id} href={`${profile.handle}`} passHref>
									<a className="border rounded-lg p-1.5 flex items-center bg-white">
										<img
											src={formatImageUrl(profile?.picture?.original?.url)}
											className="rounded-md w-10 h-10 mr-2 object-cover bg-gray-50"
										/>
										<div className="text-sm">
											{profile.name ?? profile.handle}
											<p className="text-xs w-60 text-gray-500 truncate">{profile.bio}</p>
										</div>
									</a>
								</Link>
							))}
						</div>
					</p>
				</Spinner>
			</Card>
		</section>
	);
};

export default Explore;
