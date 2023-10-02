'use client';
import { Flex } from '@chakra-ui/react';
import { useAccount, useProvider } from 'wagmi'
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import ContractRole from '/config/Role.json';
import { contractRoleAddress } from 'config/constants';
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
        const contractRole = new ethers.Contract(contractRoleAddress, ContractRole.abi, provider);
        setRole(await contractRole.getRoleByAddress(address));
    }
    if(role!=null) {
        return (
            <Flex>
                < ActiveLink children="Home" href="/" />
                {role =='Admin' ? ( 
                    < ActiveLink children="Admin" href="/admin" />
                ) : (
                    ""
                )}
                {role =='Admin' ? ( 
                    < ActiveLink children="Fournisseur" href="/fournisseur" />
                ) : (
                    ""
                )}
                {role =='Admin' ? ( 
                    < ActiveLink children="Client" href="/client" />
                ) : (
                    ""
                )}
                {(role =='Admin' | role =='Fournisseur') ? (
                    < ActiveLink children="Matériel" href="/materiel" />
                ) : (
                    ""
                )}
                {(role =='Admin' | role =='Fournisseur') ? (
                    < ActiveLink children="Tokénisation" href="/tokenisation" />
                ) : (
                    ""
                )}
                {(role =='Admin' | role =='Fournisseur' | role =='Client') ? (
                    < ActiveLink children="Tableau de suivi" href="/tableau" />
                ) : (
                    ""
                )} 
                {(role =='Admin' | role =='Fournisseur') ? (
                    < ActiveLink children="Expédition" href="/expedition" />
                ) : (
                    ""
                )}                  
                {(role =='Admin' | role =='Client') ? (
                    < ActiveLink children="Réception" href="/reception" />
                ) : (
                    ""
                )}
                {(role =='Admin' | role =='Client' | role =='Fournisseur') ? (
                    < ActiveLink children="Mes Matériels" href="/mesmateriels" />
                ) : (
                    ""
                )}
                {(role =='Admin' | role =='Client' | role =='Fournisseur') ? (
                    < ActiveLink children="Historique" href="/historique" />
                ) : (
                    ""
                )} 
            </Flex>
       )
    } 
}
export default RoleLink