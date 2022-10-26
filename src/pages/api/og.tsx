import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
};

const fetchUserDetails = async (username) => {
	const user = await fetch('https://api.lens.dev/', {
		body: '{"query":"query GetProfilesQuery($request: SingleProfileQueryRequest!) {\\n  profile(request: $request) {\\n    id\\n    name\\n    bio\\n    attributes {\\n      displayType\\n      traitType\\n      key\\n      value\\n      __typename\\n    }\\n    followNftAddress\\n    metadata\\n    isDefault\\n    picture {\\n      ... on NftImage {\\n        contractAddress\\n        tokenId\\n        uri\\n        verified\\n        __typename\\n      }\\n      ... on MediaSet {\\n        original {\\n          url\\n          mimeType\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    handle\\n    coverPicture {\\n      ... on NftImage {\\n        contractAddress\\n        tokenId\\n        uri\\n        verified\\n        __typename\\n      }\\n      ... on MediaSet {\\n        original {\\n          url\\n          mimeType\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    ownedBy\\n    dispatcher {\\n      address\\n      canUseRelay\\n      __typename\\n    }\\n    stats {\\n      totalFollowers\\n      totalFollowing\\n      totalPosts\\n      totalComments\\n      totalMirrors\\n      totalPublications\\n      totalCollects\\n      __typename\\n    }\\n    followModule {\\n      ... on FeeFollowModuleSettings {\\n        type\\n        amount {\\n          asset {\\n            symbol\\n            name\\n            decimals\\n            address\\n            __typename\\n          }\\n          value\\n          __typename\\n        }\\n        recipient\\n        __typename\\n      }\\n      ... on ProfileFollowModuleSettings {\\n        type\\n        __typename\\n      }\\n      ... on RevertFollowModuleSettings {\\n        type\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}","operationName":"GetProfilesQuery","variables":{"request":{"handle":"jijin.lens"}}}',
		method: 'POST',
	});

	const userData = await user.json();

	console.log(userData);
	return userData;
};

export default async function handler(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const username = searchParams.get('username');

	// const userDetails = await fetchUserDetails(username);

	if (!username) {
		return new ImageResponse(<>Visit with &quot;?username=jijin.lens&quot;</>, {
			width: 1200,
			height: 630,
		});
	}

	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					fontSize: 60,
					color: 'black',
					background: '#f6f6f6',
					width: '100%',
					height: '100%',
					paddingTop: 50,
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img
					width="256"
					height="256"
					src={`https://github.com/${username}.png`}
					style={{
						borderRadius: 128,
					}}
				/>
				<p tw="bg-gray-50 px-5 rounded-lg py-1.5 border">sendacoin.to/{username}</p>
				<p tw="">sendacoin.to/{username}</p>
			</div>
		),
		{
			width: 1200,
			height: 630,
		}
	);
}
