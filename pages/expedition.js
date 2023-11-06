import { Flex, Text, Heading, FormControl, Select, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export default function expedition() {
    const toast = useToast();
    const [clients, setClients] = useState([]);
    const [json, setJson] = useState(null);
    const { isAccountConnected, addressConnected, contractDemonstrateurProvider, contractDemonstrateurSigner, contractRoleProvider } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      console.log("getDatas addressConnected : "+addressConnected);
      // fonction qui récupére le json des matériels  
      setJson(JSON.parse(await contractDemonstrateurProvider.getJsonByFournisseur(addressConnected)));      // fonction qui récupére les clients  
      // fonction qui récupére les clients  
      setClients(await contractRoleProvider.getListeClients());
    }

  const expedier = async(client, itemId) => {
    try {
      console.log("expedier client= "+client+ " itemId= "+itemId);
      // fonction d'expédition d'un matériel  
      // @param client Adresse qui va recevoir le matériel
      // @param itemId = no du token
      let transaction = await contractDemonstrateurSigner.expedition(client, itemId);
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
      {(isAccountConnected ? (
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
                        <option key={client[0]} value={client[0]}>{client[1]}</option>
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
                        <option key={info.id} value={info.id}>{info.nomMateriel}-{info.referenceMateriel}</option>
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