import Link from 'next/link';
import { useQuery } from 'urql';
import { RecommendProfiles } from 'graphql/queries';
import { useEffect, useState } from 'react';
import { formatImageUrl } from 'libs/helpers';

const RecommendedProfiles = () => {
	const [profiles, setProfiles] = useState([]);
	const [result, reexecuteQuery] = useQuery({
		query: RecommendProfiles,
		variables: {},
	});

	useEffect(() => {
		if (result && result.data) {
			setProfiles(result.data.recommendedProfiles.slice(0, 8));
		}
	}, [result]);

	console.log(result.data);

	if (result.fetching || result.data == null) return null;

	return (
		<div className="mt-14 px-5 md:px-0">
			<h5 className="mb-5 block">Recommended Profiles</h5>

			<div className="grid md:grid-cols-4 gap-3">
				{profiles.map((profile) => (
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
		</div>
	);
};

export default RecommendedProfiles;
