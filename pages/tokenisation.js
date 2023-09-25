import { Flex, Text, Input, Heading, FormControl, Select, Button, FormLabel, useToast, Image, Box } from '@chakra-ui/react';
import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import ContractMateriel from '/config/Materiel.json';
import { contractAddress, materielAddress } from 'config/constants';

export default function tokenisation() {
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
      const contractMateriel = new ethers.Contract(materielAddress, ContractMateriel.abi, provider);
      // fonction qui récupére les clients  
      setMateriels(await contractMateriel.getListeMateriels());
      console.log("getListeMateriels= "+await contractMateriel.getListeMateriels());
    }

  const tokenisation = async(nomMateriel, referenceMateriel) => {
    try {
      console.log("tokenisation nomMateriel= "+nomMateriel+" referenceMateriel= "+referenceMateriel);
      var idMateriel = "";
      var urlImage = "";
      var uriMateriel = "";
      for (var m in materiels){
        if (materiels[m].nomMateriel == nomMateriel)
        {
          idMateriel = materiels[m].idMateriel;
          urlImage = materiels[m].urlImage;
          uriMateriel = materiels[m].ipfs;
          console.log(idMateriel);
        }
      }

      const contract = new ethers.Contract(contractAddress, Contract.abi, signer);
      // fonction de tokenisation d'un matériel  
      // @param idMateriel id du materiel
      // @param uriMateriel lien ipfs du materiel
      // @param urlImage url image
      // @param referenceMateriel la référence du materiel
      let transaction = await contract.tokenisation(idMateriel, uriMateriel, urlImage, referenceMateriel);
      console.log("transaction= "+transaction.hash);
      transaction.wait();
      toast({
        title: 'Félicitations !',
        description: "Vous avez bien tokenisé le matériel !",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch {
      toast({
        title: 'Erreur !',
        description: "Une erreur est survenue lors de la tokenisation",
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
            <Heading>Tokéniser un matériel</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl mt={6}>
              <FormLabel>Matériel</FormLabel>
                {(materiels.length ? (
                  <Select id="nomMateriel" placeholder="Choisir le matériel">
                    {materiels.map(materiel => (
                        <option>{materiel.nomMateriel}</option>
                    ))}
                  </Select>
                ) :
                (  
                    <Text>Pas de materiels</Text>
                ))}
              </FormControl>
              <FormControl mt={6}>
                <FormLabel>Référence</FormLabel>
                <Input id="referenceMateriel" placeholder="Référence du matériel" />
              </FormControl>
              <Button width="full" mt={4} onClick={() => tokenisation(nomMateriel.value,referenceMateriel.value)}>Tokéniser</Button>
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