import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { GetProfilesQuery } from 'graphql/queries';
import React, { useEffect, useState } from 'react';
import { Button, NumberInput, Select, Tabs, Textarea } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatImageUrl } from 'libs/helpers';

import Settings from '../../../config';
import Image from 'next/image';
import toast from 'react-hot-toast';
import PageTitle from 'components/Layout/PageTitle';
import Spinner from 'components/Spinner';
import ShowSocialAccounts from 'components/Profile/Lens/ShowSocialAccounts';
import ShowPost from 'components/Profile/Lens/ShowPost';
import ShowNFTs from 'components/Profile/Lens/ShowNFTs';
import ProfileCard from '../ProfileCard';

dayjs.extend(relativeTime);

const LensProfile = ({ profileId }) => {
	const [profile, setProfile] = useState(null);
	const router = useRouter();

	const [result, reexecuteQuery] = useQuery({
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
		<Spinner loading={profile ? false : true}>
			{profile ? (
				<>
					<div className="pt-8 pb-10">
						<PageTitle title={router.query.profile} />

						<div
							className="mx-auto max-w-screen-xl  relative bg-white border rounded-lg"
							style={{ width: '500px' }}
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
										className="rounded-full w-32 h-32 border-3"
									/>
								</div>
							</div>

							<div className="text-center mt-14 mb-5">
								<b className="text-xl">{profile.name}</b>
								<p className="text-gray-500 text-sm">{profile.bio}</p>
								<p className="text-gray-500 space-x-5 text-sm mt-2">
									<span>{profile.stats.totalFollowers} Followers</span>
									<span>{profile.stats.totalFollowing} Following</span>
								</p>

								<ShowSocialAccounts attributes={profile.attributes} />
							</div>

							<div className="gap-5 mb-8 px-5">
								<Tabs color="dark" variant="pills" defaultValue="tip">
									<div className="grid place-items-center">
										<Tabs.List>
											<Tabs.Tab value="tip">Tip</Tabs.Tab>
											<Tabs.Tab value="posts">Posts</Tabs.Tab>
											<Tabs.Tab value="nfts">NFTs</Tabs.Tab>
										</Tabs.List>
									</div>

									<Tabs.Panel value="tip" pt="xs">
										<ProfileCard>
											<h4 className="font-bold">Buy a Coffee for {profile.name}</h4>

											<form className="space-y-3 mt-5">
												<div className="grid grid-cols-12 gap-5">
													<Select className="col-span-4" label="Coin" data={[]} />

													<NumberInput label="Amount" value={0.1} className="col-span-8" />
												</div>

												<Textarea placeholder="Your Message" />

												<Button color="dark" variant="outline" fullWidth>
													Tip
												</Button>
											</form>
										</ProfileCard>
									</Tabs.Panel>

									<Tabs.Panel value="posts" pt="xs">
										<ProfileCard>
											<ShowPost id={profile.id} />
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
					</div>
				</>
			) : null}
		</Spinner>
	);
};

export default LensProfile;
