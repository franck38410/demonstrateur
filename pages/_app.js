import '@/../styles/globals.css'

import { WagmiConfig, configureChains, createClient, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { hardhat, polygonMumbai } from "wagmi/chains";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { WalletContextProvider } from 'utils/WalletContext';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { ChakraProvider } from '@chakra-ui/react'

import { apiKeyAlchemyProvider } from 'config/constants';
import { web3dev2 } from 'config/web3dev2';
import Header from 'components/Header'

const { chains, provider, webSocketProvider  } = configureChains(
  [web3dev2, hardhat, polygonMumbai],
  [
    alchemyProvider({ apiKey: apiKeyAlchemyProvider }),
    publicProvider()
  ]
);

const client = createClient({
  autoConnect: false,
  provider,
  webSocketProvider,
  connectors: [ // connectors is to connect your wallet, defaults to InjectedConnector();
    new MetaMaskConnector({ chains }),
/**    
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '...',
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
*/
  ],
});


export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <WalletContextProvider>
          < Header />
          <Component {...pageProps} />
        </WalletContextProvider>
      </WagmiConfig>
    </ChakraProvider>
  )
}
