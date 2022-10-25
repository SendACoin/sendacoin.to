import { useQuery } from 'urql';
import { RecommendProfiles } from 'graphql/queries';
import { useEffect, useState } from 'react';
import ViewProfileCard from 'components/Profile/ViewProfileCard';

const RecommendedProfiles = () => {
	const [profiles, setProfiles] = useState([]);
	const [result] = useQuery({
		query: RecommendProfiles,
		variables: {},
	});

	useEffect(() => {
		if (result && result.data) {
			setProfiles(result.data.recommendedProfiles.slice(0, 8));
		}
	}, [result]);

	if (result.fetching || result.data == null) return null;

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
