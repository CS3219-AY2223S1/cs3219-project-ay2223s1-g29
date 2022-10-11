import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApiSvc } from '../../context/ApiServiceContext';
import { EmitEvents } from '../../apis/types/socket.type';
import { useAuth } from '../../context/AuthContext';
import { Box, Flex } from '@chakra-ui/react';
import ChatBox from '../../components/communication/ChatBox';
import QuestionBox from '../../components/question/QuestionBox';
import { GetRoomRes } from '../../apis/types/collab.type';

type LocationState = {
  getRoomRes?: GetRoomRes;
};

export default function Collab() {
  const state: LocationState = useLocation().state as LocationState;
  const { getRoomRes } = state;

  const { token } = useAuth();
  const { socket } = useApiSvc();

  useEffect(() => {
    if (!getRoomRes?.roomId || !getRoomRes?.altUser || getRoomRes?.question) {
      return;
    }

    socket.emit(EmitEvents.JOIN_ROOM, {
      token: token,
      roomId: getRoomRes.roomId,
    });
  }, [state]);

  if (!getRoomRes) {
    return <Navigate to="/" />;
  }

  return (
    <Flex width="100vw" height="100vh" p={4} columnGap={2}>
      <Flex flex={1} direction="column" rowGap={2}>
        <Box flexBasis="74%" h="100%" w="100%">
          <QuestionBox question={getRoomRes.question} />
        </Box>
        <Box flexBasis="24%" h="100%" w="100%">
          <ChatBox />
        </Box>
      </Flex>
      <Box flex={1}>Editor</Box>
    </Flex>
  );
}
