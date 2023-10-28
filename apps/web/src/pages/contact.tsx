import Card from 'components/Layout/Card';
import PageTitle from 'components/Layout/PageTitle';

const Contact = () => {
	return (
		<section className="w-full bg-gradient-to-b ">
			<PageTitle title={'Contact'} />
			<Card title="Contact">
				<a href="https://twitter.com/pjijin_" target="_BLANK" rel="noreferrer noopener">
					DM on twitter.
				</a>
			</Card>
		</section>
	);
};

export default Contact;
