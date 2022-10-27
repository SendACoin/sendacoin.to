import { useRouter } from 'next/router';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LensProfile from 'components/Profile/Lens/Profile';
import { ethers } from 'ethers';
import EthProfile from 'components/Profile/Eth/Profile';
import ENSProfile from 'components/Profile/Eth/ENSProfile';

dayjs.extend(relativeTime);

const Profile = ({ profile }) => {
	if (!profile) return null;

	if (ethers.utils.isAddress(profile as string)) {
		return <EthProfile profileAddress={profile} />;
	}

	if (String(profile).endsWith('.eth')) {
		return <ENSProfile ens={profile} />;
	}

	return <LensProfile profileId={profile} />;
};

export async function getServerSideProps(context) {
	return {
		props: {
			profile: context.query.profile,
		},
	};
}

export default Profile;
