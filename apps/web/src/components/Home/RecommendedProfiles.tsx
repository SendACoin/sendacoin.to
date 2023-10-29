import ViewProfileCard from 'components/Profile/ViewProfileCard';
import { RecommendProfiles } from 'graphql/queries';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

const RecommendedProfiles = () => {
	const [profiles, setProfiles] = useState([]);
	const [result] = useQuery({
		query: RecommendProfiles,
		variables: {
			request: {
				profileIds: [
					'0xcf6d',
					'0x0161e2',
					'0x01a6e5',
					'0x0166e6',
					'0x366a',
					'0x019d11',
					'0x0182d8',
					'0xf6c2',
					'0x01b8ff',
					'0x84b5',
					'0x019d96',
					'0x632d',
					'0x3a77',
					'0x2e2a',
					'0x9760',
					'0x7cca',
					'0x28f2',
					'0x0875',
					'0x1113',
					'0x013cee',
					'0x015a38',
					'0x06da',
					'0xce6d',
					'0x21ad',
					'0x0155a4',
					'0x4c83',
					'0xeca7',
					'0x01615e',
					'0x01b356',
					'0x03',
					'0x5db9',
					'0xbf42',
					'0x81a1',
					'0x014472',
					'0x5866',
					'0x20f5',
					'0x04ac',
					'0x01cc3e',
					'0x0150ce',
					'0x0bbc',
					'0xf5fe',
					'0xa7bb',
					'0x6037',
					'0xdeff',
					'0x9346',
					'0x1daa',
					'0x0721',
					'0xb1ff',
					'0xf3c8',
					'0x01a805',
				],
			},
		},
	});

	useEffect(() => {
		if (result && result.data) {
			setProfiles(result.data.profiles.items.slice(0, 8));
		}
	}, [result]);

	if (result.fetching || result.data == null || profiles.length === 0) return null;

	return (
		<div className="mt-14 px-5 md:px-0">
			<h5 className="mb-5 block">Recommended Profiles</h5>

			<div className="grid md:grid-cols-4 gap-3">
				{profiles.map((profile) => (
					<ViewProfileCard profile={profile} key={profile.handle} />
				))}
			</div>
		</div>
	);
};

export default RecommendedProfiles;
