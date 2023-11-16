import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';
import { ethers } from 'ethers';
import { AddIcon, Icon } from '@chakra-ui/icons'

export default function iot() {
    const toast = useToast();
    const [iots, setIots] = useState([]);
    const { isAccountConnected, contractRoleProvider, contractRoleSigner } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      // fonction qui récupére les IOTs  
      setIots(await contractRoleProvider.getListeIots());
    }
    const newIOT = async() => {
        console.log("newIOT");

        var wallet = ethers.Wallet.createRandom();
        console.log("privateConnect wallet.address= "+wallet.address);
        console.log("privateConnect wallet.address= "+wallet.privateKey);
        idIot.value=wallet.address;
        cleIot.value="Clé : "+wallet.privateKey;
        cleIot.type="Text";
    }

    const ajouterIot = async(id, nom) => {
      try {
        console.log("ajouterIot id= "+id+ " nom= "+nom);

        // fonction d'ajout d'un iot
        let transaction = await contractRoleSigner.ajouterIot(id, nom);
        await transaction.wait();
        getDatas();
        toast({
          title: 'Félicitations !',
          description: "Vous avez bien ajouté un iot !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors l'ajout d'un iot",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
    const supprimerIot = async(id) => {
      try {
        console.log("iot id= "+id);
        // fonction de suppression d'un iot
        let transaction = await contractRoleSigner.supprimerIot(id);
        await transaction.wait();
        getDatas();

        toast({
          title: 'Félicitations !',
          description: "Vous avez bien supprimé un IoT !",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
      catch {
        toast({
          title: 'Erreur !',
          description: "Une erreur est survenue lors la suppression d'un IoT",
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
            <Heading>Gestion des IOTs</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel>Nom de l'IoT</FormLabel>
                <Input id="nomIot" placeholder="Nom de l'IoT" size="100" />
              </FormControl>
              <FormControl>
                <FormLabel>Id de l'IoT</FormLabel>
                <Input id="idIot" placeholder="Identifiant de l'IoT" size="100" />
                <Input type="hidden" id="cleIot" placeholder="Clé privée de l'IoT" size="110" />
                <a href="#" onClick={() => newIOT()}><AddIcon w={6} h={6} color='blue.500'/></a>
              </FormControl>
              <Button width="full" mt={4} onClick={() => ajouterIot(idIot.value,nomIot.value)}>Ajouter IoT</Button>

              <FormControl mt={6}>
                {(iots.length ? (
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
                      {iots.map(iot => (
                        <tr key={iot[0]}>
                          <td>{iot[1]}</td>
                          <td>{iot[0]}</td>
                          <td><a href="#" onClick={() => supprimerIot(iot[0])}>x</a></td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
                  </center>
                </div>

) :
                (  
                    <Text>Pas d'IoTs</Text>
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