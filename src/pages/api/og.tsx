import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
};

/*
 * Format Image url.
 *
 * The w3s gateway link is used to prepare the IPFS link from the Lens API.
 */

const formatImageUrl = (imageUrl: string, defaultPicture = null) => {
	if (!imageUrl) return defaultPicture;

	if (imageUrl.startsWith('ipfs://')) {
		return `https://w3s.link/ipfs/${imageUrl.replace('ipfs://', '')}`;
	}

	return imageUrl;
};

/*
 * Fetch user details from the lens graphql api
 */

const fetchUserDetails = async (username: string) => {
	const user = await fetch('https://api.lens.dev/', {
		method: 'POST',
		headers: {
			'Accept-Encoding': 'gzip, deflate, br',
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Connection: 'keep-alive',
			DNT: '1',
			Origin: 'https://api.lens.dev',
		},
		body: JSON.stringify({
			query: `{\n  profile(request: { handle: "${username}" }) {\n    handle\n    name\n    bio\n    picture {\n      ... on NftImage {\n        contractAddress\n        tokenId\n        uri\n        verified\n      }\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n      __typename\n    }\n  }\n}\n`,
		}),
	});

	const userData = await user.json();

	return await userData;
};

/*
 * Generate Image based on the lens handle
 */

export default async function handler(req: NextRequest) {
	const { searchParams } = req.nextUrl;

	const providedHandle = searchParams.get('handle');

	if (!providedHandle) {
		return new ImageResponse(<>Visit with &quot;?handle=lens_handle&quot;</>, {
			width: 1200,
			height: 630,
		});
	}

	const userDetails = await fetchUserDetails(providedHandle);

	const { handle, bio, name, picture } = userDetails.data.profile;

	const image = formatImageUrl(picture.original.url);

	return new ImageResponse(
		(
			<>
				<img
					src="https://i.imgur.com/yXhxYzD.png"
					style={{
						width: '100%',
						height: '100%',
						position: 'absolute',
					}}
				/>
				<div
					tw=" h-[95%] bg-white rounded-lg px-1.5 py-10"
					style={{
						display: 'flex',
						margin: '10px',
						marginTop: '20px',
						marginLeft: '20px',
						fontSize: 60,
						color: 'black',
						height: '580px',
						width: '1170px',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div
						tw={`bg-gray-200 h-full ml-10 flex-2 justify-center items-center rounded-lg`}
						style={{ display: 'flex', flexDirection: 'column', background: '#fbf1dc' }}
					>
						<p
							style={{
								background: '#fff',
								borderRadius: 128,
								border: '20px solid #fff',
								borderBottomRightRadius: '80px 80px',
							}}
						>
							<img
								width="256"
								height="256"
								tw={``}
								src={`${image}`}
								style={{
									borderRadius: 128,
								}}
							/>
						</p>
					</div>
					<div tw={'flex-3 pl-20 h-[95%] bg-white'} style={{ display: 'flex', flexDirection: 'column' }}>
						<p tw={'mb-20'}>{name}</p>
						<p tw={`text-gray-400 text-4xl mb-32`} style={{ marginTop: '-60px' }}>
							@{handle}
						</p>
						<p tw="text-3xl mb-20" style={{ maxWidth: '500px', marginTop: '-90px' }}>
							{bio}
						</p>
						<p
							tw={`text-gray-900 text-4xl rounded-lg px-10 py-5 flex items-center`}
							style={{ marginTop: '-40px', background: '#fbf1dc' }}
						>
							<img
								src="https://sendacoin.to/assets/images/icon.svg"
								width="40"
								height="40"
								style={{ marginRight: '20px' }}
								alt=""
							/>
							<span>sendacoin.to/{handle}</span>
						</p>
					</div>
				</div>
			</>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
