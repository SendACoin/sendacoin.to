import { ConnectButton } from '@rainbow-me/rainbowkit';

const ConnectButtonLink = () => {
	return (
		<>
			<ConnectButton.Custom>
				{({
					account,
					chain,
					openAccountModal,
					openChainModal,
					openConnectModal,
					authenticationStatus,
					mounted,
				}) => {
					// Note: If your app doesn't use authentication, you
					// can remove all 'authenticationStatus' checks
					const ready = mounted && authenticationStatus !== 'loading';
					const connected =
						ready &&
						account &&
						chain &&
						(!authenticationStatus || authenticationStatus === 'authenticated');

					return (
						<>
							{(() => {
								if (!connected) {
									return (
										<a
											onClick={openConnectModal}
											className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer"
										>
											Connect Wallet
										</a>
									);
								}

								if (chain.unsupported) {
									return (
										<a
											onClick={openChainModal}
											className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer"
										>
											Wrong network
										</a>
									);
								}

								return (
									<div style={{ display: 'flex' }}>
										<a
											onClick={openChainModal}
											style={{ display: 'flex', alignItems: 'center' }}
											className=" font-bold text-gray-500 hover:text-gray-900 text-sm  rounded-full cursor-pointer"
										>
											{chain.hasIcon && (
												<div
													style={{
														background: chain.iconBackground,
														width: 20,
														height: 20,
														borderRadius: 999,
														overflow: 'hidden',
														marginRight: 4,
													}}
												>
													{chain.iconUrl && (
														<img
															alt={chain.name ?? 'Chain icon'}
															src={chain.iconUrl}
															style={{ width: 20, height: 20 }}
														/>
													)}
												</div>
											)}
										</a>

										<a
											onClick={openAccountModal}
											className="hover:bg-gray-100 font-bold text-gray-500 hover:text-gray-900 text-sm  px-4 py-2 rounded-full cursor-pointer"
										>
											{account.displayName}
										</a>
									</div>
								);
							})()}
						</>
					);
				}}
			</ConnectButton.Custom>
		</>
	);
};

export default ConnectButtonLink;
