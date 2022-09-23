import { Box, Button, Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { DIFFICULTY, getColor } from './utils';

type DifficultyButtonsProps = {
  msg: string;
  onClick: (type: DIFFICULTY) => void;
};

export default function DifficultyButtons(props: DifficultyButtonsProps) {
  const { onClick } = props;

  const onClickHandler = useCallback(
    (type: DIFFICULTY) => () => {
      onClick(type);
    },
    [],
  );

  return (
    <Center flexDirection="column" rowGap={2}>
      <SimpleGrid columns={2} spacing={2}>
        <Button
          type="button"
          color={getColor(DIFFICULTY.EASY)}
          onClick={onClickHandler(DIFFICULTY.EASY)}
          flex={1}
          size="lg"
        >
          Easy
        </Button>
        <Button
          type="button"
          color={getColor(DIFFICULTY.MEDIUM)}
          onClick={onClickHandler(DIFFICULTY.MEDIUM)}
          flex={1}
          size="lg"
        >
          Medium
        </Button>
        <Button
          type="button"
          color={getColor(DIFFICULTY.HARD)}
          onClick={onClickHandler(DIFFICULTY.HARD)}
          flex={1}
          size="lg"
        >
          Hard
        </Button>
        <Button
          type="button"
          color={getColor(DIFFICULTY.RANDOM)}
          onClick={onClickHandler(DIFFICULTY.RANDOM)}
          flex={1}
          size="lg"
        >
          Random
        </Button>
      </SimpleGrid>

      <Box p={1}>{props.msg}</Box>
    </Center>
  );
}
