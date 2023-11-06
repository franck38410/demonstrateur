'use client';
import { Button, Stack, useToast, Input } from '@chakra-ui/react';
import { privateProvider, contractDemonstrateurAddress, contractRoleAddress, contractMaterielAddress } from 'config/constants';
import Contract from '/config/Demonstrateur.json';
import ContractRole from '/config/Role.json';
import ContractMateriel from '/config/Materiel.json';
import { ethers } from 'ethers';
import { useWalletContext } from 'utils/WalletContext';
import { useRouter } from 'next/router';

function PrivateKeyConnect({ fromPage, privatekeytest }) {
	const router = useRouter();
	const toast = useToast(); 
	const { isAccountConnected, setIsAccountConnected, setAddressConnected, 
		setNomConnected, setVersionContrat,
		setContractDemonstrateurProvider, setContractDemonstrateurSigner, 
		contractRoleProvider, setContractRoleProvider, setContractRoleSigner, 
		setContractMaterielProvider, setContractMaterielSigner, 
		setPrivateSigner, setPrivateProvider} = useWalletContext();

	const privateConnect = async(privateKey) => {
			console.log("privateConnect privateKey= "+privateKey);
			var wallet = new ethers.Wallet(privateKey);
			setAddressConnected(wallet.address);
			console.log("privateConnect wallet.address= "+wallet.address);
			setIsAccountConnected(true);
			const providerConnected = new ethers.providers.JsonRpcProvider(privateProvider);
			console.log("privateConnect av ");
			//const providerConnected = new ethers.providers.WebSocketProvider(privateProvider);
			console.log("privateConnect providerConnected= "+providerConnected);
			const signerConnected = new ethers.Wallet(privateKey, providerConnected);
			setPrivateProvider(providerConnected);
			setPrivateSigner(signerConnected);		
			setContractDemonstrateurProvider(new ethers.Contract(contractDemonstrateurAddress, Contract.abi, providerConnected));
			setContractDemonstrateurSigner(new ethers.Contract(contractDemonstrateurAddress, Contract.abi, signerConnected));
			setContractRoleProvider(new ethers.Contract(contractRoleAddress, ContractRole.abi, providerConnected));
			setContractRoleSigner(new ethers.Contract(contractRoleAddress, ContractRole.abi, signerConnected));
			setContractMaterielProvider(new ethers.Contract(contractMaterielAddress, ContractMateriel.abi, providerConnected));
			setContractMaterielSigner(new ethers.Contract(contractMaterielAddress, ContractMateriel.abi, signerConnected));

			setNomConnected(await (new ethers.Contract(contractRoleAddress, ContractRole.abi, providerConnected)).getNomByAddress(wallet.address));
			setVersionContrat(await (new ethers.Contract(contractDemonstrateurAddress, Contract.abi, providerConnected)).getVersion());

			console.log("privateConnect privateConnect fin");
	}

    return (
		(fromPage === 'header'  ? (
			<Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
			<Input id="privateKey" placeholder="Clé privée" size="64" width='64' />
			<Button as={'a'} display={{ base: 'none', md: 'inline-flex' }}
				fontSize={'sm'} fontWeight={600} color={'white'} bg={'blue.400'} href={'#'} _hover={{bg: 'blue.300',}}
				onClick={() => privateConnect(privateKey.value)}>
			Me connecter par ma clé privée
			</Button>
		</Stack>
		) : (
			<Button as={'a'} display={{ base: 'none', md: 'inline-flex' }}
				fontSize={'sm'} fontWeight={600} color={'white'} bg={'blue.400'} href={'#'} _hover={{bg: 'blue.300',}}
				onClick={() => { privateConnect(privatekeytest); router.push("/"); }}>
				Me connecter</Button>
		))
   )
}
export default PrivateKeyConnect
