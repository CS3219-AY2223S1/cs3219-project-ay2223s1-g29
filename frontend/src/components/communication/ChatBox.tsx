import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { MediaConnection, Peer } from 'peerjs';
import { useForm } from 'react-hook-form';
import { ChatMsg } from '../../apis/types/socket.type';
import { FiSend } from 'react-icons/fi';
import ENV from '../../env';
import { useAuth } from '../../context/AuthContext';
import EmptyVideo from './EmptyVideo';

type ChatBoxProps = {
  altUser: string;
};

export default function ChatBox(props: ChatBoxProps) {
  const { username } = useAuth();

  const [hasUserVid, setHasUserVid] = useState<boolean>(false);
  const [hasAltUserVid, setHasAltUserVid] = useState<boolean>(false);

  const userVid = useRef<HTMLVideoElement>(null);
  const altUserVid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!props.altUser) {
      return;
    }

    let userStream: MediaStream | undefined;
    let altUserConn: MediaConnection | undefined;

    if (username < props.altUser) {
      // "smaller" user calls
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          // set self
          userStream = stream;
          setHasUserVid(true);
          userVid.current!.srcObject = stream;

          // call peer and then
          // try and set other
          const peer = new Peer(username);
          const call = peer.call(props.altUser, stream);
          altUserConn = call;
          call.on('stream', (remoteStream) => {
            altUserVid.current!.srcObject = remoteStream;
            setHasAltUserVid(true);
          });
        })
        .catch((err) => console.error(err));
    } else {
      // "larger" user answers
      const peer = new Peer(username);
      peer.on('call', (call) => {
        altUserConn = call;
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: false,
          })
          .then((stream) => {
            // set self
            userStream = stream;
            setHasUserVid(true);
            userVid.current!.srcObject = stream;

            // answer call
            // try and set other
            call.answer(stream);
            call.on('stream', (remoteStream) => {
              altUserVid.current!.srcObject = remoteStream;
              setHasAltUserVid(true);
            });
          })
          .catch((err) => console.error(err));
      });

      return () => {
        userStream?.getTracks().forEach((track) => track.stop());
        altUserConn?.close();
      };
    }
  }, [props.altUser]);

  return (
    <Flex bg="gray.700" w="100%" h="100%" p={4} columnGap={2}>
      {!userVid && <EmptyVideo />}
      <video
        ref={userVid}
        autoPlay
        playsInline
        controls={false}
        style={{
          display: !hasUserVid ? 'none' : 'block',
        }}
      />

      {!altUserVid && <EmptyVideo />}
      <video
        ref={altUserVid}
        autoPlay
        playsInline
        controls={false}
        style={{
          display: !hasAltUserVid ? 'none' : 'block',
        }}
      />
    </Flex>
  );
}
