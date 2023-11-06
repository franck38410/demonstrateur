import { useState, useEffect } from 'react';
import { contractAddress } from 'config/constants';
import React from 'react';
import SimpleDate  from '/components/SimpleDate';
import { useWalletContext } from 'utils/WalletContext';

 function tableau(){
  const [json, setJson] = useState(null);
  const { isAccountConnected, privateProvider, contractDemonstrateurProvider } = useWalletContext();

  useEffect(() => {
    if(isAccountConnected) {
      getDatas();
      console.log("useEffect json : "+json);
    }
  }, [isAccountConnected])

  const getDatas = async() => {
    setJson(await contractDemonstrateurProvider.getJsonCommandes());
  }

  if(json!=null) {
    const data = JSON.parse(json);
    const href = "https://testnets.opensea.io/fr/assets/mumbai/"+contractAddress+"/";
    const DisplayData=data.map(
        (info)=>{
            return(
                <tr key={info.id}>
                    <td><a href={href+info.id} target="_blank">{info.id}</a></td>
                    <td><span className="infobulle" aria-label={info.fournisseur}>{info.nomFournisseur}</span></td>
                    <td><span className="infobulle" aria-label={info.client}>{info.nomClient}</span></td>
                    <td>{info.nomMateriel}</td>
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