import { ButtonGroup, Button, Box, Flex } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type DifficultyButtonsProps = {
  text: string;
  onClick: () => void;
  color: 'purple.600' | 'blue.300' | 'pink.300' | 'yellow.300';
};

enum DIFFICULTY {
  EASY = 'e',
  MEDIUM = 'm',
  HARD = 'h',
  RANDOM = 'r',
}

export default function DifficultyButtons(props: DifficultyButtonsProps) {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<DIFFICULTY | undefined>();

  const onClickHandler = useCallback(
    (type: DIFFICULTY) => () => {
      setDifficulty(type);
    },
    [],
  );

  useEffect(() => {
    if (!difficulty) {
      return;
    }
    console.log('sending matching request for ', difficulty);
  }, [difficulty]);

  return (
    <>
      <Flex columnGap={2}>
        <Button type="button" color="purple.600" onClick={onClickHandler(DIFFICULTY.EASY)}>
          Easy
        </Button>
        <Button type="button" color="blue.300" onClick={onClickHandler(DIFFICULTY.MEDIUM)}>
          Medium
        </Button>
      </Flex>

      <Flex mt={2} columnGap={2}>
        <Button type="button" color="pink.300" onClick={onClickHandler(DIFFICULTY.HARD)}>
          Hard
        </Button>
        <Button type="button" color="yellow.300" onClick={onClickHandler(DIFFICULTY.RANDOM)}>
          Random
        </Button>
      </Flex>
    </>
  );
}
