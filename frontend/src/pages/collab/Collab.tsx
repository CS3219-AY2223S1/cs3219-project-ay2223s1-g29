import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApiSvc } from '../../context/ApiServiceContext';
import { EmitEvents } from '../../apis/types/socket.type';
import { useAuth } from '../../context/AuthContext';
import { Box, Flex } from '@chakra-ui/react';
import ChatBox from '../../components/communication/ChatBox';

type LocationState = {
  roomId?: string;
  altUser?: string;
};

export default function Collab() {
  const state: LocationState = useLocation().state as LocationState;

  const { username, token } = useAuth();
  const { socket } = useApiSvc();

  useEffect(() => {
    if (!state?.roomId || !state?.altUser) {
      return;
    }

    socket.emit(EmitEvents.JOIN_ROOM, {
      token: token,
      roomId: state.roomId,
    });
  }, [state]);

  if (!state?.roomId || !state?.altUser) {
    return <Navigate to="/" />;
  }

  return (
    <Flex width="100vw" height="100vh">
      <Flex flex={1} direction="column">
        <Box flexBasis="60%">Question</Box>
        <Box>
          <ChatBox />
        </Box>
      </Flex>
      <Box flex={1}>Editor</Box>
    </Flex>
  );
}
