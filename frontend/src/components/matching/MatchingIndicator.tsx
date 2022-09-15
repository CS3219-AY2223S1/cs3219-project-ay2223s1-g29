import React from 'react';
import { Button, Center, CircularProgress, CircularProgressLabel, Text } from '@chakra-ui/react';
import { DIFFICULTY, getColor } from '../question/utils';

type MatchingIndicatorProps = {
  value: number;
  difficulty: DIFFICULTY;
  onAbort: () => void;
};

export default function MatchingIndicator(props: MatchingIndicatorProps) {
  const { value, difficulty, onAbort } = props;

  return (
    <Center flexDirection="column">
      <CircularProgress value={value} max={60} color={getColor(difficulty)} size="150px">
        <CircularProgressLabel fontSize="3xl">{value}</CircularProgressLabel>
      </CircularProgress>
      <Text>Difficulty: {difficulty}</Text>
      <Button type="button" size="sm" mt={1} variant="outline" onClick={onAbort}>
        Cancel
      </Button>
    </Center>
  );
}
