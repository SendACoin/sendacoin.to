import { EyeOpenIcon, Share1Icon } from '@radix-ui/react-icons';
import RecommendedProfiles from 'components/Home/RecommendedProfiles';
import PageTitle from 'components/Layout/PageTitle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Profiles = [
	{
		handle: 'nader.lens',
		picture:
			'https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
	},
	{
		handle: 'jijin.lens',
		picture: 'https://w3s.link/ipfs/bafkreiemxxeevwcvcoue46kznrvoyxy54isl5wleoaami65h4efcwhqvnu',
	},
	{
		handle: 'suhailkakar.lens',
		picture:
			'https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/QmX8T8h9MMAajTvveXFaBFjWtvp4eY6j6wybjbCjxDDJdB',
	},
	{
		handle: 'francescociulla.lens',
		picture:
			'https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreidflmdyx2bqpvb54oaycb42v2akfgi4co7hqirj5ioiduhadgdzui',
	},
	{
		handle: 'yoginth.lens',
		picture:
			'https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreigjqdyocpvvzll67qoxhtyrookt37rx76mzn22cn6ahlw46rga3ie',
	},
	{
		handle: 'nilesh.lens',
		picture:
			'https://ik.imagekit.io/lensterimg/tr:n-avatar,tr:di-placeholder.webp/https://lens.infura-ipfs.io/ipfs/bafkreifequ734mu7gu4oauwzo2q7z3ccazdz4n3evmvxgixynd3l3soix4',
	},
];

const Home = () => {
	const [handle, setHandle] = useState('');
	const router = useRouter();

	return (
		<>
			<section className="w-full bg-gradient-to-b min-h-screen">
				<PageTitle title="Sendacoin - Support creators" />

				<div className="grid md:grid-cols-2 gap-7 items-center place-items-center">
					<section>
						<div className="mb-10">
							<h1 className="mt-20 text-4xl md:text-6xl font-extrabold tracking-tight md:leading-tight">
								Share you lens profile. <br />
								Collect payments!
							</h1>
							<div className="space-x-5 flex items-center uppercase mt-2">
								<p className="text-gray-500 text-xs pl-2">0% commission!</p>
								<p className="text-gray-500 text-xs pl-2">Instant Transfer</p>
							</div>
						</div>

						<span className="bg-white text-xs md:text-base rounded-full  md:px-5 pl-4 tracking-wider pr-2 py-5 border text-gray-900">
							https://sendacoin.to/
							<input
								type="text"
								value={handle}
								onChange={(e) => setHandle(e.target.value)}
								className="px-1 py-4 text-gray-400"
								style={{ outline: 0 }}
								placeholder="your_lens_handle"
							/>
							<button
								onClick={() => {
									router.push('/' + handle);
								}}
								className="bg-gray-900 hover:bg-gray-700 text-white px-2 md:px-8 py-3 rounded-full md:ml-5"
							>
								Go
							</button>
						</span>
					</section>
					<div className="mt-20 grid">
						<div className="flex -space-x-2 justify-center">
							{Profiles.map((profile) => (
								<Link key={profile.handle} href={`/${profile.handle}`} passHref>
									<a>
										<img
											className="inline-block h-14 md:h-20 md:w-20 rounded-full ring-2 ring-white hover:ring-gray-400"
											src={profile.picture}
											alt=""
										/>
									</a>
								</Link>
							))}
						</div>
					</div>
				</div>

				<RecommendedProfiles />
			</section>
			<section className="mb-20 mt-20 md:mt-0">
				<h4 className="font-bold text-3xl mb-10">How it works?</h4>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<div className="md:w-1/2">
						<EyeOpenIcon className="w-10 h-10" />
						<b className="block my-5">View Profile</b>
						<p className="text-gray-500 mt-5">
							Visit the sendacoin.to/lens handle page for your profile. Look at your profile{"'"}s
							appearance.
						</p>
					</div>
					<div className=" md:w-1/2">
						<Share1Icon className="w-10 h-10" />
						<b className="block my-5">Share Profile</b>
						<p className="text-gray-500 mt-5">
							Share the link to your profile on social media, blog post, etc. Any tip you receive is
							instantly sent to your wallet.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
