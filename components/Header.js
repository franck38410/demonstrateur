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
    const [role, setRole] = useState(null);
    useEffect(() => {
        if(isConnected) {
          getDatas();
        }
      }, [])
    
    const getDatas = async() => {
    console.log("getDatas address : "+address);
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    setRole(await contract.getRoleByAddress(address));
    }

    return (
        <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
            <Image src='/logo.ico' width='100px' height='60px' alt='Atos' />
            {(isConnected ? ( 
                <Flex>
                    < ActiveLink children="Home" href="/" />
                    {role =='Owner' ? (
                        < ActiveLink children="Client" href="/client" />
                    ) : (
                        ""
                    )}
                    {role =='Owner' ? (
                        < ActiveLink children="Expédition" href="/expedition" />
                    ) : (
                        ""
                    )}
                    {role =='Owner' ? (
                        < ActiveLink children="Tableau de suivi" href="/tableau" />
                    ) : (
                        ""
                    )}                   
                    {role =='Owner' || role !=='Client' ? (
                        < ActiveLink children="Réception" href="/reception" />
                    ) : (
                        ""
                    )}
                    {role =='Owner' || role !=='Client' ? (
                        < ActiveLink children="Mes Matériels" href="/mesmateriels" />
                    ) : (
                        ""
                    )}
                    {role =='Owner' || role !=='Client' ? (
                        < ActiveLink children="Historique" href="/historique" />
                    ) : (
                        ""
                    )}                    
                </Flex>
            ) : (
                < ActiveLink children="Home" href="/" />
            ))}
            <ConnectButton label="Connexion Démonstrateur" showBalance={false}/>
        </Flex>
   )
}