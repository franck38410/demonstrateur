import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';

export default function client() {
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

    const ajouterClient = async(id, nom) => {
      try {
        console.log("ajouterClient id= "+id+ " nom= "+nom);
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        // fonction d'ajout d'un client
        let transaction = await contract.ajouterClient(id, nom);
        console.log("transaction= "+transaction.hash);
        transaction.wait();
        getDatas();

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
          description: "Une erreur est survenue lors l'ajout d'un client",
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
            <Heading>Gestion des clients</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Nom du Client</FormLabel>
                <Input id="nomClient" placeholder="Nom du client" size="100" />
              </FormControl>
              <FormControl>
                <FormLabel>Id du Client</FormLabel>
                <Input id="idClient" placeholder="Identifiant du client" size="100" />
              </FormControl>

              <Button width="full" mt={4} onClick={() => ajouterClient(idClient.value,nomClient.value)}>Ajouter Client</Button>

              <FormControl mt={6}>
                {(clients.length ? (
                  <div>
                  <center>
                  <table class="table table-striped">
                      <thead>
                          <tr>
                          <th>Nom</th>
                          <th>Id</th>
                          </tr>
                      </thead>
                      <tbody>
                      {clients.map(client => (
                        <tr>
                          <td>{client[1]}</td>
                          <td>{client[0]}</td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
                  </center>
                </div>

) :
                (  
                    <Text>Pas de clients</Text>
                ))}
              </FormControl>
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