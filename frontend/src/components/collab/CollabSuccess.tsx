import React, { useCallback } from 'react';
import { DIFFICULTY } from '../question/utils';
import { Button, Center, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { GetRoomRes } from '../../apis/types/collab.type';

type CollabSuccessProps = {
  getRoomRes: GetRoomRes;
};

export default function CollabSuccess(props: CollabSuccessProps) {
  const navigate = useNavigate();

  const onStart = useCallback(() => {
    navigate('/collab', {
      state: {
        getRoomRes: props.getRoomRes,
      },
    });
  }, []);

  return (
    <Center flexDirection="column" width="fit-content">
      <Text fontSize="xl">Success!</Text>
      <Text fontSize="lg">You have been matched with {props.getRoomRes.altUser}.</Text>
      <Button type="button" onClick={onStart}>
        Let&nbsp;start!
      </Button>
    </Center>
  );
}
