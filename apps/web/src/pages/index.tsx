import { Button } from '@mantine/core';
import { EyeOpenIcon, Share1Icon } from '@radix-ui/react-icons';
import CreatorAvatars from 'components/Home/CreatorAvatars';
import RecommendedProfiles from 'components/Home/RecommendedProfiles';
import ShowUrlBar from 'components/Home/ShowUrlBar';
import PageTitle from 'components/Layout/PageTitle';

const Home = () => {
	return (
		<>
			<section className="w-full bg-gradient-to-b min-h-screen">
				<PageTitle title="Sendacoin - Share Profile ! Collect Tips!" />

				<div className="grid px-2 md:px-0 md:grid-cols-2 gap-7 items-center place-items-center">
					<section>
						<div className="mb-10">
							<h1 className="mt-20 text-4xl md:text-6xl font-extrabold tracking-tight md:leading-tight">
								Share you lens profile. <br />
								Collect payments!
							</h1>
							<div className="space-x-5 flex items-center uppercase mt-2 mb-5">
								<p className="text-gray-500 text-xs pl-2">0% commission!</p>
								<p className="text-gray-500 text-xs pl-2">Instant Transfer</p>
								{/* <p className="text-gray-500 text-xs pl-2">Subscription Payment</p> */}
							</div>
							<ShowUrlBar />
						</div>
					</section>
					<div className="mt-20 relative w-full">
						<CreatorAvatars />
					</div>
				</div>

				<RecommendedProfiles />
			</section>

			<section className="grid md:grid-cols-2 gap-5 mt-10">
				<div>
					<section className="mb-20 mt-20 md:mt-0 px-5 md:px-0">
						<h4 className="font-bold text-3xl mb-10">How it works?</h4>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div>
								<EyeOpenIcon className="w-10 h-10" />
								<b className="block my-5">View Profile</b>
								<p className="text-gray-500 mt-5">
									Visit the sendacoin.to/lens handle page for your profile. Look at your profile{"'"}s
									appearance.
								</p>
							</div>
							<div>
								<Share1Icon className="w-10 h-10" />
								<b className="block my-5">Share Profile</b>
								<p className="text-gray-500 mt-5">
									Share the link to your profile on social media, blog post, etc. Any tip you receive
									is instantly sent to your wallet.
								</p>
							</div>
						</div>
					</section>
					<h4 className="font-bold text-3xl mb-10">Embed widget on Website</h4>

					<p className="text-gray-500 mt-5">
						You can include a widget on your blog or website. Make the embed code and then place it to your
						website.
					</p>
					<Button
						component="a"
						target={'_BLANK'}
						href="/embed"
						color="gray"
						variant="subtle"
						className={'mt-10'}
					>
						Generate Widget
					</Button>
				</div>
				<img src="https://i.imgur.com/JWGvDgv.jpg" className="rounded-lg" />
			</section>
		</>
	);
};

export default Home;
