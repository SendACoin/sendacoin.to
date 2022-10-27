import {
    connectorsForWallets,

} from '@rainbow-me/rainbowkit';

import {
    injectedWallet,
    coinbaseWallet,
    walletConnectWallet,
    ledgerWallet,
    trustWallet,
    rainbowWallet
} from '@rainbow-me/rainbowkit/wallets';

import { configureChains } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'


import { chain, createClient } from 'wagmi';

const avalancheChain = {
    id: 43_114,
    name: 'Avalanche',
    network: 'avalanche',
    iconUrl: "https://cryptologotypes.com/img/logos/avalanche/avalanche-avax-logo.svg",
    nativeCurrency: {
        decimals: 18,
        name: 'Avalanche',
        symbol: 'AVAX',
    },
    rpcUrls: {
        default: 'https://api.avax.network/ext/bc/C/rpc',
    },
    blockExplorers: {
        default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
        etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
    testnet: false,
};


const binanceSmartChain = {
    id: 56,
    name: 'Binance',
    network: 'binance',
    iconUrl: "https://cryptologotypes.com/img/logos/binance-coin/binance-coin-bnb-logo.svg",
    nativeCurrency: {
        decimals: 18,
        name: 'Binance Coin',
        symbol: 'BNB',
    },
    rpcUrls: {
        default: 'https://bsc-dataseed.binance.org/',
    },
    blockExplorers: {
        default: { name: 'BSCScan', url: 'https://bscscan.com/' },
        etherscan: { name: 'BSCScan', url: 'https://bscscan.com/' },
    },
    testnet: false,
};


const ftmChain = {
    id: 250,
    name: 'Fantom',
    network: 'fantom',
    iconUrl: "https://cryptologotypes.com/img/logos/fantom/fantom-ftm-logo.svg",
    nativeCurrency: {
        decimals: 18,
        name: 'Fantom',
        symbol: 'FTM',
    },
    rpcUrls: {
        default: 'https://rpc.ftm.tools/',
    },
    blockExplorers: {
        default: { name: 'FTMScan', url: 'https://ftmscan.com/' },
        etherscan: { name: 'FTMScan', url: 'https://ftmscan.com/' },
    },
    testnet: false,
};


const polygonMumbaiTestnet = {
    id: 80001,
    name: 'Mumbai Testnet',
    // iconUrl: "https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@bea1a9722a8c63169dcc06e86182bf2c55a76bbc/svg/color/matic.svg",
    network: 'polgon_mumbai',
    // nativeCurrency: {
    //     decimals: 18,
    //     name: 'MATIC',
    //     symbol: 'MATIC',
    // },
    rpcUrls: {
        default: 'https://rpc-mumbai.maticvigil.com/',
    },
    // blockExplorers: {
    //     default: { name: 'polygonscan', url: 'https://testnet.polygonscan.com' },
    //     etherscan: { name: 'polygonscan', url: 'https://polygonscan.com/' },
    // },
    // testnet: true,
};

const moonbeanChain = {
    id: 1284,
    network: 'moonbeam',
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/6836.png",
    name: 'Moonbeam',
    nativeCurrency: {
        decimals: 18,
        name: 'GLMR',
        symbol: 'GLMR',
    },
    rpcUrls: {
        default: 'https://rpc.api.moonbeam.network',
    },
    blockExplorers: {
        default: { name: 'Moonscan', url: 'https://moonscan.io' },
        etherscan: { name: 'Moonscan', url: 'https://moonscan.io' },
    },
    testnet: false,
};


const moonriverChain = {
    id: 1285,
    iconUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/9285.png",
    name: 'Moonriver',
    network: 'moonriver',
    nativeCurrency: {
        decimals: 18,
        name: 'MOVR',
        symbol: 'MOVR',
    },
    rpcUrls: {
        default: 'https://rpc.api.moonriver.moonbeam.network',
    },
    blockExplorers: {
        default: { name: 'Moonscan', url: 'https://moonriver.moonscan.io/' },
        etherscan: { name: 'Moonscan', url: 'https://moonriver.moonscan.io/' },
    },
    testnet: false,
};



export const { chains, provider } = configureChains(
    [
        polygonMumbaiTestnet
        // chain.mainnet,
        // chain.polygon,
    ],
    [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })],

);

export const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            injectedWallet({ chains }),
            coinbaseWallet({ appName: 'App', chains }),
            walletConnectWallet({ chains }),
        ],
    },
    {
        groupName: 'More',
        wallets: [ledgerWallet({ chains }), trustWallet({ chains }), rainbowWallet({ chains })],
    },
]);

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});
