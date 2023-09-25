import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import ContractMateriel from '/config/Materiel.json';
import { materielAddress } from 'config/constants';

export default function materiel() {
    const { address, isConnected } = useAccount();
    const { data: signer } = useSigner();
    const provider = useProvider();
    const toast = useToast();
    const [materiels, setMateriels] = useState([]);

    useEffect(() => {
      if(isConnected) {
        getDatas();
      }
    }, [])
  
    const getDatas = async() => {
      console.log("getDatas address : "+address);
      const contract = new ethers.Contract(materielAddress, ContractMateriel.abi, provider);
      // fonction qui récupére les Materiels  
      setMateriels(await contract.getListeMateriels());
      console.log("getListeMateriels= "+await contract.getListeMateriels());

    }

    const ajouterMateriel = async(nomMateriel, ipfs, urlImage) => {
      try {
        console.log("ajouterMateriel nomMateriel= "+nomMateriel+" ipfs= "+ipfs+" urlImage= "+urlImage);
        const contract = new ethers.Contract(materielAddress, ContractMateriel.abi, signer);
        // fonction d'ajout d'un Materiel
        let transaction = await contract.ajouterMateriel(address, nomMateriel, ipfs, urlImage);
        console.log("transaction= "+transaction.hash);
        transaction.wait();
        getDatas();

        toast({
          title: 'Félicitations !',
          description: "Vous avez bien ajouté un Materiel !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors l'ajout d'un Materiel",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
    const supprimerMateriel = async(id) => {
      try {
        console.log("Materiel id= "+id);
        const contract = new ethers.Contract(materielAddress, Contract.abi, signer);
        // fonction de suppression d'un Materiel
        let transaction = await contract.supprimerMateriel(id);
        console.log("transaction= "+transaction.hash);
        transaction.wait();
        getDatas();

        toast({
          title: 'Félicitations !',
          description: "Vous avez bien supprimé un Materiel !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors la suppression d'un Materiel",
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
            <Heading>Gestion des Materiels</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Nom du Materiel</FormLabel>
                <Input id="nomMateriel" placeholder="Nom du Materiel" size="100" />
              </FormControl>
              <FormControl>
                <FormLabel>Lien ipfs du Materiel</FormLabel>
                <Input id="ipfs" placeholder="Référence du Materiel" size="100" />
              </FormControl>
              <FormControl>
                <FormLabel>Url de l'image</FormLabel>
                <Input id="urlImage" placeholder="url de l'image" size="100" />
              </FormControl>
              <Button width="full" mt={4} onClick={() => ajouterMateriel(nomMateriel.value, ipfs.value, urlImage.value)}>Ajouter Materiel</Button>

              <FormControl mt={6}>
                {(materiels.length ? (
                  <div>
                  <center>
                  <table class="table table-striped">
                      <thead>
                          <tr>
                          <th>Nom</th>
                          <th>Ipfs</th>
                          <th>Url Image</th>
                          <th></th>
                          </tr>
                      </thead>
                      <tbody>
                      {materiels.map(materiel => (
                        <tr>
                          <td>{materiel[2]}</td>
                          <td>{materiel[3]}</td>
                          <td>{materiel[4]}</td>
                          <td><a href="#" onClick={() => supprimerMateriel(materiel[0])}>x</a></td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
                  </center>
                </div>

) :
                (  
                    <Text>Pas de Materiels</Text>
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