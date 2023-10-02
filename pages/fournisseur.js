import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import ContractRole from '/config/Role.json';
import { contractRoleAddress } from 'config/constants';

export default function fournisseur() {
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const toast = useToast();
    const [fournisseurs, setFournisseurs] = useState([]);

    useEffect(() => {
      if(isConnected) {
        getDatas();
      }
    }, [])
  
    const getDatas = async() => {
      console.log("getDatas address : "+address);
      const contractRole = new ethers.Contract(contractRoleAddress, ContractRole.abi, provider);
      // fonction qui récupére les fournisseurs  
      setFournisseurs(await contractRole.getListeFournisseurs());
    }

    const ajouterFournisseur = async(id, nom) => {
      try {
        console.log("ajouterFournisseur id= "+id+ " nom= "+nom);
        const contractRole = new ethers.Contract(contractRoleAddress, ContractRole.abi, signer);
        // fonction d'ajout d'un fournisseur
        let transaction = await contractRole.ajouterFournisseur(id, nom);
        console.log("transaction= "+transaction.hash);
        transaction.wait();
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
        const contractRole = new ethers.Contract(contractRoleAddress, ContractRole.abi, signer);
        // fonction de suppression d'un fourniseur
        let transaction = await contractRole.supprimerFournisseur(id);
        console.log("transaction= "+transaction.hash);
        transaction.wait();
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
      {(isConnected ? (
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
                  <table class="table table-striped">
                      <thead>
                          <tr>
                          <th>Nom</th>
                          <th>Id</th>
                          <th></th>
                          </tr>
                      </thead>
                      <tbody>
                      {fournisseurs.map(fournisseur => (
                        <tr>
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