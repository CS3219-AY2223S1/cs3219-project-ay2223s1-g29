import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApiSvc } from '../../context/ApiServiceContext';
import { ChatMsg, EmitEvents, ListenEvents } from '../../apis/types/socket.type';
import { useAuth } from '../../context/AuthContext';
import { Box, Flex } from '@chakra-ui/react';
import ChatBox from '../../components/communication/ChatBox';
import QuestionBox from '../../components/question/QuestionBox';
import { GetRoomRes } from '../../apis/types/collab.type';
import Editor from '../../components/collab/Editor';

type LocationState = {
  getRoomRes?: GetRoomRes;
};

export default function Collab() {
  const state: LocationState = useLocation().state as LocationState;
  const getRoomRes = state?.getRoomRes;

  const { username, token } = useAuth();
  const { socket } = useApiSvc();

  const [messages, setMessages] = useState<ChatMsg[]>([]);

  useEffect(() => {
    socket.on(ListenEvents.RCV_MESSAGE, (msg: string) => {
      setMessages((prev) => [...prev, { content: msg, from: getRoomRes?.altUser ?? '' }]);
    });

    return () => {
      socket.off(ListenEvents.RCV_MESSAGE);
    };
  }, []);

  useEffect(() => {
    if (!getRoomRes?.roomId || !getRoomRes?.altUser || getRoomRes?.question) {
      return;
    }

    socket.emit(EmitEvents.JOIN_ROOM, {
      token: token,
      roomId: getRoomRes.roomId,
    });
  }, [state]);

  const onSendChatMsg = useCallback(
    (msg: string) => {
      socket.emit(EmitEvents.SEND_MSG, msg);
      setMessages((prev) => [...prev, { content: msg, from: username }]);
    },
    [username],
  );

  if (!getRoomRes) {
    return <Navigate to="/" />;
  }

  return (
    <Flex width="100vw" height="100vh" p={4} columnGap={4}>
      <Flex flex={1} direction="column" rowGap={4}>
        <Box bg="teal.800" flexBasis="74%" h="100%" w="100%" p={4} overflowY="scroll">
          <QuestionBox question={getRoomRes.question} />
        </Box>
        <Box flexBasis="24%" h="100%" w="100%">
          <ChatBox messages={messages} onSend={onSendChatMsg} />
        </Box>
      </Flex>
      <Box flex={1}>
        <Editor />
      </Box>
    </Flex>
  );
}
