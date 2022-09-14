import { ButtonGroup, Button, Box, Flex, SimpleGrid } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type DifficultyButtonsProps = {
  onClick: (type: DIFFICULTY) => void;
};

export const enum DIFFICULTY {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  RANDOM = 'Random',
}

export default function DifficultyButtons(props: DifficultyButtonsProps) {
  const { onClick } = props;

  const onClickHandler = useCallback(
    (type: DIFFICULTY) => () => {
      onClick(type);
    },
    [],
  );

  return (
    <SimpleGrid columns={2} spacing={2}>
      <Button
        type="button"
        color="green.300"
        onClick={onClickHandler(DIFFICULTY.EASY)}
        flex={1}
        size="lg"
      >
        Easy
      </Button>
      <Button
        type="button"
        color="yellow.300"
        onClick={onClickHandler(DIFFICULTY.MEDIUM)}
        flex={1}
        size="lg"
      >
        Medium
      </Button>
      <Button
        type="button"
        color="pink.300"
        onClick={onClickHandler(DIFFICULTY.HARD)}
        flex={1}
        size="lg"
      >
        Hard
      </Button>
      <Button
        type="button"
        color="purple.300"
        onClick={onClickHandler(DIFFICULTY.RANDOM)}
        flex={1}
        size="lg"
      >
        Random
      </Button>
    </SimpleGrid>
  );
}
