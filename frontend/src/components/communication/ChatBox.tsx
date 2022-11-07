import { Flex } from '@chakra-ui/react';
import { MediaConnection } from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';
import { GetRoomRes } from '../../apis/types/collab.type';
import { useAuth } from '../../context/AuthContext';
import EmptyVideo from './EmptyVideo';

type ChatBoxProps = {
  getRoomRes?: GetRoomRes;
  roomSocks: string[];
  isAllJoined: boolean;
};

export default function ChatBox(props: ChatBoxProps) {
  const { getRoomRes, roomSocks, isAllJoined } = props;
  const { username, peer } = useAuth();

  const [userMedia, setUserMedia] = useState<MediaStream | undefined>();
  const userVid = useRef<HTMLVideoElement>(null);
  const altUserVid = useRef<HTMLVideoElement>(null);

  // get the user video
  useEffect(() => {
    if (!userVid.current) {
      return;
    }

    if (userMedia) {
      // if userMedia is already present
      // setup the destructor
      return () => {
        userMedia.getTracks().forEach((track) => track.stop());
      };
    }

    // if not present
    // request for access and use
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
  }, [userMedia]);

  // when we receive userMedia
  // mount answer-er onto peer
  useEffect(() => {
    let userCall: MediaConnection | undefined;

    if (!peer || !userMedia) {
      return;
    }

    peer.on('call', (conn) => {
      conn.answer(userMedia);

      userCall = conn;
      userCall.on('stream', (stream) => {
        // get caller's stream
        altUserVid.current!.srcObject = stream;
      });
    });
    peer.on('error', (err) => {
      alert('We have an error: ' + err);
    });

    return () => {
      if (userCall) {
        userCall.off('stream');
        userCall.close();
      }

      peer.off('call');
      peer.off('error');
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
      if (altUserCall) {
        altUserCall.off('stream');
        altUserCall.off('error');
        altUserCall.close();
      }
    };
  }, [peer, roomSocks, userMedia]);

  return (
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
  );
}
