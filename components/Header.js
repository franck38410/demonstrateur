'use client';
import { Flex, Image } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'
import ActiveLink from 'components/ActiveLink'
import RoleLink from 'components/RoleLink'

export default function Header() {
    const { isConnected } = useAccount();
    return (
        <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
            <Image src='/logo.ico' width='100px' height='60px' alt='Atos' />
            {(isConnected ? (  
                    < RoleLink />
            ) : (
                < ActiveLink children="Home" href="/" />
            ))}
            <ConnectButton chainStatus="none" accountStatus="address" label="Connexion Démonstrateur" showBalance={false}/>
        </Flex>
   )
}