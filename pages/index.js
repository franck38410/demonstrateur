import { Flex, Text, Box, Center, List,  ListItem, ListIcon} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export default function Home() {
  const [role, setRole] = useState(null);
  const { isAccountConnected, addressConnected, nomConnected, contractRoleProvider } = useWalletContext();

  useEffect(() => {
    if(isAccountConnected) {
      getDatas();
    }
  }, [isAccountConnected])

  const getDatas = async() => {
    // fonction qui récupére le role de la personne connecté  
    setRole(await contractRoleProvider.getRoleByAddress(addressConnected));
  }

  return (
    <>
      <Flex>
        {(isAccountConnected ? (
          <Box boxSize='100%' margin="100">
            <Center><Text color='black' fontSize='3xl'>Bonjour {nomConnected}, tu es bien connecté avec le rôle {role}, tu peux utiliser le démonstrateur ! </Text></Center>
          </Box>  
        ) : (
          <Box boxSize='100%' margin="100">
              <Center><Text color='black' fontSize='4xl'>Ce démonstrateur Atos permet de tokéniser des actifs du monde réel sur une blockchain privée.</Text></Center>
              <Center><Text fontSize='3xl'>-</Text></Center>
              <Center>
              <List fontSize='2xl'>
                <ListItem>    
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Gérer des rôles : admin, fournisseur, client
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Tokéniser des matériels
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Expédier un matériel
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Réceptionner un matériel
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Afficher mes matériels
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  Afficher un tableau de suivi
                </ListItem>
              </List>
              </Center>
              <Center><Text fontSize='3xl'>-</Text></Center>
              <Center><Text fontSize='3xl'>Merci de vous connecter, vous pouvez utiliser l'aide pour cela.</Text></Center>
          </Box>          
        ))}
      </Flex>
    </>
  )
}
