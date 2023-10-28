import superTokenList from '@superfluid-finance/tokenlist';
import SuperfluidWidget from '@superfluid-finance/widget';

export const SuperFluidSubscribe = ({ user }: any) => {
	const walletManager = {
		open: async () => {
			console.log('connect');
		},
		isOpen: false,
	};

	const customPaymentDetails = [
		{
			chainId: 137,
			receiverAddress: user.public_address,
			superToken: {
				address: '0x32cefdf2b3df73bdebaa7cd3b0135b3a79d28dcc',
			},
			flowRate: {
				amountEther: '1',
				period: 'month',
			},
		},
	];

	return (
		<>
			<SuperfluidWidget
				productDetails={{
					name: profile?.name,
					description: profile?.bio ?? '',
					successURL: '',
				}}
				paymentDetails={{
					paymentOptions: customPaymentDetails,
				}}
				tokenList={superTokenList}
				type="dialog"
				walletManager={walletManager}
				stepper={{
					orientation: 'horizontal',
				}}
			>
				{({ openModal }) => (
					<div
						onClick={() => openModal()}
						className="font-space-grotesek font-semibold pulseButton pulseEffect ml-2 mt-1 cursor-pointer !bg-theme"
					>
						Subscribe
					</div>
				)}
			</SuperfluidWidget>
		</>
	);
};
