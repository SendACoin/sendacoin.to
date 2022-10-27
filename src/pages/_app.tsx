import { createClient, Provider } from 'urql';
import Layout from 'components/Layout';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { RouterTransition } from '../components/Layout/RouterTransition';
import { Toaster } from 'react-hot-toast';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, wagmiClient } from 'libs/connectors';
import { WagmiConfig } from 'wagmi';

import 'react-tippy/dist/tippy.css';

import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Script from 'next/script';

const client = createClient({
	url: 'https://api.lens.dev',
});

const myCache = createEmotionCache({ key: 'sac' });

function MyApp({ Component, pageProps }) {
	return (
		<Provider value={client}>
			<MantineProvider
				emotionCache={myCache}
				withGlobalStyles
				withNormalizeCSS
				theme={{
					/** Put your mantine theme override here */
					colorScheme: 'light',
				}}
			>
				<Script async src="https://cdn.splitbee.io/sb.js" />

				<Toaster containerClassName="text-sm" />

				<RouterTransition />
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains} modalSize="compact" appInfo={{ appName: 'Sendacoin.to' }}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</RainbowKitProvider>
				</WagmiConfig>
			</MantineProvider>
		</Provider>
	);
}

export default MyApp;
