import { Heading, Text, Image, Box, SimpleGrid } from '@chakra-ui/react';

import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import GetJsonDemonstrateur from '../utils/getJsonDemonstrateur'

const mesmateriels = () => {
    const { isConnected } = useAccount()
    const [json, setJson] = useState(null);

    useEffect(() => {
        async function fetchData() {
            setJson(GetJsonDemonstrateur());
        }
        fetchData();
    }, []);

    return ( 
        <Box>
        <Heading>Mes matériels</Heading>
        <SimpleGrid columns={[1, null]} spacing='40px'>
        {isConnected ? 
            (
                <Box>
                    {(json ? (
                        <SimpleGrid columns={[1, null, 2, null]} spacing='10px'>
                            <Image src={json.image}  width="100" height="100" alt={json.description} borderRadius='lg' />
                        </SimpleGrid>
                    ) :
                    (  
                        <Text>Json Contract not accessible</Text>
                    ))}
                </Box>
            ) :
            (  
                <Text>non connecté</Text>
            )
        }
        </SimpleGrid>
        </Box>
    );
    };
    
export default mesmateriels;