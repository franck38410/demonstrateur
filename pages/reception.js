import { Flex, Text, Input, Select,  Heading, FormControl, FormLabel, Button, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';

export default function reception() {
    const { address, isConnected } = useAccount()
    const { data: signer } = useSigner()
    const toast = useToast()

  const receptionner = async(client, itemId, workflowState) => {
    try {
      console.log("receptionner client= "+client+ "itemId= "+itemId+" workflowState= "+workflowState);
      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      // fonction de reception d'un matériel  
      // @param client Adresse qui valide la reception du matériel
      // @param itemId id du matériel
      // @param workflowState Reception=0 ou Annulation=1
      let transaction = await contract.reception(client, itemId, workflowState);
      transaction.wait();
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien validité le matériel !",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Erreur !',
        description: "Une erreur est survenue lors de la reception",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      {(isConnected ? (
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Receptionner un matériel</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Id du client</FormLabel>
                <Input id="client" placeholder="Référence du client" value={ address } />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Identifiant</FormLabel>
                <Input id="itemId" placeholder="Id de l'expédition" />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Etat</FormLabel>
                <Select id="workflowState" placeholder="Choisir l'état">
                  <option value='0'>Reception</option>
                  <option value='1'>Annulation</option>
              </Select>
              </FormControl>
              <Button width="full" mt={4} onClick={() => receptionner(client.value,itemId.value,workflowState.value)}>Receptionner</Button>
            </form>
          </Box>
        </Box>
        ) : (
          <Box boxSize='100%' margin="100">
              <Text align="center">Pas connecté</Text>
          </Box>          
      ))}
  </Flex>
  )
}
