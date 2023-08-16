import { Flex, Text, Input, Button, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';

export default function expedition() {
    const { address, isConnected } = useAccount()
    const { data: signer } = useSigner()
    const toast = useToast()

  const expedier = async(client,typeMateriel, referenceMateriel) => {
    try {
      console.log("expedier client= "+client+ "typeMateriel= "+typeMateriel+" referenceMateriel= "+referenceMateriel);
      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      // fonction d'expédition d'un matériel  
      // @param client Adresse qui va recevoir le matériel
      // @param typeMateriel quantum=0 s3200=1
      // @param referenceMateriel la référence du materiel
      let transaction = await contract.expedition(client, typeMateriel, referenceMateriel);
      transaction.wait();
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien expédié le matériel !",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Erreur !',
        description: "Une erreur est survenue lors de l'expédition",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex height="40vh" justifyContent="space-between" alignItems="center" p="2rem">
        {(isConnected ? (
          <Flex direction="row">
            <Text align="center">Expédier un matériel :</Text>
            <Input id="client" placeholder='Référence du client' />
            <Flex mt="2rem">
              <Box boxSize='50%'>
                <Text align="left">Atos Quantum</Text>
                <Input id="refQuantum" placeholder='Référence du serveur Quantum' />
                <Button onClick={() => expedier(client.value,0,refQuantum.value)}>Expédié Quantum</Button><br/><br/>
              </Box>  
              <Box boxSize='50%'>
                <Text align="left" >Atos S3200</Text>
                <Input id="refS3200" placeholder='Référence du serveur Quantum' />
                <Button onClick={() => expedier(client.value,1,refS3200.value)}>Expédié S3200</Button><br/><br/>
              </Box>             
            </Flex>
          </Flex>
        ) : (
            <Box boxSize='100%' margin="100">
                <Text align="center">Pas connecté</Text>
            </Box>          
        ))}
    </Flex>
  )
}
