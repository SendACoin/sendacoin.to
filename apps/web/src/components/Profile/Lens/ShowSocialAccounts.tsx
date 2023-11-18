import { Link2Icon } from '@radix-ui/react-icons';
import { formatUrl } from 'libs/helpers';
import React from 'react';

const ShowSocialAccounts = ({ attributes = [], profileId = null, profileAddress }) => {
	return (
		<div className="flex items-center justify-center space-x-5 mt-2">
			{profileId ? (
				<>
					{attributes.map((attribute) => {
						return (
							<React.Fragment key={attribute.key}>
								{
									{
										twitter: (
											<a
												className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
												target="_BLANK"
												rel="noopener noreferrer"
												href={`https://twitter.com/${attribute.value}`}
											>
												<img src="/assets/images/twitter.svg" className="w-4 h-4" alt="" />
											</a>
										),
										website: (
											<a
												className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
												target="_BLANK"
												rel="noopener noreferrer"
												href={`${formatUrl(attribute.value)}`}
											>
												<Link2Icon />
											</a>
										),
										app: (
											<a
												className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
												target="_BLANK"
												rel="noopener noreferrer"
												href={`https://hey.xyz/u/${profileId.replace('.lens', '')}`}
											>
												<img src="/assets/images/hey.png" className="w-4 h-4" alt="" />
											</a>
										),
									}[attribute.key]
								}
							</React.Fragment>
						);
					})}
					<a
						className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
						target="_BLANK"
						rel="noopener noreferrer"
						href={`https://tape.xyz/u/${profileId.replace('.lens', '')}`}
					>
						<img src="/assets/images/tape.svg" className="w-4 h-4" alt="" />
					</a>
				</>
			) : null}
			<a
				className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
				target="_BLANK"
				rel="noopener noreferrer"
				href={`https://opensea.io/${profileAddress}`}
			>
				<img
					src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg"
					className="w-4 h-4"
					alt=""
				/>
			</a>
		</div>
	);
};

export default ShowSocialAccounts;
