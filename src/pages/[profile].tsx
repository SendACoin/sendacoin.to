import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import { GetProfilesQuery, GetPosts } from 'graphql/queries';
import React, { useEffect, useState } from 'react';
import { Button, NumberInput, Select, Tabs, Textarea } from '@mantine/core';
import dayjs from 'dayjs';
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatImageUrl, formatUrl } from '../libs/helpers';
import Head from 'next/head';
import Settings from '../config';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

dayjs.extend(relativeTime);

const ShowSocialAccounts = ({ attributes = [] }) => {
	return (
		<div className="flex items-center justify-center space-x-5 mt-2">
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
										<TwitterLogoIcon />
									</a>
								),
								website: (
									<a
										className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
										target="_BLANK"
										rel="noopener noreferrer"
										href={`${formatUrl(attribute.value)}`}
									>
										<GlobeIcon />
									</a>
								),
								app: (
									<a
										className="text-gray-500 hover:text-gray-900 hover:bg-gray-100 px-2 py-2 rounded-lg"
										target="_BLANK"
										rel="noopener noreferrer"
										href={`https://lenster.xyz/u/${attribute.value}`}
									>
										<img src="/assets/images/lenster.svg" className="w-4 h-4" alt="" />
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
				href={`https://lenstube.xyz/USER`}
			>
				<img src="/assets/images/lenstube.svg" className="w-4 h-4" alt="" />
			</a>
		</div>
	);
};

const GetPost = ({ id }) => {
	const [posts, setPost] = useState([]);
	const [result, reexecuteQuery] = useQuery({
		query: GetPosts,
		variables: {
			id: id,
			limit: 10,
		},
	});

	useEffect(() => {
		if (result && result.data && result.data.publications) {
			setPost([...result.data.publications.items, ...result.data.publications.items]);
		}
	}, [result]);

	return (
		<div>
			{posts.map((post) => (
				<article key={post.id} className="bg-white rounded-lg p-2 mb-1">
					<p>{post.metadata.content}</p>
					<p className="text-sm text-gray-500">{dayjs(post.createdAt).fromNow()}</p>
				</article>
			))}
		</div>
	);
};

const Profile = (props) => {
	const [profile, setProfile] = useState(null);
	const router = useRouter();

	const [result, reexecuteQuery] = useQuery({
		query: GetProfilesQuery,
		variables: {
			request: {
				handle: router.query.profile,
			},
		},
	});

	useEffect(() => {
		if (result && router.isReady) {
			console.log(result);
			if (result.data == undefined && result.fetching !== true) {
				router.push('/');
				toast.error('Profile not found');
			}

			if (result.data && result.data.profile) {
				setProfile(result.data.profile);
			}
		}
	}, [result]);

	if (!profile) {
		return null;
	}

	console.log(result);

	return (
		<div className="pt-10 ">
			<Head>
				<title>{router.query.profile}</title>
			</Head>

			<div className="mx-auto max-w-screen-xl  relative bg-white border rounded-lg">
				<div
					className="bg-gray-100 rounded-t-lg relative "
					style={{
						background: `url('${formatImageUrl(
							profile.coverPicture?.original?.url,
							Settings.defaultCoverPicture
						)}')`,
					}}
				>
					<div className="relative avatar_wrapper" style={{ left: '44%', top: '60px' }}>
						<Image
							src={`${formatImageUrl(profile.picture?.original?.url, Settings.defaultProfilePicture)}`}
							alt=""
							width={125}
							height={125}
							className="rounded-full w-32 h-32 border-3"
						/>
					</div>
				</div>

				<div className="text-center mt-16 mb-10">
					<b className="text-xl">{profile.name}</b>
					<p className="text-gray-500">{profile.bio}</p>

					<ShowSocialAccounts attributes={profile.attributes} />
				</div>

				<div className="grid grid-cols-2 gap-5 mb-20 px-5">
					<section>
						<Tabs color="gray" variant="pills" defaultValue="feed">
							<Tabs.List>
								<Tabs.Tab value="feed">Feed</Tabs.Tab>
								<Tabs.Tab value="posts">Posts</Tabs.Tab>
								<Tabs.Tab value="nfts">NFTs</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel value="feed" pt="xs">
								<div className="post bg-gray-50 rounded-lg p-5">Feed - Recent Tx</div>
							</Tabs.Panel>

							<Tabs.Panel value="posts" pt="xs">
								<div className="post bg-gray-50 rounded-lg p-5">
									<GetPost id={profile.id} />
								</div>
							</Tabs.Panel>
						</Tabs>
					</section>
					<div className="donation bg-gray-50 rounded-lg p-5">
						<h4 className="font-bold">Buy a Coffee for {profile.name}</h4>

						<form className="space-y-3 mt-5">
							<div className="grid grid-cols-12 gap-5">
								<Select className="col-span-4" label="Coin" data={[]} />

								<NumberInput label="Amount" value={0.1} className="col-span-8" />
							</div>

							<Textarea placeholder="Your Message" />

							<Button variant="outline" color="yellow">
								Submit
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
