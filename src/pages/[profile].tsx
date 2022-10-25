import { useRouter } from 'next/router';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LensProfile from 'components/Profile/Lens/Profile';
import { ethers } from 'ethers';
import EthProfile from 'components/Profile/Eth/Profile';
import ENSProfile from 'components/Profile/Eth/ENSProfile';

dayjs.extend(relativeTime);

const Profile = () => {
	const router = useRouter();

	if (!router.query.profile) return null;

	if (ethers.utils.isAddress(router.query.profile as string)) {
		return <EthProfile profileAddress={router.query.profile} />;
	}

	if (String(router.query.profile).endsWith('.eth')) {
		return <ENSProfile ens={router.query.profile} />;
	}

	return <LensProfile profileId={router.query.profile} />;
};

export default Profile;
