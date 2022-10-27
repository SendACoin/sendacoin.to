import { Button, NumberInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import ConnectButtonLink from 'components/Layout/ConnectButton';
import { abi } from 'constants/index';
import { useContractWrite, useProvider } from 'wagmi';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import Owner from './Owner';
import useContractAddress from 'hooks/useContractAddress';

const Tip = ({ name, ownerAddress }) => {
	const provider = useProvider();

	const { address, connector } = useAccount();

	const { contractAddress } = useContractAddress();

	const form = useForm({
		initialValues: {
			coin: 'matic',
			amount: 5,
			message: '',
		},
	});

	const contract = useContractWrite({
		mode: 'recklesslyUnprepared',
		address: contractAddress,
		abi: abi,
		functionName: 'tip',
		args: [ownerAddress, form.values.message],
	});

	if (address === ownerAddress) return <Owner />;

	return (
		<>
			<div className="md:flex justify-between items-center">
				<h4 className="mb-3 md:mb-0 font-bold">Buy a Coffee {name ? `for ${name}` : null}</h4>

				<ConnectButtonLink />
			</div>

			{process.env.NEXT_PUBLIC_TESTNET ? (
				<span className="text-xs ml-1 border border-gray-300 text-gray-600 rounded-lg px-1.5">Testnet</span>
			) : null}

			<form
				className="mt-5 relative"
				onSubmit={(e) => {
					e.preventDefault();
					contract.write({
						recklesslySetUnpreparedOverrides: {
							value: ethers.utils.parseUnits(String(form.values.amount), 'ether'),
						},
					});
				}}
			>
				{address === undefined ? (
					<div
						className="absolute w-full h-full grid place-items-center z-40 rounded text-gray-800"
						style={{ background: '#ffffffc4' }}
					>
						connect wallet to continue!
					</div>
				) : null}

				<div className={` ${address === undefined ? 'p-5' : 'p-0'}  space-y-3 `}>
					<div className="grid grid-cols-12 gap-5">
						{/* <Select
							className="col-span-4"
							label="Coin"
							data={[]}
							onChange={(val) => form.setFieldValue('coin', val)}
						/> */}

						<NumberInput
							icon={
								<img
									src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/matic.svg"
									alt=""
									className="w-5 h-5"
								/>
							}
							value={1}
							step={0.0001}
							min={0.0001}
							className="col-span-8"
							onChange={(val) => {
								form.setFieldValue('amount', val);
							}}
							hideControls
							noClampOnBlur
						/>
					</div>

					<Textarea
						placeholder="Your Message (optional)"
						onChange={(e) => form.setFieldValue('message', e.target.value)}
					/>

					<Button
						type="submit"
						color="dark"
						variant="outline"
						fullWidth
						rightIcon={<img className="w-4 h-4" src="https://twemoji.maxcdn.com/svg/1f64c.svg" />}
					>
						Tip
					</Button>
				</div>
			</form>
		</>
	);
};

export default Tip;
