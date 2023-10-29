import { MantineProvider } from '@mantine/core';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chains, wagmiConfig } from 'libs/connectors';
import { Toaster } from 'sonner';
import { Provider, createClient } from 'urql';
import { WagmiConfig } from 'wagmi';
import { RouterTransition } from '../components/Layout/RouterTransition';

import 'react-tippy/dist/tippy.css';

import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const Layout = dynamic(() => import('components/Layout'), {
	ssr: false,
});

const client = createClient({
	url: 'https://api.lens.dev',
});

function MyApp({ Component, pageProps }) {
	return (
		<Provider value={client}>
			<MantineProvider>
				<Script async src="https://cdn.splitbee.io/sb.js" />

				<Toaster />

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
