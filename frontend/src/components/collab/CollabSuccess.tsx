import React, { useState } from 'react';
import { Button, Center, Text } from '@chakra-ui/react';
import { GetRoomRes } from '../../apis/types/collab.type';
import CollabNavigate from '../../pages/collab/CollabNavigate';

type CollabSuccessProps = {
  getRoomRes: GetRoomRes;
};

export default function CollabSuccess(props: CollabSuccessProps) {
  const [hasNavigated, setHasNavigated] = useState<boolean>(false);

  if (hasNavigated) {
    return <CollabNavigate getRoomRes={props.getRoomRes} />;
  }

  return (
    <Center flexDirection="column" width="fit-content">
      <Text fontSize="xl">Success!</Text>
      <Text fontSize="lg">You have been matched with {props.getRoomRes.altUser}.</Text>
      <Button type="button" onClick={() => setHasNavigated(true)}>
        Let&nbsp;start!
      </Button>
    </Center>
  );
}
