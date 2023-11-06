import { Heading, Text, Box, FormControl } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import React from 'react';
import Materiel from "../components/Materiel"
import { useWalletContext } from 'utils/WalletContext';

import GetJsonDemonstrateur from '../utils/getJsonDemonstrateur'

const mesmateriels = () => {
    const [json, setJson] = useState(null);
    const [jsonIpfs, seJsonIpfs] = useState([]);
    const { isAccountConnected, addressConnected, contractDemonstrateurProvider, contractDemonstrateurSigner, contractRoleProvider } = useWalletContext();

    useEffect(() => {
        if(isAccountConnected) {
            getDatas();
        }
    }, [isAccountConnected]);
  
    const getDatas = async() => {
      console.log("getDatas addressConnected : "+addressConnected);
      const data = JSON.parse(await contractDemonstrateurProvider.getJsonMyMateriels(addressConnected));
      setJson(data);
      console.log("getJsonMyMateriels : "+data);
    }

    return ( 
        <Box>
        {isAccountConnected ? 
            (
                <Box>
                    <FormControl mt={6}>
                        {(json ? (                            
                            <Box textAlign="center">
                                <Heading color='blue.600' fontSize='l'>Nombre de matériels : {json.length}</Heading>
                                {json.map(json => (
                                   <Materiel tokenID={json.id} image={json.urlImage} nomMateriel={json.nomMateriel} referenceMateriel={json.referenceMateriel} nomFournisseur={json.nomFournisseur}
                                   dateExpedition={json.dateExpedition} dateReception={json.dateReception} workflowState={json.workflowState} />
                                ))}
                            </Box>
                        ) :
                        (  
                            <Text>Pas de matériel</Text>
                        ))}
                    </FormControl>

                </Box>
            ) :
            (  
                <Text>non connecté</Text>
            )
        }
        </Box>
    );
    };
    
export default mesmateriels;