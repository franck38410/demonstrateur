import { Flex, Text, Box, Center, List,  ListItem, ListIcon, Button} from '@chakra-ui/react';
import { ArrowForwardIcon, Icon, createIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';
import PrivateKeyConnect from 'components/PrivateKeyConnect';

export default function Aide() {
  const [role, setRole] = useState(null);
  const { isAccountConnected, addressConnected, contractRoleProvider } = useWalletContext();
  const CircleIcon = (props) => (
    <Icon viewBox='0 0 200 200' {...props}>
      <path
        fill='currentColor'
        d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
      />
    </Icon>
  )
  useEffect(() => {
    if(isAccountConnected) {
      getDatas();
    }
  }, [isAccountConnected, addressConnected, contractRoleProvider])

  const getDatas = async() => {
    console.log("getDatas : "+addressConnected);
    // fonction qui récupére le role de la personne connecté  
    setRole(await contractRoleProvider.getRoleByAddress(addressConnected));
  }

  return (
    <>
      <Flex>
          <Box boxSize='100%' margin="100">
          <Center><Text color='black' fontSize='4xl'>Pour utiliser le démonstrateur vous devez être connecté.</Text></Center>
          <Center><Text color='black' fontSize='3xl'>Il existe 3 rôles différents :</Text></Center>
              <Center><Text fontSize='3xl'>-</Text></Center>
              <Center>              
              <List fontSize='2xl'>
                <ListItem>    
                  <CircleIcon color='blue.500'/>
                  le rôle '<b>Administrateur</b>' : permet de gérer les fournisseurs, les clients, les matériels ...
                </ListItem>
                <ListItem>
                  <CircleIcon color='blue.500'/>
                  le rôle '<b>Fournisseur</b>' : permet de tokéniser des matériels et de les expédier à des clients ...
                </ListItem>
                <ListItem>
                  <CircleIcon color='blue.500'/>
                  le rôle '<b>Client</b>' : permet de receptionner/retourner des matériels, d'afficher la liste de mes matériels ...
                </ListItem>
              </List>
              </Center>
              <Center><Text fontSize='3xl'>-</Text></Center>
              <Center><Text fontSize='3xl'>Dans le cadre de ce démonstrateur, pour vous connecter, vous pouvez utiliser : </Text></Center>
              <Center>              
              <List fontSize='3xl'>
                <ListItem>    
                  <ListIcon as={ArrowForwardIcon} color='blue.500' />
                  soit votre portefeuille Metamask
                </ListItem>
                <ListItem>    
                  <ListIcon as={ArrowForwardIcon} color='blue.500' />
                  soit en précisant une clé privée
                </ListItem>
                <ListItem>
                  <ListIcon as={ArrowForwardIcon} color='blue.500' />
                  soit à l'aide de ces rôles de tests :
                  <Center>
                    <List fontSize='3xl'>
                      <ListItem>    
                        <PrivateKeyConnect fromPage='aide' privatekeytest='736ba90ed7a5842baf9f61b17e9c04c56ca21efa0f5e12b2bf0140629a3df058' /> en 'TestAdmin' avec un rôle 'Administrateur'
                      </ListItem>
                      <ListItem>
                        <PrivateKeyConnect fromPage='aide' privatekeytest='25c22046e917e9ecd31ca057863ff8da92476c2b8a03edd7f81213037f14d033' /> en 'TestFss' avec un rôle 'Fournisseur'
                      </ListItem>
                      <ListItem>
                        <PrivateKeyConnect fromPage='aide' privatekeytest='f33b0962156b8fbcce0a401998cf3fbae018ddf5f6b9b003a93961fd01f86780' />  en 'TestClient' avec un rôle 'Client'
                      </ListItem>
                    </List>
                  </Center>
                </ListItem>
              </List>   
              </Center>           
          </Box>          
      </Flex>
    </>
  )
}
