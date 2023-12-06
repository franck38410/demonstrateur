import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ipfsFormat } from 'config/constants';
import { useWalletContext } from 'utils/WalletContext';

export default function materiel() {
    const toast = useToast();
    const [materiels, setMateriels] = useState([]);
    const { isAccountConnected, addressConnected, contractMaterielProvider, contractMaterielSigner, privateSigner } = useWalletContext();

    useEffect(() => {
      if(isAccountConnected) {
        getDatas();
      }
    }, [isAccountConnected])
  
    const getDatas = async() => {
      console.log("getDatas addressConnected : "+addressConnected);
      // fonction qui récupére les Materiels  
      setMateriels(await contractMaterielProvider.getListeMateriels());
    }

    useEffect(() => {
        contractMaterielProvider.on("AjouterMaterielEvent", (sender, addressFss, nomMateriel, ipfs, urlImage, event) => {
          console.log(event.blockNumber);
          console.log(event.blockHash);
          console.log(event.transactionHash);
          // adresse du contrat
          console.log(event.address);
          const args = event.args
          console.log(`${ args.sender }`);

          toast({
              title: 'Vous avez bien ajouté le materiel :',
              description: nomMateriel,
              status: 'success',
              duration: 8000,
              isClosable: true,
          })
        })
        return () => {
          contractMaterielProvider.removeAllListeners();
        };
    }, [])

    const ajouterMateriel = async(nomMateriel, cid ) => {
      try {
        console.log("ajouterMateriel nomMateriel= "+nomMateriel+" cid= "+cid);
        const response = await fetch(ipfsFormat.replace('CID', cid));
        const jsonIpfs = await response.json();
        const urlImage = jsonIpfs.image;
        const ipfs = "ipfs://" + cid + "/";
        // fonction d'ajout d'un Materiel 
        let transaction = await contractMaterielSigner.ajouterMateriel(addressConnected, nomMateriel, ipfs, urlImage);
        await transaction.wait();
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
        // fonction de suppression d'un Materiel
        let transaction = await contractMaterielSigner.supprimerMateriel(id);
        await transaction.wait();
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
      {(isAccountConnected ? (
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
                <FormLabel>CID du Materiel</FormLabel>
                <Input id="cid" placeholder="CID du lien IPFS du Materiel" size="100" />
              </FormControl>
              <Button width="full" mt={4} onClick={() => ajouterMateriel(nomMateriel.value, cid.value)}>Ajouter Materiel</Button>

              <FormControl mt={6}>
                {(materiels.length ? (
                  <div>
                  <center>
                  <table className="table table-striped">
                      <thead>
                          <tr>
                          <th>Nom</th>
                          <th>CID</th>
                          <th>Url Image</th>
                          <th></th>
                          </tr>
                      </thead>
                      <tbody>
                      {materiels.map(materiel => (
                        <tr key={materiel[2]}>
                          <td>{materiel[2]}</td>
                          <td>{materiel[3]}</td>
                          <td><a href={materiel[4]} target="_blank">Lien image</a></td>                    
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