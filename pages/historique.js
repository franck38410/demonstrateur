import { Flex, Text, Input, Heading, FormControl, Button, FormLabel, useToast, Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { contractDemonstrateurAddress } from 'config/constants';
import React from 'react';
import SimpleDate  from '/components/SimpleDate';
import { useWalletContext } from 'utils/WalletContext';
import ActiveLink from 'components/ActiveLink'
import WorkflowLabel from 'components/WorkflowLabel'

 function historique(){
  const [historiques, setHistoriques] = useState([]);
  const { isAccountConnected, privateProvider, contractHistoriqueProvider } = useWalletContext();

  useEffect(() => {
    if(isAccountConnected) {
      getDatas();
    }
  }, [isAccountConnected])

  const getDatas = async() => {
    setHistoriques(await contractHistoriqueProvider.getListeHistoriques());
    console.log("historique getDatas= "+await contractHistoriqueProvider.getListeHistoriques());

  }
  const urlMumbaiAddress = "https://mumbai.polygonscan.com/address/";
  const urlMumbaiTx = "https://mumbai.polygonscan.com/tx/";
  const href = "https://testnets.opensea.io/fr/assets/mumbai/"+contractDemonstrateurAddress+"/";

  return (
    <Flex width="full" align="center" justifyContent="center">
      {(isAccountConnected ? (
        <Box p={2}>
          {(historiques.length ? (
            <div>
             <center>Adresse du contrat : <b><a href={urlMumbaiAddress+contractDemonstrateurAddress} target="_blank">{contractDemonstrateurAddress}</a></b>
              <table className="table table-striped">
                  <thead>
                      <tr>
                      <th>block</th>
                      <th>transaction</th>
                      <th>Id Token</th>
                      <th>Materiel</th>
                      <th>Référence</th>
                      <th>action</th>
                      <th>date</th>
                      <th>Fournisseur</th>
                      <th>Client</th>
                      <th>Etat</th>
                      </tr>
                  </thead>
                  <tbody>
                  {historiques.map(historique => (
                    <tr key={historique[0].toString()}>
                        <td>{historique[0].toString()}</td>
                        <td><a href={urlMumbaiTx+historique[1].toString()} target="_blank">{historique[1].toString()}</a></td>
                        <td><a href={href+historique[2]} target="_blank">{historique[2].toString()}</a></td>
                        <td>{historique[10].toString()}</td>
                        <td>{historique[11].toString()}</td>
                        <td>{historique[3].toString()}</td>
                        <td><SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{historique[4]}</SimpleDate></td>
                        <td>{historique[6].toString()}</td>
                        <td>{historique[8].toString()}</td>
                        <td><span className="infobulle" aria-label={historique[12].toString()}>{WorkflowLabel(historique[12].toString())}</span></td>
                    </tr>
                  ))}
                  </tbody>
              </table>
              </center>
              </div>
                ) :
                (  
                    <Text>Pas d'historique</Text>
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

export default historique;