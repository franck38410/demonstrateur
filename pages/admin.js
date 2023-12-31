import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export default function admin() {
    const toast = useToast();
    const [admins, setAdmins] = useState([]);
    const { isAccountConnected, contractRoleProvider, contractRoleSigner } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      // fonction qui récupére les admins  
      setAdmins(await contractRoleProvider.getListeAdmins());
    }

    const ajouterAdmin = async(id, nom) => {
      try {
        console.log("ajouterAdmin id= "+id+ " nom= "+nom);
        // fonction d'ajout d'un Admin
        let transaction = await contractRoleSigner.ajouterAdmin(id, nom);
        transaction.wait();
        getDatas();

        toast({
          title: 'Félicitations !',
          description: "Vous avez bien ajouté un Admin !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors l'ajout d'un Admin",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
    const supprimerAdmin = async(id) => {
      try {
        console.log("supprimerAdmin id= "+id);
        // fonction de suppression d'un Admin
        let transaction = await contractRoleSigner.supprimerAdmin(id);
        console.log("transaction= "+transaction.hash);
        transaction.wait();
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
            <Heading>Gestion des Admins</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Nom de l'Admin</FormLabel>
                <Input id="nomAdmin" placeholder="Nom de l'Admin" size="100" />
              </FormControl>
              <FormControl>
                <FormLabel>Id de l'Admin</FormLabel>
                <Input id="idAdmin" placeholder="Identifiant de l'Admin" size="100" />
              </FormControl>

              <Button width="full" mt={4} onClick={() => ajouterAdmin(idAdmin.value,nomAdmin.value)}>Ajouter Admin</Button>

              <FormControl mt={6}>
                {(admins.length ? (
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
                      {admins.map(admin => (
                        <tr key={admin[0]}>
                          <td>{admin[1]}</td>
                          <td>{admin[0]}</td>
                          <td><a href="#" onClick={() => supprimerAdmin(admin[0])}>x</a></td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
                  </center>
                 </div>
                ) :
                (  
                    <Text>Pas de admins</Text>
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