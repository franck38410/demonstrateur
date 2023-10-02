import { Flex, Text, Box, Heading, Center, List,  ListItem, ListIcon} from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { MdCheckCircle, CheckCircleIcon } from '@chakra-ui/icons'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <>
      <Flex>
        {(isConnected ? (
          <Box boxSize='100%' margin="100">
            <Text align="center">Tu es bien connecté tu peux utiliser le démonstrateur ! </Text>
          </Box>  
        ) : (
          <Box boxSize='100%' margin="100">
              <Center><Text color='black' fontSize='4xl'>Ce démonstrateur Atos permet de tokéniser des actifs du monde réel.</Text></Center>
              <Center><Text fontSize='3xl'>-</Text></Center>
              <Center>
              <List>
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
              <Center><Text fontSize='3xl'>Merci de vous connecter avec le bouton 'Connexion Démonstrateur'.</Text></Center>
          </Box>          
        ))}
      </Flex>
    </>
  )
}
