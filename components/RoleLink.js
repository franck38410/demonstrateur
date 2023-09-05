'use client';
import { Flex } from '@chakra-ui/react';
import { useAccount, useProvider } from 'wagmi'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';
import ActiveLink from 'components/ActiveLink'

function RoleLink() {
    const provider = useProvider();
    const { address, isConnected } = useAccount();
    const [role, setRole] = useState(null);
    useEffect(() => {
        if(isConnected) {
          getDatas();
        }
      }, [role]) 
    
    const getDatas = async() => {
        console.log("getDatas address : "+address);
        const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
        setRole(await contract.getRoleByAddress(address));
    }
    if(role!=null) {
        return (
            <Flex>
                < ActiveLink children="Home" href="/" />
                {role =='Owner' ? ( 
                    < ActiveLink children="Fournisseur" href="/fournisseur" />
                ) : (
                    ""
                )}
                {role =='Owner' ? ( 
                    < ActiveLink children="Client" href="/client" />
                ) : (
                    ""
                )}
                {(role =='Owner' | role =='Fournisseur') ? (
                    < ActiveLink children="Expédition" href="/expedition" />
                ) : (
                    ""
                )}
                {(role =='Owner' | role =='Fournisseur' | role =='Client') ? (
                    < ActiveLink children="Tableau de suivi" href="/tableau" />
                ) : (
                    ""
                )}                   
                {(role =='Owner' | role =='Client') ? (
                    < ActiveLink children="Réception" href="/reception" />
                ) : (
                    ""
                )}
                {(role =='Owner' | role =='Client') ? (
                    < ActiveLink children="Mes Matériels" href="/mesmateriels" />
                ) : (
                    ""
                )}
                {(role =='Owner' | role =='Client' | role =='Fournisseur') ? (
                    < ActiveLink children="Historique" href="/historique" />
                ) : (
                    ""
                )} 
            </Flex>
       )
    } 
}
export default RoleLink