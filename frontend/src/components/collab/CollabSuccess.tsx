import React, { useCallback } from 'react';
import { DIFFICULTY } from '../question/utils';
import { Button, Center, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

type CollabSuccessProps = {
  username: string;
  difficulty: DIFFICULTY;
  roomId: string;
  altUser: string;
};

export default function CollabSuccess(props: CollabSuccessProps) {
  const navigate = useNavigate();

  const onStart = useCallback(() => {
    navigate('/collab', {
      state: {
        roomId: props.roomId,
        altUser: props.altUser,
      },
    });
  }, []);

  return (
    <Center flexDirection="column" width="fit-content">
      <Text fontSize="xl">Success!</Text>
      <Text fontSize="lg">You have been matched with {props.username}.</Text>
      <Button type="button" onClick={onStart}>
        Let&nbsp;start!
      </Button>
    </Center>
  );
}
