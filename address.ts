export interface Addresses {
  ETH: {
    network: string;
    esContract: string;
    proxyAdmin: string;
    fundsManager: string;
  };
  EVO: {
    reversePlasma: string;
    fundsManager: string;
    proxyAdmin: string;
  };
}

// FIXME - ADD ADDRESSESS 
// for developing with yarn start or npm run start
const development: Addresses = {
  ETH: {
    network: 'rinkeby',
    Multicall: '',
    proxyAdmin: '',
    fundsManager: '',
  },
  EVO: {
    network: 'rinkeby',
    YVault: '',
    1Inch: '',
  },
};

// FIXME - ADD ADDRESSESS 
// for building with yarn build or npm run build
const production: Addresses = {
  ETH: {
    network: 'foundation',
    Multicall: '',
    YVault: '',
    1Inch: '',
  },
  EVO: {
    network: 'foundation',
    Multicall: '',
    Factory: '',
  },
};

export const addresses = { development, production, test };