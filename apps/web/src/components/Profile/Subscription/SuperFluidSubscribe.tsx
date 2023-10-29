import SuperfluidWidget from '@superfluid-finance/widget';
import paymentOptions from './paymentOptions';

import superTokenList from '@superfluid-finance/tokenlist';

export const SuperFluidSubscribe = ({ user }: any) => {
	const walletManager = {
		open: async () => {
			console.log('connect');
		},
		isOpen: false,
	};

	const customPaymentDetails = paymentOptions.map((option) => {
		return {
			...option,
			receiverAddress: user.public_address,
		};
	});

	return (
		<>
			<SuperfluidWidget
				productDetails={{ name: `Buy coffee for ${name}`, description: 'Subscription' }}
				paymentDetails={{
					paymentOptions: customPaymentDetails,
				}}
				tokenList={superTokenList}
				type="drawer"
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
