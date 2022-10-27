import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
};

const formatImageUrl = (imageUrl, defaultPicture = null) => {
	if (!imageUrl) return defaultPicture;

	if (imageUrl.startsWith('ipfs://')) {
		return `https://w3s.link/ipfs/${imageUrl.replace('ipfs://', '')}`;
	}

	return imageUrl;
};

const fetchUserDetails = async (username) => {
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

export default async function handler(req: NextRequest) {
	const { searchParams } = req.nextUrl;

	const providedHandle = searchParams.get('handle');

	if (!providedHandle) {
		return new ImageResponse(<>Visit with &quot;?username=lens_handle&quot;</>, {
			width: 1200,
			height: 630,
		});
	}

	const userDetails = await fetchUserDetails(providedHandle);

	const { handle, bio, name, picture } = userDetails.data.profile;

	const image = formatImageUrl(picture.original.url);

	return new ImageResponse(
		(
			<div
				tw="bg-gray-100 h-[90%] bg-white rounded-lg p-2"
				style={{
					display: 'flex',
					fontSize: 60,
					color: 'black',
					width: '100%',
					height: '100%',
					// paddingTop: 50,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					tw={`bg-gray-200 h-full flex-2 justify-center items-center rounded-lg`}
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
				<div tw={'flex-3 pl-20 bg-white'} style={{ display: 'flex', flexDirection: 'column' }}>
					<p tw={'mb-20'}>{name}</p>
					<p tw={`text-gray-400 text-4xl mb-32`} style={{ marginTop: '-60px' }}>
						@{handle}
					</p>
					<p tw="text-3xl mb-20" style={{ maxWidth: '500px', marginTop: '-90px' }}>
						{bio}
					</p>
					<p
						tw={`text-gray-900 text-4xl rounded-lg px-4 py-2 flex items-center gap-5`}
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
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
