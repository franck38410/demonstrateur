'use client';

import { createContext, useContext, useState } from 'react';

const WalletContext = createContext({});

export const WalletContextProvider = ({ children }) => {
  const [isAccountConnected, setIsAccountConnected] = useState(false);
  const [addressConnected, setAddressConnected] = useState(null);
  const [nomConnected, setNomConnected] = useState(null);
  const [versionContrat, setVersionContrat] = useState(null);
  const [privateSigner, setPrivateSigner] = useState(null); 
  const [privateProvider, setPrivateProvider] = useState(null);
  const [contractDemonstrateurProvider, setContractDemonstrateurProvider] = useState(null);
  const [contractDemonstrateurSigner, setContractDemonstrateurSigner] = useState(null);
  const [contractRoleProvider, setContractRoleProvider] = useState(null);
  const [contractRoleSigner, setContractRoleSigner] = useState(null);
  const [contractMaterielProvider, setContractMaterielProvider] = useState(null);
  const [contractMaterielSigner, setContractMaterielSigner] = useState(null); 

  return (
      <WalletContext.Provider value={{ isAccountConnected, setIsAccountConnected, addressConnected, setAddressConnected, 
        nomConnected, setNomConnected, versionContrat, setVersionContrat,
        contractDemonstrateurProvider, setContractDemonstrateurProvider, contractDemonstrateurSigner, setContractDemonstrateurSigner,
        contractRoleProvider, setContractRoleProvider, contractRoleSigner, setContractRoleSigner,
        contractMaterielProvider, setContractMaterielProvider, contractMaterielSigner, setContractMaterielSigner,
        privateSigner, setPrivateSigner, privateProvider, setPrivateProvider }}>
        {children}
      </WalletContext.Provider>
  );
}

export const useWalletContext = () => useContext(WalletContext);