import { Flex } from '@chakra-ui/react';
import { MediaConnection } from 'peerjs';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import EmptyVideo from './EmptyVideo';

type ChatBoxProps = {
  altUser: string;
  isAllJoined: boolean;
  roomSocks: string[];
};

export default function ChatBox(props: ChatBoxProps) {
  const { peer } = useAuth();

  const [hasUserVid, setHasUserVid] = useState<boolean>(false);
  const [hasAltUserVid, setHasAltUserVid] = useState<boolean>(false);

  const userVid = useRef<HTMLVideoElement>(null);
  const altUserVid = useRef<HTMLVideoElement>(null);

  const [userMedia, setUserMedia] = useState<MediaStream | undefined>();

  // get the user video and set listeners
  useEffect(() => {
    if (!userVid.current || !peer) {
      return;
    }

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        setHasUserVid(true);
        setUserMedia(stream);
        userVid.current!.srcObject = stream;

        console.log('Comm: set call event listener (answer any incoming calls)');
        peer.on('call', (conn) => {
          console.log(`Comm: received call from ${props.altUser}`);
          conn.answer(stream);
          console.log(`Comm: answered call from ${props.altUser}`);
        });
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
  }, [peer]);

  useEffect(() => {
    let altUserCall: MediaConnection | undefined;

    if (!peer || !userMedia) {
      return;
    }

    (async () => {
      console.log(`Comm: calling ${props.altUser}...`);
      const call = peer.call(props.altUser, userMedia);
      altUserCall = call;
      altUserCall.on('stream', (remoteStream) => {
        setHasAltUserVid(true);

        console.log(`Comm: got ${props.altUser} stream`);
        altUserVid.current!.srcObject = remoteStream;
      });
      altUserCall.on('error', (err) => {
        alert('Comm: altUser err: ' + err);
        console.log('Comm: altUser err: ', err);
      });
    })();

    return () => {
      if (!altUserCall) {
        return;
      }

      altUserCall.emit('close');
    };
  }, [peer, props, userMedia]);

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
