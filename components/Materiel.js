import { useToast, Center,  Text,  Card, CardBody, CardFooter, Image, Stack, Heading, Divider, ButtonGroup, Button, Spinner  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAccount, useProvider, useSigner } from 'wagmi'
import SimpleDate  from '/components/SimpleDate';

import { ethers } from 'ethers';

function Materiel(props) {
    return (
      <Center mt="0px">
      <Card maxW='md'>
        <CardBody>
        <Heading size='md'>Nom du matériel : {props.nomMateriel}</Heading>
          <Image
            src={props.image}
            alt={props.description}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>            
            <Text>Fournisseur : <b>{props.nomFournisseur}</b></Text>
            <Text>Référence du matériel : {props.referenceMateriel}</Text>
            <Text>Date d'expédition : <SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{props.dateExpedition}</SimpleDate></Text>
            <Text>Date de reception : <SimpleDate dateFormat="DMY" dateSeparator="/"  timeSeparator=":">{props.dateReception}</SimpleDate></Text>
            <Text>Etat : {props.workflowState}</Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'></ButtonGroup>
        </CardFooter>
      </Card>
      </Center>
    );
}
  export default Materiel;
  