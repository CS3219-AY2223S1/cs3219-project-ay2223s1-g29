import { Center } from '@chakra-ui/react';
import React from 'react';

type EmptyVideoProps = {
  user?: string;
};

function getDisplayText(user?: string): string {
  if (user) {
    return `Waiting for video\nfrom ${user}`;
  } else {
    return 'Waiting for video';
  }
}

export default function EmptyVideo(props: EmptyVideoProps) {
  return <Center whiteSpace="pre-wrap">{getDisplayText(props.user)}</Center>;
}
