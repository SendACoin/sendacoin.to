import { DashboardIcon, GlobeIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';
import ConnectButtonLink from './ConnectButton';

export const HeaderVisibleRoutes = ['/', '/dashboard', '/explore', '/thanks', '/feedback', '/privacy', '/contact'];

const Layout = ({ children }) => {
	const { address, isConnecting, isDisconnected } = useAccount();
	const router = useRouter();

	return (
		<>
			<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

			<div className={router.asPath === '/' ? 'main-section md:min-h-screen' : 'bg-gray-50 min-h-screen'}>
				{HeaderVisibleRoutes.includes(router.asPath) && address ? (
					<div className="grid grid-cols-7 w-full z-50 fixed md:hidden bottom-0 p-1 border-t border-gray-200 bg-white shadow dark:bg-brand-primary ">
						<MobileNav
							link="/dashboard"
							className="col-span-3"
							active={router.asPath.includes('dashboard')}
						>
							<DashboardIcon className="w-5 h-5" />
						</MobileNav>

						<MobileNav link="/explore" className="col-span-3" active={router.asPath.includes('portfolio')}>
							<GlobeIcon className="w-5 h-5" />
						</MobileNav>
					</div>
				) : null}

				<div className="mx-auto max-w-screen-xl px-1 md:px-4 sm:px-6 relative ">
					{HeaderVisibleRoutes.includes(router.asPath) ? (
						<>
							<header className="grid grid-cols-2 md:grid-cols-3 gap-5">
								<div className="py-5 md:py-0">
									<Link href="/" passHref>
										<img
											src="https://sendacoin.to/assets/images/logo.svg"
											className="w-32 pl-2 md:pl-0  md:w-32 md:h-32"
											alt=""
										/>
									</Link>
								</div>

								<div className="flex justify-end md:justify-start items-center md:col-span-2">
									<nav className="hidden md:flex items-center bg-white border rounded-full px-2 py-2 space-x-2 shadow-sm ml-0 mr-0">
										<Link
											href="/"
											passHref
											className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer"
										>
											Home
										</Link>
										<Link
											href="/explore"
											passHref
											className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer"
										>
											Explore
										</Link>

										{address ? (
											<Link
												href="/dashboard"
												passHref
												className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer"
											>
												Dashboard
											</Link>
										) : null}

										<ConnectButtonLink />
									</nav>

									<div className="md:hidden">
										<ConnectButtonLink />
									</div>
								</div>
							</header>
						</>
					) : null}
					{children}
					{HeaderVisibleRoutes.includes(router.asPath) ? (
						<>
							<footer className="mt-10 py-4 pb-14 text-sm border-t border-gray-100 text-center text-gray-500">
								<div className="md:space-x-5 flex items-center justify-center">
									<Link
										className="px-2 text-gray-500 hover:text-gray-900 cursor-pointer"
										href="/feedback"
										passHref
									>
										Feedback
									</Link>
									<a
										href="https://discord.gg/F27NTNP9"
										target="_BLANK"
										rel="noopener noreferrer"
										className="px-2 text-gray-500 hover:text-gray-900 cursor-pointer"
									>
										Discord
									</a>
									<a
										href="https://sendacoin.to/jijin.lens"
										target="_BLANK"
										rel="noreferrer"
										className="px-2 text-gray-500 hover:text-gray-900 cursor-pointer"
									>
										Donate
									</a>
									<a
										href="https://github.com/SendACoin/"
										target="_BLANK"
										rel="noreferrer"
										className="px-2 text-gray-500 hover:text-gray-900 cursor-pointer"
									>
										Github
									</a>
									<Link
										href="/thanks"
										passHref
										className="hidden md:block px-2 text-gray-500 hover:text-gray-900 cursor-pointer"
									>
										Thanks
									</Link>
									<Link
										href="/contact"
										passHref
										className="px-2 text-gray-500 hover:text-gray-900 cursor-pointer"
									>
										Contact
									</Link>
								</div>
								<p className="py-4 text-xs text-center text-gray-500 flex items-center justify-center">
									Made with
									<img
										src="https://twemoji.maxcdn.com/svg/1f33f.svg"
										alt=""
										className="w-6 h-6 mx-2"
									/>
									by
									<a
										href="https://twitter.com/pjijin_"
										target="_BLANK"
										rel="noreferrer"
										className="pl-2"
									>
										@pjijin_
									</a>
								</p>
							</footer>
						</>
					) : null}
				</div>
			</div>
		</>
	);
};

const MobileNav = ({ children, link, className = '', active = false }) => {
	return (
		<Link
			as={link}
			href={link}
			className={`p-3 ${
				active ? 'text-gray-900 ' : 'text-gray-400 '
			}  text-center hover:bg-gray-100  rounded flex items-center justify-center cursor-pointer ${className}`}
		>
			{children}
		</Link>
	);
};

export default Layout;
