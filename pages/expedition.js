import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '../../backend/artifacts/contracts/Demonstrateur.sol/Demonstrateur.json';
import { contractAddress } from 'config/constants';

export default function expedition() {
    const { address, isConnected } = useAccount()
    const { data: signer } = useSigner()
    const toast = useToast()

  const expedier = async(client, typeMateriel, referenceMateriel) => {
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
    <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Expédier un matériel</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel>Client</FormLabel>
              <Input id="client" placeholder="Référence du client" />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Matériel</FormLabel>
              <Select id="typeMateriel" placeholder="Choisir le matériel">
                  <option value='0'>Atos Quantum</option>
                  <option value='1'>Atos S3200</option>
            </Select>
            </FormControl>
            <FormControl mt={6}>
              <FormLabel>Référence</FormLabel>
              <Input id="referenceMateriel" placeholder="Référence du matériel" />
            </FormControl>
            <Button width="full" mt={4} onClick={() => expedier(client.value,typeMateriel.value,referenceMateriel.value)}>Expédier</Button>
          </form>
        </Box>
      </Box>
    </Flex>

  )
}
