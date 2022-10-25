import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { GetProfilesQuery } from 'graphql/queries';
import React, { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatImageUrl, shortenAddress } from 'libs/helpers';
import Avatar from 'boring-avatars';

import Settings from '../../../config';
import Image from 'next/image';
import toast from 'react-hot-toast';
import PageTitle from 'components/Layout/PageTitle';
import Spinner from 'components/Spinner';
import ShowSocialAccounts from 'components/Profile/Lens/ShowSocialAccounts';
import ShowPost from 'components/Profile/Lens/ShowPost';
import ShowNFTs from 'components/Profile/Lens/ShowNFTs';
import ProfileCard from '../ProfileCard';
import Tip from '../Tip';
import Feed from '../Feed';
import ProfileFooter from '../ProfileFooter';
import { useAccount } from 'wagmi';
import ProfileTipsStats from '../ProfileTipsStats';
import BlogPost from '../BlogPost';

dayjs.extend(relativeTime);

const EthProfile = ({ profileAddress }) => {
	const { address } = useAccount();

	useEffect(() => {}, []);

	return (
		<Spinner loading={false}>
			<div className="pt-3 md:pt-8 pb-10">
				<PageTitle title={shortenAddress(profileAddress)} />

				<div
					className="mx-auto max-w-screen-xl  relative bg-white border rounded-lg"
					style={{ maxWidth: '500px' }}
				>
					<div className="bg-gray-100 rounded-t-lg relative w-full h-32 ">
						<div className="absolute avatar_wrapper" style={{ right: '38%', top: '45px' }}>
							<Avatar
								size={125}
								name={profileAddress}
								variant="beam"
								colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
							/>
						</div>
					</div>

					<div className="text-center mt-14 mb-5">
						<b className="text-xl">{shortenAddress(profileAddress)}</b>
						{/* <p className="text-gray-500 text-sm mt-2 p-1">{profile.bio}</p> */}
						<p className="text-gray-500 space-x-5 text-sm mt-2">
							{address ? <ProfileTipsStats ownerAddress={profileAddress} /> : null}
						</p>
					</div>

					<div className="gap-5 mb-8 px-2 md:px-5">
						<Tabs color="dark" variant="pills" defaultValue="tip">
							<div className="grid place-items-center">
								<Tabs.List>
									<Tabs.Tab value="tip">{address == profileAddress ? 'About' : 'Tip'}</Tabs.Tab>
									{address ? <Tabs.Tab value="feed">Feed</Tabs.Tab> : null}
									<Tabs.Tab value="blog">Blog</Tabs.Tab>
									<Tabs.Tab value="nfts">NFTs</Tabs.Tab>
								</Tabs.List>
							</div>

							<Tabs.Panel value="tip" pt="xs">
								<ProfileCard>
									{profileAddress ? <Tip name="" ownerAddress={profileAddress} /> : null}
								</ProfileCard>
							</Tabs.Panel>

							<Tabs.Panel value="feed" pt="xs">
								{address ? (
									<ProfileCard>
										{profileAddress ? <Feed ownerAddress={profileAddress} /> : null}
									</ProfileCard>
								) : null}
							</Tabs.Panel>
							<Tabs.Panel value="blog" pt="xs">
								<ProfileCard>
									<BlogPost address={profileAddress} />
								</ProfileCard>
							</Tabs.Panel>
							<Tabs.Panel value="nfts" pt="xs">
								<ProfileCard>
									<ShowNFTs ownerAddress={profileAddress} />
								</ProfileCard>
							</Tabs.Panel>
						</Tabs>
					</div>
				</div>
				<ProfileFooter address={profileAddress} />
			</div>
		</Spinner>
	);
};

export default EthProfile;