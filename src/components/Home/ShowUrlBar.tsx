import useDeviceDetect from 'hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ShowUrlBar = () => {
	const [handle, setHandle] = useState('');
	const router = useRouter();
	const { isMobile } = useDeviceDetect();
	if (isMobile) {
		return (
			<div className="bg-white text-xs md:text-base rounded-full  md:px-5 pl-4 tracking-wider pr-2 py-2 border text-gray-900 flex items-baseline">
				<span className="hidden md:inline">https://</span>sendacoin.to/
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
					className="bg-gray-900 flex-1 hover:bg-gray-700 text-white px-5 md:px-8 py-3 rounded-full relative right-0 ml-auto"
				>
					Go
				</button>
			</div>
		);
	}

	return (
		<span className="bg-white text-xs md:text-base rounded-full  md:px-5 pl-4 tracking-wider pr-2 py-5 border text-gray-900">
			<span className="hidden md:inline">https://</span>sendacoin.to/
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
				className="bg-gray-900 hover:bg-gray-700 text-white px-5 md:px-8 py-3 rounded-full md:ml-5"
			>
				Go
			</button>
		</span>
	);
};

export default ShowUrlBar;
