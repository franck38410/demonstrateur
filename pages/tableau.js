import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
// Dev : In production the ABI json will be stored into /config/Demonstrateur.json
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';
import React from 'react'

 function tableau(){
  const { isConnected } = useAccount()
  const provider = useProvider()
  const [json, setJson] = useState(null);

  useEffect(() => {
    if(isConnected) {
      getDatas();
      console.log("useEffect json : "+json);
    }
  }, [])

  const getDatas = async() => {
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider);
    setJson(await contract.getJsonCommandes());
  }

  if(json!=null) {
    const data = JSON.parse(json);
    const href = "https://testnets.opensea.io/fr/assets/mumbai/"+contractAddress+"/";
    const DisplayData=data.map(
        (info)=>{
            return(
                <tr>
                    <td><a href={href+info.id} target="_blank">{info.id}</a></td>
                    <td>{info.fournisseur}</td>
                    <td>{info.client}</td>
                    <td>{info.referenceMateriel}</td>
                    <td>{info.dateExpedition}</td>
                    <td>{info.dateReception}</td>
                    <td>{info.workflowState}</td>
                </tr>
            )
        }
      )
      
      return (
          <div>
             <center>
              <table class="table table-striped">
                  <thead>
                      <tr>
                      <th>Id</th>
                      <th>Fournisseur</th>
                      <th>Client</th>
                      <th>Référence</th>
                      <th>Date Exp</th>
                      <th>Date Recep</th>
                      <th>Etat</th>
                      </tr>
                  </thead>
                  <tbody>
                    {DisplayData}
                  </tbody>
              </table>
             </center>
            </div>
      )
    }       
}

export default tableau;
