import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export default function fournisseur() {
    const toast = useToast();
    const [fournisseurs, setFournisseurs] = useState([]);
    const { isAccountConnected, contractRoleProvider, contractRoleSigner } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      // fonction qui récupére les fournisseurs  
      setFournisseurs(await contractRoleProvider.getListeFournisseurs());
    }

    const ajouterFournisseur = async(id, nom) => {
      try {
        console.log("ajouterFournisseur id= "+id+ " nom= "+nom);
        // fonction d'ajout d'un fournisseur
        let transaction = await contractRoleSigner.ajouterFournisseur(id, nom);
        await transaction.wait();
        getDatas();
        toast({
          title: 'Félicitations !',
          description: "Vous avez bien ajouté un Fournisseur !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors l'ajout d'un Fournisseur",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
    const supprimerFournisseur = async(id) => {
      try {
        console.log("supprimerFournisseur id= "+id);
        // fonction de suppression d'un fourniseur
        let transaction = await contractRoleSigner.supprimerFournisseur(id);
        await transaction.wait();
        getDatas();

        toast({
          title: 'Félicitations !',
          description: "Vous avez bien supprimé un fourniseur !",
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
            <Heading>Gestion des fournisseurs</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Nom du Fournisseur</FormLabel>
                <Input id="nomFournisseur" placeholder="Nom du fournisseur" size="100" />
              </FormControl>
              <FormControl>
                <FormLabel>Id du Fournisseur</FormLabel>
                <Input id="idFournisseur" placeholder="Identifiant du fournisseur" size="100" />
              </FormControl>

              <Button width="full" mt={4} onClick={() => ajouterFournisseur(idFournisseur.value,nomFournisseur.value)}>Ajouter Fournisseur</Button>

              <FormControl mt={6}>
                {(fournisseurs.length ? (
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
                      {fournisseurs.map(fournisseur => (
                        <tr key={fournisseur[0]}>
                          <td>{fournisseur[1]}</td>
                          <td>{fournisseur[0]}</td>
                          <td><a href="#" onClick={() => supprimerFournisseur(fournisseur[0])}>x</a></td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
                  </center>
                 </div>
                ) :
                (  
                    <Text>Pas de fournisseurs</Text>
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