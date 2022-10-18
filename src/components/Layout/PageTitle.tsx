import Head from 'next/head';

const PageTitle = ({ title }) => {
	return (
		<>
			<Head>
				<title>{title ?? 'Sendacoin'}</title>
				{/* Meta tags */}
			</Head>
		</>
	);
};

export default PageTitle;
