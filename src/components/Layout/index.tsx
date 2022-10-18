import { useRouter } from 'next/router';
import Header from './Header';

const Layout = ({ children }) => {
	const router = useRouter();

	return (
		<>
			<div className={router.asPath === '/' ? 'main-section min-h-screen' : 'bg-gray-50 min-h-screen'}>
				<div className="mx-auto max-w-screen-xl px-3 md:px-4 sm:px-6 relative ">
					{router.asPath === '/' ? (
						<header>
							<img src="https://sendacoin.to/assets/images/logo.svg" className="w-32 h-32" alt="" />
						</header>
					) : null}
					{children}
				</div>
			</div>
		</>
	);
};

export default Layout;
