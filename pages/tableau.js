import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Contract from '/config/Demonstrateur.json';
import { contractAddress } from 'config/constants';
import React from 'react';
import SimpleDate  from '/components/SimpleDate';

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
                    <td><span class="infobulle" aria-label={info.fournisseur}>{info.nomFournisseur}</span></td>
                    <td><span class="infobulle" aria-label={info.client}>{info.nomClient}</span></td>
                    <td>{info.referenceMateriel}</td>
                    <td><SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{info.dateExpedition}</SimpleDate></td>
                    <td><SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{info.dateReception}</SimpleDate></td>
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