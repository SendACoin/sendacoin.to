import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
	const checkForDevice = () => {
		try {
			let windowWidth = window.innerWidth;
			if (windowWidth < 767.98) {
				return true;
			} else {
				return false;
			}
		} catch (e) {
			return false;
		}
	};

	const [isMobile, setIsMobile] = useState(checkForDevice());

	useEffect(() => {
		const handlePageResized = () => {
			setIsMobile(checkForDevice);
		};

		window.addEventListener('resize', handlePageResized);
		window.addEventListener('orientationchange', handlePageResized);
		window.addEventListener('load', handlePageResized);
		window.addEventListener('reload', handlePageResized);

		return () => {
			window.removeEventListener('resize', handlePageResized);
			window.removeEventListener('orientationchange', handlePageResized);
			window.removeEventListener('load', handlePageResized);
			window.removeEventListener('reload', handlePageResized);
		};
	}, []);

	return {
		isMobile,
	};
};

export default useDeviceDetect;
