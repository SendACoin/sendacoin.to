import { CopyIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const ShareButton = ({ name, url }) => {
	return (
		<>
			<a
				href={url}
				target="_BLANK"
				rel="noreferrer noopener"
				type="button"
				className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				{name == 'twitter' && <TwitterLogoIcon className="mr-1" />}
				Share
			</a>
		</>
	);
};

const Owner = () => {
	const router = useRouter();

	return (
		<div>
			<div className="flex justify-between items-center">
				<h4 className="font-bold flex items-center mb-5">
					hey
					<img src="https://twemoji.maxcdn.com/svg/1f44b.svg" className="w-4 h-4 ml-2" />
				</h4>
			</div>

			<p className="text-gray-500 mb-5">
				Share your profile ! Through this profile page, other users can tip you.
			</p>
			<div className="space-x-3">
				<ShareButton
					name="twitter"
					url={`https://twitter.com/intent/tweet?text=Hey%20%0A%0Ahttps%3A%2F%2Fsendacoin.to${router.asPath}`}
				/>
				<CopyToClipboard text={`https://sendacoin.to${router.asPath}`} onCopy={() => toast.success('Copied!')}>
					<a
						onClick={() => {}}
						type="button"
						className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
					>
						<CopyIcon className="mr-1" />
						Copy
					</a>
				</CopyToClipboard>
			</div>
		</div>
	);
};

export default Owner;
