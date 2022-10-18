import { Flex } from '@chakra-ui/react';
import { MediaConnection } from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmptyVideo from './EmptyVideo';

type ChatBoxProps = {
  altUser: string;
};

export default function ChatBox(props: ChatBoxProps) {
  const { peer } = useAuth();

  const [hasUserVid, setHasUserVid] = useState<boolean>(false);
  const [hasAltUserVid, setHasAltUserVid] = useState<boolean>(false);

  const userVid = useRef<HTMLVideoElement>(null);
  const altUserVid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!peer) {
      return;
    }

    let userStream: MediaStream | undefined;
    let callConn: MediaConnection | undefined;

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        console.log('got user stream');
        userStream = stream;
        setHasUserVid(true);
        userVid.current!.srcObject = stream;

        peer.on('error', (err) => {
          console.error(err);
          console.error(err.stack);
        });

        // always mount a call answerer first
        peer.on('call', (conn) => {
          console.log(`received call from ${props.altUser}`);
          conn.answer(stream);
          console.log(`answered call from ${props.altUser}`);
          callConn = conn;
          setHasAltUserVid(true);
        });

        // call the other party
        console.log(`calling ${props.altUser}...`);
        const call = peer.call(props.altUser, stream);
        call.on('stream', (remoteStream) => {
          console.log(`got ${props.altUser} stream`);
          altUserVid.current!.srcObject = remoteStream;
        });
        call.on('error', (err) => {
          console.log({ err });
        });
      });

    return () => {
      userStream?.getTracks().forEach((track) => track.stop());
      // callConn?.close();
    };
  }, [peer]);

  console.log({
    hasUserVid,
    hasAltUserVid,
  });

  return (
    <Flex bg="gray.700" w="100%" h="100%" p={4} columnGap={2}>
      {!hasUserVid && <EmptyVideo />}
      <video
        ref={userVid}
        autoPlay
        playsInline
        controls={false}
        style={{
          display: !hasUserVid ? 'none' : 'block',
          width: '100px',
          height: '100px',
        }}
      />

      {!hasAltUserVid && <EmptyVideo />}
      <video
        ref={altUserVid}
        autoPlay
        playsInline
        controls={false}
        style={{
          display: !hasAltUserVid ? 'none' : 'block',
          width: '100px',
          height: '100px',
        }}
      />
    </Flex>
  );
}
