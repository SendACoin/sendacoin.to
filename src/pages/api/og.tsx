import { ImageResponse } from '@vercel/og';

export const config = {
	runtime: 'experimental-edge',
};

const og = () => {
	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					fontSize: 128,
					background: 'white',
					width: '100%',
					height: '100%',
				}}
			>
				Hello, World!
			</div>
		)
	);
};

export default og;
