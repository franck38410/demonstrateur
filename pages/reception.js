import { Flex, Text, Input, Select, Button, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '../../backend/artifacts/contracts/Demonstrateur.sol/Demonstrateur.json';
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
    <Flex height="40vh" justifyContent="space-between" alignItems="center" p="2rem">
        {(isConnected ? (
          <Flex direction="row">
            <Text align="center">Receptionner un matériel :</Text>

            <Flex mt="2rem">
              <Box boxSize='100%'>
                <Input id="client" placeholder='Référence du client' />
                <Input id="itemId" placeholder="Identifiant de l'expédition" />
                <Select id="workflowState" placeholder="Choisir l'option">
                  <option value='0'>Reception</option>
                  <option value='1'>Annulation</option>
                </Select>
                <Button onClick={() => receptionner(client.value,itemId.value,workflowState.value)}>Receptionné le matériel</Button><br/><br/>
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