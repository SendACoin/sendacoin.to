import { RecommendProfiles } from 'graphql/queries';
import { formatImageUrl } from 'libs/helpers';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

const AvatarPositions = [
	{
		top: '-180px',
		left: '0px',
	},
	{
		top: '100px',
		left: '60px',
	},
	{
		top: '-41px',
		left: '66px',
	},
	{
		top: '-75px',
		left: '215px',
	},
	{
		top: '-220px',
		left: '200px',
	},
	{
		top: '-144px',
		left: '400px',
	},
	{
		top: '38px',
		left: '304px',
	},
	{
		top: '-18px',
		left: '440px',
	},
];

export function randChoice<T>(arr: Array<T>): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

const profileIds = [
	'0xdeff',
	'0x632d',
	'0x0161e2',
	'0x01a860',
	'0x01b8ff',
	'0xce6d',
	'0x08ff',
	'0x01cc3e',
	'0x366a',
	'0xe8',
	'0x018981',
	'0x0182d8',
	'0x5db9',
	'0x0721',
	'0x01a152',
	'0xf3c8',
	'0x25bb',
	'0x2e2a',
	'0x0150ce',
	'0xa046',
	'0x015a38',
	'0x018df6',
	'0x01b356',
	'0xb1ff',
	'0xdd33',
	'0x6037',
	'0xd3eb',
	'0x2f38',
	'0x3a77',
	'0x2552',
	'0x01837b',
	'0x014472',
	'0x03',
	'0x1daa',
	'0x014dd7',
	'0x0155a4',
	'0x9346',
	'0xcf6d',
	'0x0166e6',
	'0x7cca',
	'0x01b139',
	'0x04ac',
	'0xbf42',
	'0x81a1',
	'0x019d96',
	'0x019e96',
	'0x5d25',
	'0x017655',
	'0x013cee',
	'0x9760',
];

const CreatorAvatars = () => {
	const [profiles, setProfiles] = useState([]);
	const [result] = useQuery({
		query: RecommendProfiles,
		variables: {
			request: {
				profileIds: profileIds,
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
		<div className="w-full hidden md:block h-full">
			{profiles.map((profile, index) => (
				<Link
					key={profile.id}
					href={`${profile.handle}`}
					passHref
					className={`border rounded-full p-1 items-center bg-white`}
					style={{
						top: `${AvatarPositions[index].top}`,
						left: `${AvatarPositions[index].left}`,
						position: 'absolute',
					}}
				>
					<img
						src={formatImageUrl(profile?.picture?.original?.url)}
						className="rounded-full w-20 h-20  object-cover bg-gray-50"
					/>
				</Link>
			))}
		</div>
	);
};

export default CreatorAvatars;
