'use client';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useWalletContext } from 'utils/WalletContext';

export const EventHistorique = async () => {
    const toast = useToast();
    const { contractDemonstrateurProvider, contractHistoriqueSigner } = useWalletContext();

    useEffect(() => {
		if (contractDemonstrateurProvider != null)
		{
			console.log("EventTokenination activé");
            contractDemonstrateurProvider.on("EventTokenination", (fournisseur, nomFournisseur, tokenId, idMateriel, nomMateriel, referenceMateriel, workflowState, event) => {
                console.log("EventTokenination : " + tokenId);
                ajouterHistorique(event.blockNumber, event.transactionHash, tokenId, "Tokenisation", fournisseur, nomFournisseur, "0x0000000000000000000000000000000000000000", "", idMateriel, nomMateriel, referenceMateriel, workflowState);
            })
            return () => {
                contractDemonstrateurProvider.removeAllListeners();
            };
        }
    }, [contractDemonstrateurProvider])

    useEffect(() => {
		if (contractDemonstrateurProvider != null)
		{
			console.log("EventExpedition activé");
            contractDemonstrateurProvider.on("EventExpedition", (fournisseur, nomFournisseur, client, nomClient, tokenId, idMateriel, nomMateriel, referenceMateriel, workflowState, event) => {
                console.log("EventExpedition : " + tokenId);
                ajouterHistorique(event.blockNumber, event.transactionHash, tokenId, "Expedition", fournisseur, nomFournisseur, client, nomClient, idMateriel, nomMateriel, referenceMateriel, workflowState);
            })
            return () => {
                contractDemonstrateurProvider.removeAllListeners();
            };
        }
    }, [contractDemonstrateurProvider])

    useEffect(() => {
		if (contractDemonstrateurProvider != null)
		{
			console.log("EventReception activé");
            contractDemonstrateurProvider.on("EventReception", (fournisseur, nomFournisseur, client, nomClient, tokenId, idMateriel, nomMateriel, referenceMateriel, workflowState, event) => {
                console.log("EventReception : " + tokenId);
                ajouterHistorique(event.blockNumber, event.transactionHash, tokenId, "Reception", fournisseur, nomFournisseur, client, nomClient, idMateriel, nomMateriel, referenceMateriel, workflowState);
            })
            return () => {
                contractDemonstrateurProvider.removeAllListeners();
            };
        }
    }, [contractDemonstrateurProvider])

      const ajouterHistorique = async(blockNumber, transactionHash, tokenId, action, fournisseur, nomFournisseur, client, nomClient, idMateriel, nomMateriel, referenceMateriel, workflowState) => {
        try {
          console.log("ajouterHistorique tokenId= "+tokenId);
          // fonction d'ajout d'un Historique 
          let transaction = await contractHistoriqueSigner.ajouterHistorique(blockNumber, transactionHash, tokenId, action, fournisseur, nomFournisseur, client, nomClient, idMateriel, nomMateriel, referenceMateriel, workflowState);
          await transaction.wait();
          toast({
            title: 'Félicitations !',
            description: "Vous avez bien ajouté un Historique !",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
        }
        catch {
          toast({
            title: 'Erreur !',
            description: "Une erreur est survenue lors l'ajout d'un Historique",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } 
}