import Card from 'components/Layout/Card';
import PageTitle from 'components/Layout/PageTitle';

const Feedback = () => {
	return (
		<section className="w-full bg-gradient-to-b ">
			<PageTitle title={'Feedback'} />

			<Card title="Love to hear your feedback!">
				<a href="https://twitter.com/pjijin_" target="_BLANK" rel="noreferrer noopener">
					DM your suggestion / feedback on twitter.
				</a>
			</Card>
		</section>
	);
};

export default Feedback;
