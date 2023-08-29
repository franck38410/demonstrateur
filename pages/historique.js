import { useAccount, useProvider, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import Contract from '/config/Demonstrateur.json';
import { contractAddress, apiKeyAlchemyProvider } from 'config/constants';
import React from 'react';

 function tableau(){
  const { isConnected } = useAccount()
  const provider = useProvider()
  const [json, setJson] = useState(null);
  const urlPolyscan = "https://api-testnet.polygonscan.com/api?module=account&action=txlist&address="+contractAddress+"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+apiKeyAlchemyProvider;
  const urlMumbai = "https://mumbai.polygonscan.com/tx/"

  useEffect(() => {
    if(isConnected) {
      getDatas();
    }
  }, [])

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
                <tr>
                    <td>{info.blockNumber}</td>
                    <td><a href={urlMumbai+info.hash} target="_blank">{info.hash}</a></td>
                    <td>{info.functionName}</td>
                    <td>{info.from}</td>
                    <td>{info.to}</td>
                </tr>
            )
        }
      )
      
      return (
          <div>
             <center>Adresse du contrat : <b>{contractAddress}</b>
              <table class="table table-striped">
                  <thead>
                      <tr>
                      <th>blockNumber</th>
                      <th>hash</th>
                      <th>functionName</th>
                      <th>from</th>
                      <th>to</th>
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