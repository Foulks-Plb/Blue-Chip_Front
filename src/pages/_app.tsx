import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import React from 'react'
import theme from 'theme/theme'

import 'styles/Fonts.css'
import 'styles/App.css'
import 'styles/Contact.css'

import 'react-calendar/dist/Calendar.css'
import 'styles/MiniCalendar.css'
import Head from 'next/head'


import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  Chain,
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { RPC, chainId, addressContract } from 'variables/project'
import ABI from 'variables/abi.json'

function MyApp ({ Component, pageProps }: AppProps) {

  const avalancheChain: Chain = {
    id: chainId,
    name: 'Binance',
    network: 'binance',
    nativeCurrency: {
      decimals: 18,
      name: 'Binance',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: RPC,
    },
    // blockExplorers: {
    //   default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    //   etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    // },
    testnet: false,
  };
  
  const { provider, chains } = configureChains(
    [avalancheChain],
    [
          alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
          publicProvider()
    ]
  );

  // const { chains, provider } = configureChains(
  //   [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  //   [
  //     alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
  //     publicProvider()
  //   ]
  // );
  
  const { connectors } = getDefaultWallets({
    appName: 'Blue-chip',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}> 
      <ChakraProvider theme={theme}>
      <Head>
        <title>Blue Chip</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
      </Head>
      <React.StrictMode>
      <Component {...pageProps} />
      </React.StrictMode>
    </ChakraProvider>
    </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default MyApp
function jsonRpcProvider(arg0: { rpc: (chain: any) => { http: any } }): import("wagmi").ChainProviderFn<import("@wagmi/core").Provider, import("@wagmi/core").WebSocketProvider, Chain> {
  throw new Error('Function not implemented.')
}

