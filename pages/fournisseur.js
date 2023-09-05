import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';

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
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      // fonction qui récupére les fournisseurs  
      setFournisseurs(await contract.getListeFournisseurs());
      console.log("getListeFournisseurs= "+await contract.getListeFournisseurs());

    }

    const ajouterFournisseur = async(id, nom) => {
      try {
        console.log("ajouterFournisseur id= "+id+ " nom= "+nom);
        const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
        // fonction d'ajout d'un fournisseur
        let transaction = await contract.ajouterFournisseur(id, nom);
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
                          </tr>
                      </thead>
                      <tbody>
                      {fournisseurs.map(fournisseur => (
                        <tr>
                          <td>{fournisseur[1]}</td>
                          <td>{fournisseur[0]}</td>
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