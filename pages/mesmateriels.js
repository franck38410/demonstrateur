import { Heading, Text, Image, Box, Select, SimpleGrid, FormControl, FormLabel } from '@chakra-ui/react';
import { useAccount, useProvider } from 'wagmi';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import React from 'react';
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';
import Materiel from "../components/Materiel"

import GetJsonDemonstrateur from '../utils/getJsonDemonstrateur'

const mesmateriels = () => {
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const [json, setJson] = useState(null);
    const [jsonIpfs, seJsonIpfs] = useState([]);

    useEffect(() => {
        if(isConnected) {
            getDatas();
        }

    }, []);
  
    const getDatas = async() => {
      console.log("getDatas address : "+address);
      const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
      // fonction qui récupére les Ids d'expédition correspondant à l'adresse de l'utilisateur  
      //setIds(await contract.getIdByOwner(address));

      const data = JSON.parse(await contract.getJsonMyMateriels(address));
      setJson(data);

      console.log("getJsonMyMateriels : "+data);
    }

    return ( 
        <Box>
        {isConnected ? 
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