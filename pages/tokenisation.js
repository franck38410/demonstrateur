import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';

export default function tokenisation() {
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const toast = useToast();
    const [clients, setClients] = useState([]);

    useEffect(() => {
      if(isConnected) {
        getDatas();
      }
    }, [])
  
    const getDatas = async() => {
      console.log("getDatas address : "+address);
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      // fonction qui récupére les clients  
      setClients(await contract.getListeClients());
      console.log("getListeClients= "+await contract.getListeClients());

    }

    const ajouterClient = async(address, nom) => {
      try {
        console.log("ajouterClient address= "+address+ " nom= "+nom);
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        // fonction d'ajout d'un client
        let transaction = await contract.ajouterClient(address, "Test1");
        console.log("transaction= "+transaction.hash);
        transaction.wait();
        toast({
          title: 'Félicitations !',
          description: "Vous avez bien ajouté un client !",
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

  const tokenisation = async(typeMateriel, referenceMateriel) => {
    try {
      console.log("tokenisation typeMateriel= "+typeMateriel+" referenceMateriel= "+referenceMateriel);
      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      // fonction de tokenisation d'un matériel  
      // @param typeMateriel quantum=0 s3200=1
      // @param referenceMateriel la référence du materiel
      let transaction = await contract.tokenisation(typeMateriel, referenceMateriel);
      console.log("transaction= "+transaction.hash);
      transaction.wait();
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien tokenisé le matériel !",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Erreur !',
        description: "Une erreur est survenue lors de la tokenisation",
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
            <Heading>Tokéniser un matériel</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
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
              <Button width="full" mt={4} onClick={() => tokenisation(typeMateriel.value,referenceMateriel.value)}>Tokéniser</Button>
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