import { useState, useEffect } from 'react';
import { contractDemonstrateurAddress, apiKeyAlchemyProvider } from 'config/constants';
import React from 'react';
import { useWalletContext } from 'utils/WalletContext';

 function tableau(){
  const [json, setJson] = useState(null);
  const urlPolyscan = "https://api-testnet.polygonscan.com/api?module=account&action=txlist&address="+contractDemonstrateurAddress+"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+apiKeyAlchemyProvider;
  const urlMumbaiAddress = "https://mumbai.polygonscan.com/address/";
  const urlMumbaiTx = "https://mumbai.polygonscan.com/tx/";
  const { isAccountConnected } = useWalletContext();

  useEffect(() => {
    if(isAccountConnected) {
      getDatas();
    }
  }, [isAccountConnected])

  const getDatas = async() => {
    const result = await fetch(urlPolyscan);
    console.log("getDatas status : "+result.status);
    const resultJson = await result.json();
    const data = await resultJson.result;
    const st = JSON.stringify(data);
    setJson(st);
  }

  if(json) {
    const data = JSON.parse(json);
    const DisplayData=data.map(
        (info)=>{
            return(
                <tr key={info.hash}>
                    <td><b><a href={urlMumbaiTx+info.hash} target="_blank">{info.hash}</a></b></td>
                    <td>{info.from}</td>
                    <td>{info.functionName}</td>
                </tr>
            )
        }
      )
      
      return (
          <div>
             <center>Adresse du contrat : <b><a href={urlMumbaiAddress+contractDemonstrateurAddress} target="_blank">{contractDemonstrateurAddress}</a></b>
              <table className="table table-striped">
                  <thead>
                      <tr>
                      <th>Transaction</th>
                      <th>Utilisateur</th>
                      <th>Fonction</th>
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