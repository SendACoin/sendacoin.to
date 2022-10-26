import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const ProfileFooter = ({ address }) => {
	const router = useRouter();

	return (
		<div className="text-center pt-3 text-xs text-gray-500 space-x-5 flex items-center justify-center">
			<CopyToClipboard
				text={`https://sendacoin.to/${router.asPath}`}
				onCopy={() => toast.success('Profile URL Copied!')}
			>
				<a className="cursor-pointer hover:text-gray-900">share</a>
			</CopyToClipboard>

			<CopyToClipboard text={address} onCopy={() => toast.success('Copied!')}>
				<a className="cursor-pointer hover:text-gray-900">copy address</a>
			</CopyToClipboard>

			<a
				target="_BLANK"
				href={`https://polygonscan.com/address/${address}`}
				className="cursor-pointer hover:text-gray-900"
				rel="noreferrer noopener"
			>
				view explorer
			</a>
		</div>
	);
};

export default ProfileFooter;
