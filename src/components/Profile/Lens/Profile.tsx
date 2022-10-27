import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { GetProfilesQuery } from 'graphql/queries';
import React, { useEffect, useState } from 'react';
import { Tabs } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatImageUrl } from 'libs/helpers';
import Linkify from 'react-linkify';

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
import ProfileRevenue from './ProfileRevenue';
import Head from 'next/head';

dayjs.extend(relativeTime);

const LensProfile = ({ profileId }) => {
	const { address } = useAccount();
	const [profile, setProfile] = useState(null);
	const router = useRouter();

	const [result] = useQuery({
		query: GetProfilesQuery,
		variables: {
			request: {
				handle: profileId,
			},
		},
	});

	useEffect(() => {
		if (result && router.isReady) {
			if (result.data == undefined && result.fetching !== true) {
				router.push('/');
				toast.error('Profile not found');
			}

			if (result.data && result.data.profile) {
				setProfile(result.data.profile);
			}
		}
	}, [result]);

	return (
		<>
			<PageTitle title={profileId} ogImage={`https://sendacoin.to/api/og?handle=${profileId}`} />

			<Spinner loading={profile ? false : true}>
				{profile ? (
					<>
						<div className="pt-3 md:pt-8 pb-10">
							<PageTitle title={router.query.profile} />

							<div
								className="mx-auto max-w-screen-xl  relative bg-white border rounded-lg"
								style={{ maxWidth: '500px' }}
							>
								<div
									className="bg-gray-100 rounded-t-lg relative w-full h-32 "
									style={{
										background: `url('${formatImageUrl(
											profile.coverPicture?.original?.url,
											Settings.defaultCoverPicture
										)}')`,
									}}
								>
									<div className="absolute avatar_wrapper" style={{ right: '38%', top: '45px' }}>
										<Image
											src={`${formatImageUrl(
												profile.picture?.original?.url,
												Settings.defaultProfilePicture
											)}`}
											alt=""
											width={125}
											height={125}
											className="rounded-full w-32 h-32 border-3 object-cover	bg-gray-50"
										/>
									</div>
								</div>

								<div className="text-center mt-14 mb-5">
									<b className="text-xl">{profile.name ?? profile.handle}</b>
									<p className="text-gray-500 text-sm mt-2 p-1">
										<Linkify
											componentDecorator={(decoratedHref, decoratedText, key) => (
												<a
													target="_blank"
													rel="noreferrer noopener"
													className="hover:text-gray-900"
													href={decoratedHref}
													key={key}
												>
													{decoratedText}
												</a>
											)}
										>
											{profile.bio}
										</Linkify>
									</p>
									<p className="text-gray-500 space-x-5 text-sm mt-2">
										<span>
											<span className="text-gray-900 mr-1">{profile.stats.totalFollowers}</span>{' '}
											Followers
										</span>
										<span>
											<span className="text-gray-900 mr-1">{profile.stats.totalFollowing}</span>{' '}
											Following
										</span>
										{address ? <ProfileTipsStats ownerAddress={profile.ownedBy} /> : null}

										<ProfileRevenue profileId={profile.id} />
									</p>
									<ShowSocialAccounts
										profileId={profileId}
										attributes={profile.attributes}
										profileAddress={profile.ownedBy}
									/>
								</div>

								<div className="gap-5 mb-8 px-2 md:px-5">
									<Tabs color="dark" variant="pills" defaultValue="tip">
										<div className="grid place-items-center">
											<Tabs.List>
												<Tabs.Tab value="tip">
													{address == profile.ownedBy ? 'About' : 'Tip'}
												</Tabs.Tab>
												{address ? <Tabs.Tab value="feed">Feed</Tabs.Tab> : null}
												<Tabs.Tab value="posts">Posts</Tabs.Tab>
												<Tabs.Tab value="blog">Blog</Tabs.Tab>
												<Tabs.Tab value="nfts">NFTs</Tabs.Tab>
											</Tabs.List>
										</div>

										<Tabs.Panel value="tip" pt="xs">
											<ProfileCard>
												{profile.ownedBy ? (
													<Tip name={profile.name} ownerAddress={profile.ownedBy} />
												) : null}
											</ProfileCard>
										</Tabs.Panel>

										<Tabs.Panel value="feed" pt="xs">
											{address ? (
												<ProfileCard>
													{profile.ownedBy ? <Feed ownerAddress={profile.ownedBy} /> : null}
												</ProfileCard>
											) : null}
										</Tabs.Panel>
										<Tabs.Panel value="posts" pt="xs">
											<ProfileCard>
												<ShowPost id={profile.id} />
											</ProfileCard>
										</Tabs.Panel>
										<Tabs.Panel value="blog" pt="xs">
											<ProfileCard>
												<BlogPost address={profile.ownedBy} />
											</ProfileCard>
										</Tabs.Panel>
										<Tabs.Panel value="nfts" pt="xs">
											<ProfileCard>
												<ShowNFTs ownerAddress={profile.ownedBy} />
											</ProfileCard>
										</Tabs.Panel>
									</Tabs>
								</div>
							</div>
							<ProfileFooter address={profile.ownedBy} />
						</div>
					</>
				) : null}
			</Spinner>
		</>
	);
};

export default LensProfile;
