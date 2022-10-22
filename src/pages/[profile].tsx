import { useRouter } from 'next/router';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LensProfile from 'components/Profile/Lens/Profile';

dayjs.extend(relativeTime);

const Profile = () => {
	const router = useRouter();

	if (!router.query.profile) return null;

	if (!String(router.query.profile).endsWith('.lens')) return 'Invalid lens handle';

	return <LensProfile profileId={router.query.profile} />;
};

export default Profile;
