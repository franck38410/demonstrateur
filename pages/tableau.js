import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { contractDemonstrateurAddress } from 'config/constants';
import React from 'react';
import SimpleDate  from '/components/SimpleDate';
import { useWalletContext } from 'utils/WalletContext';

 function tableau(){
  const [commandes, setCommandes] = useState([]);
  const { isAccountConnected, privateProvider, contractDemonstrateurProvider } = useWalletContext();

  useEffect(() => {
    if(isAccountConnected) {
      getDatas();
    }
  }, [isAccountConnected])

  const getDatas = async() => {
    setCommandes(await contractDemonstrateurProvider.getListeCommandes());
  }
  const href = "https://testnets.opensea.io/fr/assets/mumbai/"+contractDemonstrateurAddress+"/";

  return (
    <Flex width="full" align="center" justifyContent="center">
      {(isAccountConnected ? (
        <Box p={2}>
          {(commandes.length ? (
            <div>
              <center>
              <table className="table table-striped">
                  <thead>
                      <tr>
                      <th>Id</th>
                      <th>Fournisseur</th>
                      <th>Client</th>
                      <th>Matériel</th>
                      <th>Référence</th>
                      <th>Date Exp</th>
                      <th>Date Recep</th>
                      <th>Recep par</th>
                      <th>Etat</th>
                      </tr>
                  </thead>
                  <tbody>
                  {commandes.map(commande => (
                    <tr key={commande[0]}>
                        <td><a href={href+commande[0]} target="_blank">{commande[0].toString()}</a></td>
                        <td><span className="infobulle" aria-label={commande[1]}>{commande[2]}</span></td>
                        <td><span className="infobulle" aria-label={commande[3]}>{commande[4]}</span></td>
                        <td>{commande[6]}</td>
                        <td>{commande[7]}</td>
                        <td><SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{commande[9]}</SimpleDate></td>
                        <td><SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{commande[10]}</SimpleDate></td>
                        <td><span className="infobulle" aria-label={commande[11]}>{commande[12]}</span></td>
                        <td>{commande[13]}</td>
                    </tr>
                  ))}
                  </tbody>
              </table>
              </center>
              </div>
                ) :
                (  
                    <Text>Pas de commandes</Text>
                ))}
        </Box>
        ) : (
          <Box boxSize='100%' margin="100">
              <Text align="center">Pas connecté</Text>
          </Box>          
      ))}
  </Flex>

  )
}

export default tableau;
