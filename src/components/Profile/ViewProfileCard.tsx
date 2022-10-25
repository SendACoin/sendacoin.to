import { formatImageUrl } from 'libs/helpers';
import Link from 'next/link';

const ViewProfileCard = ({ profile }) => {
	return (
		<Link
			key={profile.id}
			href={`${profile.handle}`}
			passHref
			className="border rounded-lg p-1.5 flex items-center bg-white"
		>
			<img
				src={formatImageUrl(profile?.picture?.original?.url)}
				className="rounded-md w-10 h-10 mr-2 object-cover bg-gray-50"
			/>
			<div className="text-sm">
				{profile.name ?? profile.handle}
				<p className="text-xs w-60 text-gray-500 truncate">{profile.bio}</p>
			</div>
		</Link>
	);
};
export default ViewProfileCard;
