import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import DifficultyButtons, { DIFFICULTY } from '../../components/question/DifficultyButtons';
import UserHomeCard from '../../components/user/UserHomeCard';
import { useAuth } from '../../context/AuthContext';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import MatchingIndicator from '../../components/matching/MatchingIndicator';

const STEPS = [{ label: 'Select difficulty' }, { label: 'Wait for a match' }, { label: 'Start' }];

export default function Home() {
  const { username, token } = useAuth();

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<DIFFICULTY | undefined>();

  const { nextStep, activeStep, reset } = useSteps({
    initialStep: 0,
  });

  console.log({ activeStep });
  const onClickHandler = useCallback(
    (difficulty: DIFFICULTY) => {
      nextStep();
      setDifficulty(difficulty);

      // send api call to match
      // if ok, begin countdown
      setTimeLeft(30);
    },
    [activeStep],
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [timeLeft]);

  return (
    <Center flexDirection="column" h="100vh">
      <UserHomeCard username={username} />

      <Center display="flex" flexDirection="column" mt={8} minWidth="50%">
        <Text fontSize="3xl">Start your interview preparation</Text>
      </Center>

      <Flex justify="space-between" align="center" mb={4} columnGap={4}>
        <Steps activeStep={activeStep} mt={4} orientation="vertical">
          {STEPS.map(({ label }) => (
            <Step label={label} key={label} />
          ))}
        </Steps>

        <Box>
          {activeStep === 0 && <DifficultyButtons onClick={onClickHandler} />}
          {activeStep === 1 && difficulty && (
            <MatchingIndicator value={timeLeft} difficulty={difficulty} onAbort={reset} />
          )}
        </Box>
      </Flex>
    </Center>
  );
}
