import Card from 'components/Layout/Card';
import PageTitle from 'components/Layout/PageTitle';

const Shoutout = [
	{
		name: 'lens.xyz',
		url: 'https://lens.xyz/',
		logo: '/assets/images/lens.svg',
	},
	{
		name: 'vercel',
		url: 'https://vercel.com/',
		logo: '/assets/images/vercel.svg',
	},
];

const Thanks = () => {
	return (
		<section className="w-full bg-gradient-to-b ">
			<PageTitle title={'Thanks'} />

			<Card title="Thanks">
				<div className="grid md:grid-cols-4 gap-5 mt-5">
					{Shoutout.map((shoutout) => (
						<a
							href={shoutout.url}
							target="_BLANK"
							rel="noreferrer noopener"
							key={shoutout.name}
							className="border rounded-lg text-center p-2 grid place-items-center"
						>
							<img src={shoutout.logo} alt="" className="w-32 h-32" />

							<b>{shoutout.name}</b>
						</a>
					))}
				</div>
			</Card>
		</section>
	);
};

export default Thanks;
