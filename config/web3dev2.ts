import { Chain } from '@wagmi/core'
 
export const web3dev2 = {
  id: 1339,
  name: 'Web3dev2',
  network: 'web3dev2',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['http://40.85.141.229:8585'] },
    default: { http: ['http://40.85.141.229:8585'] },
  },
} as const satisfies Chain