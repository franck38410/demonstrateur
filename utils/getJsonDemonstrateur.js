
import { ethers } from "ethers";
import contractAbi from './../config/Demonstrateur.json';
import { contractAddress } from './../config/constants';


 const GetJsonDemonstrateur = async () => {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        //const signer = await provider.getSigner();
        console.log('GetJsonDemonstrateur contractAddress ', contractAddress) ;
        const contractDemonstrateur = new ethers.Contract(contractAddress, contractAbi.abi, provider);

        console.log('GetJsonDemonstrateur contractDemonstrateur ', contractDemonstrateur) ;
        let ipfsURI = await contractDemonstrateur.getUriQuantum();
        console.log('GetJsonDemonstrateur ipfsURI ' + ipfsURI) ;

        const nftURI = (ipfsURI.slice(0, -1)).replace("ipfs", "https") + ".ipfs.nftstorage.link/";
        console.log('GetJsonDemonstrateur json URI ' + nftURI) ;
        const response = await fetch(nftURI);
            if(!response.ok)
              throw new Error(response.statusText);

        const json = await response.json();
        console.log('GetJsonDemonstrateur json description ' + json.description) ;

        return (json);

    };

    export default GetJsonDemonstrateur;