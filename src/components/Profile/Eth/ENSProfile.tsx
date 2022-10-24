import Spinner from 'components/Spinner';
import { useEnsAddress } from 'wagmi';
import Profile from './Profile';

const ENSProfile = ({ ens }) => {
	const { data, isError, isLoading } = useEnsAddress({
		name: ens,
		chainId: 1,
		cacheTime: 2_000,
	});

	console.log(data, isError, isLoading);

	return <Spinner loading={isLoading}>{data ? <Profile profileAddress={data} /> : null}</Spinner>;
};

export default ENSProfile;
