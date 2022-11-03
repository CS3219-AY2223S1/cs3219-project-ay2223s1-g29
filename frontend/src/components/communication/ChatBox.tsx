import { Flex } from '@chakra-ui/react';
import { MediaConnection } from 'peerjs';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmptyVideo from './EmptyVideo';

type ChatBoxProps = {
  altUser: string;
  isAllJoined: boolean;
};

export default function ChatBox(props: ChatBoxProps) {
  const { peer } = useAuth();

  const [hasUserVid, setHasUserVid] = useState<boolean>(false);
  const [hasAltUserVid, setHasAltUserVid] = useState<boolean>(false);

  const userVid = useRef<HTMLVideoElement>(null);
  const altUserVid = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (!peer) {
      // no peer - quit
      return;
    }

    if (!props.isAllJoined) {
      // not all have joined the room
      return;
    }

    let userStream: MediaStream | undefined;
    let altUserCall: MediaConnection | undefined;

    const fn = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (!stream) {
        return;
      }

      console.log('Comm: got user stream');
      userStream = stream;
      setHasUserVid(true);
      userVid.current!.srcObject = userStream;

      console.log('Comm: set call event listener (answer any incoming calls)');
      peer.on('call', (conn) => {
        console.log(`Comm: received call from ${props.altUser}`);
        conn.answer(userStream);
        console.log(`Comm: answered call from ${props.altUser}`);
      });

      console.log(`Comm: calling ${props.altUser}...`);
      const call = peer.call(props.altUser, userStream);
      altUserCall = call;
      altUserCall.on('stream', (remoteStream) => {
        setHasAltUserVid(true);

        console.log(`Comm: got ${props.altUser} stream`);
        altUserVid.current!.srcObject = remoteStream;
      });
      altUserCall.on('error', (err) => {
        console.log('Comm: altUser err: ', err);
      });
    };

    fn();

    return () => {
      if (!userStream || !altUserCall) {
        return;
      }

      // teardown
      userStream.getTracks().forEach((track) => track.stop());
      altUserCall.emit('close');
    };
  }, [peer, props.isAllJoined]);

  const notSetupYet = !props.isAllJoined || !hasUserVid || !hasAltUserVid;

  return (
    <Flex bg="gray.700" w="100%" h="100%" p={4} columnGap={2}>
      {notSetupYet && <EmptyVideo />}
      <video
        ref={userVid}
        autoPlay
        playsInline
        controls={false}
        style={{
          display: notSetupYet ? 'none' : 'block',
          width: '100px',
          height: '100px',
        }}
      />

      {notSetupYet && <EmptyVideo />}
      <video
        ref={altUserVid}
        autoPlay
        playsInline
        controls={false}
        style={{
          display: notSetupYet ? 'none' : 'block',
          width: '100px',
          height: '100px',
        }}
      />
    </Flex>
  );
}
