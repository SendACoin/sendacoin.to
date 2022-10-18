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
		<section className="w-full bg-gradient-to-b min-h-screen">
			<PageTitle title="Sendacoin - Support creators" />

			<div className="grid md:grid-cols-2 gap-7 items-center">
				<section>
					<h1 className="mt-32 mb-10 text-4xl md:text-6xl font-extrabold tracking-tight md:leading-tight">
						Share you lens profile. <br />
						Collect payments!
					</h1>

					<span className="bg-white rounded-full px-5 tracking-wider pr-2 py-5 border text-gray-900">
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
							className="bg-gray-900 hover:bg-gray-700 text-white px-8 py-3 rounded-full ml-5"
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
										className="inline-block h-20 w-20 rounded-full ring-2 ring-white hover:ring-gray-400"
										src={profile.picture}
										alt=""
									/>
								</a>
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* <div className="mt-20">
				<h5>Recommended Profiles</h5>
			</div> */}
		</section>
	);
};

export default Home;
