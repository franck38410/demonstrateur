import { Flex, Text, Select,  Heading, FormControl, FormLabel, Button, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export default function reception() {
    const toast = useToast();
    const [json, setJson] = useState(null);
    const { isAccountConnected, addressConnected, nomConnected, contractDemonstrateurProvider, contractDemonstrateurSigner, contractRoleProvider } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      console.log("getDatas addressConnected : "+addressConnected);
      // fonction qui récupére les Ids d'expédition correspondant à l'adresse de l'utilisateur  
      setJson(JSON.parse(await contractDemonstrateurProvider.getJsonByClient(addressConnected)));
    }

  const receptionner = async(itemId, workflowState) => {
      console.log("receptionner itemId= "+itemId+" workflowState= "+workflowState);
      // fonction de reception d'un matériel  
      // @param itemId id du matériel
      // @param workflowState Reception=0 ou Annulation=1
      let transaction = await contractDemonstrateurSigner.reception(itemId, workflowState);
      transaction.wait();
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien validité le matériel !",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

  }

  return (
    <Flex width="full" align="center" justifyContent="center">
      {(isAccountConnected ? (
        <Box p={2}>
          <Box textAlign="center">
            <Heading>Receptionner un matériel</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
            <FormControl>
                <FormLabel>Nom du client connecté : { nomConnected }</FormLabel>
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Matériel à réceptionner</FormLabel>
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

              <FormControl mt={6}>
                <FormLabel>Action</FormLabel>
                <Select id="workflowState" placeholder="Choisir l'état">
                  <option value='0'>Reception</option>
                  <option value='1'>Annulation</option>
                  <option value='2'>Renvoyer</option>
                </Select>
              </FormControl>
              <Button width="full" mt={4} onClick={() => receptionner(itemId.value,workflowState.value)}>Receptionner</Button>
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
