'use client';
import { Flex, Image, Button, Stack, useToast } from '@chakra-ui/react';
import { useAccount, useConnect, useDisconnect, useProvider, useSigner, useWebSocketProvider   } from 'wagmi';
import ActiveLink from 'components/ActiveLink';
import RoleLink from 'components/RoleLink';
import { privateProvider, contractDemonstrateurAddress, contractRoleAddress, contractMaterielAddress } from 'config/constants';
import Contract from '/config/Demonstrateur.json';
import ContractRole from '/config/Role.json';
import ContractMateriel from '/config/Materiel.json';
import { ethers } from 'ethers';
import { useWalletContext } from 'utils/WalletContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PrivateKeyConnect from 'components/PrivateKeyConnect';

export default function Header() {
	const router = useRouter();
	const { connect, connectors } = useConnect();
	const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const provider = useProvider();
	// Pas utilisé mais il faudrait aussi etre en websocket par Metamask, cf conf web3dev2.ts si possible
	const webSocketProvider = useWebSocketProvider()
	const { disconnect } = useDisconnect();
	const toast = useToast(); 
	const { isAccountConnected, setIsAccountConnected, addressConnected, setAddressConnected, 
		nomConnected, setNomConnected, versionContrat, setVersionContrat,
		contractDemonstrateurProvider, setContractDemonstrateurProvider, setContractDemonstrateurSigner, 
		contractRoleProvider, setContractRoleProvider, contractRoleSigner, setContractRoleSigner, 
		setContractMaterielProvider, setContractMaterielSigner, 
		privateSigner, setPrivateSigner, setPrivateProvider} = useWalletContext();
		
	const deconnexion = async() => {
		try {
			console.log("deconnexion")
			setIsAccountConnected(false);
			setAddressConnected(null);
			setNomConnected(null);
			setVersionContrat(null);
			setPrivateSigner(null);
			setPrivateProvider(null);
			setContractDemonstrateurProvider(null);
			setContractDemonstrateurSigner(null);
			setContractRoleProvider(null);
			setContractRoleSigner(null);
			setContractMaterielProvider(null);
			setContractMaterielSigner(null);
			disconnect();
		}
		catch {
		  toast({
			title: 'Erreur !',
			description: "Une erreur est survenue lors de la deconnexion",
			status: 'error',
			duration: 5000,
			isClosable: true,
		  })
		}
	}
	const getDatas = async() => {
		if (isAccountConnected)
		{
			// fonction qui récupére le nom du connecté
			setNomConnected(await contractRoleProvider.getNomByAddress(address));
			setVersionContrat(await contractDemonstrateurProvider.getVersion());
		}
		else
		{
			// Version affichée sur le logo
			const providerNonConnecté = new ethers.providers.JsonRpcProvider(privateProvider);
			const provider = new ethers.Contract(contractDemonstrateurAddress, Contract.abi, providerNonConnecté);
			setVersionContrat(await provider.getVersion());
		}
	}

	useEffect(() => {
		console.log("isConnected : "+isConnected+" isAccountConnected : "+isAccountConnected);
		if (isConnected || isAccountConnected)
		{
			console.log("Etat de la connexion : connecté");
		}
		else
		{
			console.log("Etat de la connexion : non connecté");
			getDatas();
		}
		if (isConnected)
		{
			console.log("publicConnect");
			setIsAccountConnected(true);
			setAddressConnected(address);
			console.log("publicConnect address : "+address);
			setContractDemonstrateurProvider(new ethers.Contract(contractDemonstrateurAddress, Contract.abi, provider));
			setContractDemonstrateurSigner(new ethers.Contract(contractDemonstrateurAddress, Contract.abi, signer));
			setContractRoleProvider(new ethers.Contract(contractRoleAddress, ContractRole.abi, provider));
			setContractRoleSigner(new ethers.Contract(contractRoleAddress, ContractRole.abi, signer));
			setContractMaterielProvider(new ethers.Contract(contractMaterielAddress, ContractMateriel.abi, provider));
			setContractMaterielSigner(new ethers.Contract(contractMaterielAddress, ContractMateriel.abi, signer));
			getDatas();
			console.log("fin publicConnect");
		}
	}, [isConnected, signer, provider]);

    return (
        <Flex height="15vh" justifyContent="space-between" alignItems="center" p="2rem">
            {(versionContrat != null ? (  
            	<Image src='/logo.ico' title={'V'+versionContrat} alt='Logo Atos' width='100px' height='50px' alt='Atos' />            
            ) : (
				<Image src='/logo.ico' title={''} alt='Logo Atos' width='100px' height='50px' alt='Atos' />            
            ))}
            {(isConnected || privateSigner != null ? (  
                    < RoleLink />
            ) : (
				<Flex>
					< ActiveLink children="Home" href="/" />
					< ActiveLink children="Aide" href="/aide" />
				</Flex>
            ))}
			{(isConnected || privateSigner != null ? (
			  <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
			    {connectors.map((connector) => (
				<Button
					as={'a'}
					display={{ base: 'none', md: 'inline-flex' }}
					fontSize={'sm'}
					fontWeight={600}
					color={'white'}
					bg={'blue.400'}
					href={'#'}
					_hover={{bg: 'blue.300',}}
					key={connector.id}
					onClick={() => { deconnexion(); router.push("/"); } }
					title={nomConnected + ' : ' + addressConnected}>
					Me deconnecter
				</Button>
			    ))}
			  </Stack>
			) : (
			  <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
				<PrivateKeyConnect fromPage='header' privatekeytest='' />
			    {connectors.map((connector) => (
				<Button
					as={'a'}
					display={{ base: 'none', md: 'inline-flex' }}
					fontSize={'sm'}
					fontWeight={600}
					color={'white'}
					bg={'blue.400'}
					href={'#'}
					_hover={{bg: 'blue.300',}}
					key={connector.id}
					onClick={() => connect({ connector })}>
					Me connecter avec {connector.name}
				</Button>
			    ))}
			  </Stack>
			))}
        </Flex>
   )
}
