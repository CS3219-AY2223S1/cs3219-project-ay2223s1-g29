import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useApiSvc } from '../../context/ApiServiceContext';
import { EmitEvents, ListenEvents } from '../../apis/types/socket.type';
import { useAuth } from '../../context/AuthContext';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import QuestionBox from '../../components/question/QuestionBox';
import { GetRoomRes } from '../../apis/types/collab.type';
import Editor from '../../components/collab/Editor';
import { FaHandsHelping } from 'react-icons/fa';
import { isApiError } from '../../apis/interface';
import ChatBox from '../../components/communication/ChatBox';

type LocationState = {
  getRoomRes?: GetRoomRes;
};

export default function Collab() {
  const state: LocationState = useLocation().state as LocationState;
  const getRoomRes = state?.getRoomRes;

  const navigate = useNavigate();
  const { username, token } = useAuth();
  const {
    collab: { leaveRoom },
    socket,
  } = useApiSvc();

  const [isAllJoined, setIsAllJoined] = useState<boolean>(false);
  const [roomSocks, setRoomSocks] = useState<string[]>([]);

  useEffect(() => {
    if (!getRoomRes?._id || !getRoomRes?.altUser || !getRoomRes?.question) {
      return;
    }

    socket.emit(EmitEvents.JOIN_ROOM, getRoomRes._id, (peeps: string[]) => {
      setRoomSocks(peeps);
      if (peeps.length !== 2) {
        setIsAllJoined(false);
      } else {
        setIsAllJoined(true);
      }
    });

    return () => {
      socket.emit(EmitEvents.LEAVE_ROOM, getRoomRes._id);
    };
  }, [state]);

  useEffect(() => {
    socket.on(ListenEvents.USER_JOIN, (peeps: string[]) => {
      setRoomSocks(peeps);
      if (peeps.length !== 2) {
        setIsAllJoined(false);
      } else {
        setIsAllJoined(true);
      }
    });

    return () => {
      socket.off(ListenEvents.USER_JOIN);
    };
  }, []);

  const onLeaveRoom = useCallback(() => {
    leaveRoom(token).then((res) => {
      if (isApiError(res)) {
        // safely do nothing
        return;
      }
    });
    navigate('/');
  }, []);

  if (!getRoomRes) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Flex width="100vw" minH="100vh" p={4} columnGap={4}>
        <Flex flex={1} direction="column" rowGap={4}>
          <Box bg="blue.800" p={4}>
            <Flex justifyContent="space-between">
              <Text fontSize="3xl" display="flex" columnGap={2} alignItems="center">
                Peer Prep <FaHandsHelping />
              </Text>
              <Button type="button" mt={2} onClick={onLeaveRoom}>
                Leave Room
              </Button>
            </Flex>
            <Text>
              Hello <b>{username}</b>. You are matched with <b>{getRoomRes.altUser}</b>.
            </Text>
          </Box>
          <Box bg="teal.800" flexBasis="74%" h="100%" w="100%" p={4} overflowY="scroll">
            <QuestionBox question={getRoomRes.question} />
          </Box>
          <Box flexBasis="24%" h="100%" w="100%">
            <ChatBox isAllJoined={isAllJoined} roomSocks={roomSocks} getRoomRes={getRoomRes} />
          </Box>
        </Flex>
        <Flex flex={1}>
          <Editor isAllJoined={isAllJoined} roomRes={getRoomRes} />
        </Flex>
      </Flex>
    </>
  );
}
