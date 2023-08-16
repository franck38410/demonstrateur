import { Flex, Text, Box } from '@chakra-ui/react';
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <>
      <Flex>
        {(isConnected ? (
          <Box boxSize='100%' margin="100">
            <Text align="center">Tu es bien connecté tu peux utiliser le démonstrateur !</Text>
          </Box>  
        ) : (
          <Box boxSize='100%' margin="100">
              <Text align="center">Le démonstrateur Atos permet : d'expédier un serveur, afficher un tableau de suivi, réceptionner un serveur.
                                  <br/><br/>
                                   Merci de vous connecter avec le bouton 'Connexion Démonstrateur'.</Text>
          </Box>          
        ))}
      </Flex>
    </>
  )
}
