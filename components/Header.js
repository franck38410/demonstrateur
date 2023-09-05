'use client';
import { Flex, Image } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ActiveLink from 'components/ActiveLink'
import { useAccount, useProvider } from 'wagmi'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';

export default function Header() {
    const provider = useProvider();
    const { address, isConnected } = useAccount();
    const [nom, setNom] = useState(null);
    useEffect(() => {
        if(isConnected) {
          getDatas();
        }
      }, [])
    
      const getDatas = async() => {
        console.log("getDatas address : "+address);
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        setNom(await contract.getNomClientByAddress(address));
      }

    return (
        <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
            <Image src='/logo.ico' width='100px' height='60px' alt='Logo' />
            {(isConnected ? (
                <Flex>
                    < ActiveLink children="Home" href="/" />
                    {nom}
                    {nom =='Owner' ? (
                        < ActiveLink children="Client" href="/client" />
                    ) : (
                        ""
                    )}
                    < ActiveLink children="Client" href="/client" />
                    < ActiveLink children="Expédition" href="/expedition" />
                    < ActiveLink children="Tableau de suivi" href="/tableau" />
                    {nom !=='Inconnu' ? (
                        < ActiveLink children="Réception" href="/reception" />
                    ) : (
                        ""
                    )}
                    < ActiveLink children="Mes Matériels" href="/mesmateriels" />
                    < ActiveLink children="Historique" href="/historique" />
                </Flex>
            ) : (
                < ActiveLink children="Home" href="/" />
            ))}
            <ConnectButton label="Connexion Démonstrateur" showBalance={false}/>
        </Flex>
   )
}