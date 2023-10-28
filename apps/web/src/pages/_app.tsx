import { MantineProvider } from '@mantine/core';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Layout from 'components/Layout';
import { chains, wagmiConfig } from 'libs/connectors';
import { Toaster } from 'react-hot-toast';
import { Provider, createClient } from 'urql';
import { WagmiConfig } from 'wagmi';
import { RouterTransition } from '../components/Layout/RouterTransition';

import 'react-tippy/dist/tippy.css';

import '@rainbow-me/rainbowkit/styles.css';
import Script from 'next/script';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const client = createClient({
	url: 'https://api.lens.dev',
});

function MyApp({ Component, pageProps }) {
	return (
		<Provider value={client}>
			<MantineProvider>
				<Script async src="https://cdn.splitbee.io/sb.js" />

				<Toaster containerClassName="text-sm" />

				<RouterTransition />
				<WagmiConfig config={wagmiConfig}>
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
