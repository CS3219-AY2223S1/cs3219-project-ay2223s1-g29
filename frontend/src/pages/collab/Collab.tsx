import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useApiSvc } from '../../context/ApiServiceContext';
import { ChatMsg, EmitEvents, ListenEvents } from '../../apis/types/socket.type';
import { useAuth } from '../../context/AuthContext';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import QuestionBox from '../../components/question/QuestionBox';
import { GetRoomRes } from '../../apis/types/collab.type';
import Editor from '../../components/collab/Editor';
import { FaHandsHelping, FaUserAlt } from 'react-icons/fa';
import { isApiError } from '../../apis/interface';
import EmptyVideo from '../../components/communication/EmptyVideo';
import { MediaConnection } from 'peerjs';

type LocationState = {
  getRoomRes?: GetRoomRes;
};

export default function Collab() {
  const state: LocationState = useLocation().state as LocationState;
  const getRoomRes = state?.getRoomRes;

  const navigate = useNavigate();
  const { username, token, peer } = useAuth();
  const {
    collab: { leaveRoom },
    socket,
  } = useApiSvc();

  const [isAllJoined, setIsAllJoined] = useState<boolean>(false);
  const [roomSocks, setRoomSocks] = useState<string[]>([]);

  const [userMedia, setUserMedia] = useState<MediaStream | undefined>();
  const userVid = useRef<HTMLVideoElement>(null);
  const altUserVid = useRef<HTMLVideoElement>(null);

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

  // get the user video
  useEffect(() => {
    if (!userVid.current) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        setUserMedia(stream);
        userVid.current!.srcObject = stream;
      })
      .catch((err) => {
        alert(
          'Camera and audio access is required.\n' +
            'Please refresh the page and allow access.\n' +
            'Error: ' +
            err,
        );
      });

    return () => {
      if (!userMedia) {
        return;
      }

      userMedia.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // when we receive userMedia
  // mount answer-er onto peer
  useEffect(() => {
    if (!peer || !userMedia) {
      return;
    }

    peer.on('call', (conn) => {
      conn.answer(userMedia);
      conn.on('stream', (stream) => {
        // get caller's stream
        altUserVid.current!.srcObject = stream;
      });
    });
    peer.on('error', (err) => {
      alert('We have an error: ' + err);
    });

    return () => {
      peer.off('call');
    };
  }, [peer, userMedia]);

  // whenever sockets change
  // the smaller user calls the larger one
  useEffect(() => {
    let altUserCall: MediaConnection | undefined;

    if (!peer || !userMedia || !getRoomRes) {
      return;
    }

    if (roomSocks.length !== 2) {
      return;
    }

    if (username < getRoomRes.altUser) {
      // perform the call
      const call = peer.call(`cs3219-call-${getRoomRes.altUser}`, userMedia);
      altUserCall = call;

      // get callee's stream
      altUserCall.on('stream', (remoteStream) => {
        altUserVid.current!.srcObject = remoteStream;
      });
      altUserCall.on('error', (err) => {
        alert('The other user sent an error: ' + err);
      });
    }

    return () => {
      if (!altUserCall) {
        return;
      }

      altUserCall.emit('close');
      altUserCall.off('stream');
      altUserCall.off('error');
    };
  }, [peer, roomSocks, userMedia]);

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
            <Flex bg="gray.700" w="100%" h="100%" p={4} columnGap={2}>
              {!isAllJoined && <EmptyVideo />}
              <video
                ref={userVid}
                autoPlay
                playsInline
                controls={false}
                style={{
                  display: !isAllJoined ? 'none' : 'block',
                  width: '100px',
                  height: '100px',
                }}
              />

              {!isAllJoined && <EmptyVideo />}
              <video
                ref={altUserVid}
                autoPlay
                playsInline
                controls={false}
                style={{
                  display: !isAllJoined ? 'none' : 'block',
                  width: '100px',
                  height: '100px',
                }}
              />
            </Flex>
          </Box>
        </Flex>
        <Flex flex={1}>
          <Editor isAllJoined={isAllJoined} roomRes={getRoomRes} />
        </Flex>
      </Flex>
    </>
  );
}
