import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export default function client() {
    const toast = useToast();
    const [clients, setClients] = useState([]);
    const { isAccountConnected, contractRoleProvider, contractRoleSigner } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      // fonction qui récupére les clients  
      setClients(await contractRoleProvider.getListeClients());
    }

    const ajouterClient = async(id, nom) => {
      try {
        console.log("ajouterClient id= "+id+ " nom= "+nom);
        // fonction d'ajout d'un client
        let transaction = await contractRoleSigner.ajouterClient(id, nom);
        await transaction.wait();
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
    const supprimerClient = async(id) => {
      try {
        console.log("client id= "+id);
        // fonction de suppression d'un Client
        let transaction = await contractRoleSigner.supprimerClient(id);
        await transaction.wait();
        getDatas();

        toast({
          title: 'Félicitations !',
          description: "Vous avez bien supprimé un Admin !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors la suppression d'un Admin",
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
                  <table className="table table-striped">
                      <thead>
                          <tr>
                          <th>Nom</th>
                          <th>Id</th>
                          <th></th>
                          </tr>
                      </thead>
                      <tbody>
                      {clients.map(client => (
                        <tr key={client[0]}>
                          <td>{client[1]}</td>
                          <td>{client[0]}</td>
                          <td><a href="#" onClick={() => supprimerClient(client[0])}>x</a></td>
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