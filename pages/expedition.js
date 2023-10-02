import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';
import ContractRole from '/config/Role.json';
import { contractRoleAddress } from 'config/constants';

export default function expedition() {
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const toast = useToast();
    const [clients, setClients] = useState([]);
    const [json, setJson] = useState(null);

    useEffect(() => {
      if(isConnected) {
        getDatas();
      }
    }, [])
  
    const getDatas = async() => {
      console.log("getDatas address : "+address);
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      // fonction qui récupére les tokens  
      setJson(JSON.parse(await contract.getJsonByFournisseur(address)));      // fonction qui récupére les clients  

      const contractRole = new ethers.Contract(contractRoleAddress, ContractRole.abi, provider);
      setClients(await contractRole.getListeClients());

    }

  const expedier = async(client, itemId) => {
    try {
      console.log("expedier client= "+client+ " itemId= "+itemId);
      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      // fonction d'expédition d'un matériel  
      // @param client Adresse qui va recevoir le matériel
      // @param itemId = no du token
      let transaction = await contract.expedition(client, itemId);
      console.log("transaction= "+transaction.hash);
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
      {(isConnected ? (
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Expédier un matériel</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl mt={6}>
                <FormLabel>Clients référencés</FormLabel>
                {(clients.length ? (
                    <Select id="destinataire" placeholder="Choisir le destinaire" >
                    {clients.map(client => (
                        <option value={client[0]}>{client[1]}</option>
                    ))}
                  </Select>
                ) :
                (  
                    <Text>Pas de clients</Text>
                ))}
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Matériel à expédier</FormLabel>
                {(json ? (
                  <Select id="itemId">
                    {json.map(info => (
                        <option value={info.id}>{info.nomMateriel}-{info.referenceMateriel}</option>
                    ))}
                  </Select>
                ) :
                (  
                    <Text>Pas de commande</Text>
                ))}
              </FormControl>
              <Button width="full" mt={4} onClick={() => expedier(destinataire.value,itemId.value)}>Expédier</Button>
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