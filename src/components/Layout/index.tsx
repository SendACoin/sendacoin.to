import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import ConnectButtonLink from './ConnectButton';

const HeaderVisibleRoutes = ['/', '/dashboard', '/explore'];

const Layout = ({ children }) => {
	const { address, isConnecting, isDisconnected } = useAccount();
	const router = useRouter();

	return (
		<>
			<div className={router.asPath === '/' ? 'main-section min-h-screen' : 'bg-gray-50 min-h-screen'}>
				<div className="mx-auto max-w-screen-xl px-3 md:px-4 sm:px-6 relative ">
					{HeaderVisibleRoutes.includes(router.asPath) ? (
						<>
							<header className="grid grid-cols-3 gap-5">
								<div>
									<Link href="/" passHref>
										<a>
											<img
												src="https://sendacoin.to/assets/images/logo.svg"
												className="w-32 h-32"
												alt=""
											/>
										</a>
									</Link>
								</div>

								<div className="grid place-items-start items-center col-span-2">
									<nav className="flex items-center bg-white border rounded-full px-2 py-2 space-x-2 shadow-sm ml-0 mr-0">
										<Link href="/" passHref>
											<a className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer">
												Home
											</a>
										</Link>
										<Link href="/explore" passHref>
											<a className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer">
												Explore
											</a>
										</Link>

										{address ? (
											<Link href="/dashboard" passHref>
												<a className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer">
													Dashboard
												</a>
											</Link>
										) : null}

										<ConnectButtonLink />
									</nav>
								</div>
							</header>
						</>
					) : null}
					{children}
					{HeaderVisibleRoutes.includes(router.asPath) ? (
						<>
							<footer className="mt-10 py-4 text-sm border-t border-gray-100 text-center text-gray-500 flex items-center justify-center">
								Made with
								<img src="https://twemoji.maxcdn.com/svg/1f33f.svg" alt="" className="w-6 h-6 mx-2" />
								by
								<a href="https://twitter.com/pjijin_" target="_BLANK" rel="noreferrer" className="pl-2">
									@pjijin_
								</a>
							</footer>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Layout;
