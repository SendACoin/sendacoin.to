import { formatImageUrl } from 'libs/helpers';
import Link from 'next/link';

const ViewProfileCard = ({ profile }) => {
	return (
		<Link
			key={profile.id}
			href={`${profile.handle}`}
			passHref
			className="border rounded-lg p-1.5 grid grid-cols-3 items-center bg-white"
		>
			<img
				src={formatImageUrl(profile?.picture?.original?.url)}
				className="rounded-md w-20 h-20 mr-2 object-cover bg-gray-50"
			/>
			<div className="text-sm col-span-2">
				<span className="text-[#000] font-medium">{profile.name ?? profile.handle}</span>
				<p className="text-xs  text-gray-500 line-clamp-3">{profile.bio}</p>
			</div>
		</Link>
	);
};
export default ViewProfileCard;
