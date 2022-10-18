const Home = () => {
	return (
		<section className="w-full bg-gradient-to-b ">
			<div className="grid md:grid-cols-2 gap-7 items-center">
				<section>
					<h1 className="mt-32 mb-10 text-4xl md:text-6xl font-extrabold tracking-tight md:leading-tight">
						Share you lens profile. <br />
						Collect payments!
					</h1>

					<span className="bg-white rounded-lg px-4 py-4 border text-gray-500">
						https://sendacoin.to/
						<span className="bg-gray-50 rounded px-2 py-2 border ml-2 text-gray-700">your_lens_handle</span>
					</span>
				</section>
				<div className="mt-20">
					<div className="flex -space-x-2 overflow-hidden">
						<img
							className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
							src="https://w3s.link/ipfs/bafkreiemxxeevwcvcoue46kznrvoyxy54isl5wleoaami65h4efcwhqvnu"
							alt=""
						/>
						<img
							className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
							src="http://localhost:3000/_next/image?url=https%3A%2F%2Flens.infura-ipfs.io%2Fipfs%2FQmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX&w=256&q=75"
							alt=""
						/>
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
