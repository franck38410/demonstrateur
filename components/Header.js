'use client';
import { Flex, Image } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ActiveLink from 'components/ActiveLink'
import { useAccount } from 'wagmi'

export default function Header() {
    const { isConnected } = useAccount()
    return (
        <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
            <Image src='/logo.ico' width='100px' height='60px' alt='Logo' />
            {(isConnected ? (
                <Flex>
                    < ActiveLink children="Home" href="/" />
                    < ActiveLink children="Expédition" href="/expedition" />
                    < ActiveLink children="Tableau de suivi" href="/tableau" />
                    < ActiveLink children="Réception" href="/reception" />
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