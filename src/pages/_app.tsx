import { createClient, Provider } from 'urql';
import Layout from 'components/Layout';
import { createEmotionCache, MantineProvider } from '@mantine/core';
import { RouterTransition } from '../components/Layout/RouterTransition';
import { Toaster } from 'react-hot-toast';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, wagmiClient } from 'libs/connectors';
import { WagmiConfig } from 'wagmi';

import '@rainbow-me/rainbowkit/styles.css';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

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
				<RouterTransition />
				<WagmiConfig client={wagmiClient}>
					<RainbowKitProvider chains={chains} modalSize="compact">
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</RainbowKitProvider>
				</WagmiConfig>
				<Toaster />
			</MantineProvider>
		</Provider>
	);
}

export default MyApp;
