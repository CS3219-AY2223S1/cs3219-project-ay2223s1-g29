import { Box, Center, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import DifficultyButtons from '../../components/question/DifficultyButtons';
import UserHomeCard from '../../components/user/UserHomeCard';
import { useAuth } from '../../context/AuthContext';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import MatchingIndicator from '../../components/matching/MatchingIndicator';
import { DIFFICULTY, serializeDifficulty } from '../../components/question/utils';
import useIsMobile from '../../hooks/useIsMobile';
import { useApiSvc } from '../../context/ApiServiceContext';
import { isApiError } from '../../apis/interface';
import useInterval from '../../hooks/useInterval';
import CollabSuccess from '../../components/collab/CollabSuccess';
import { GetRoomRes } from '../../apis/types/collab.type';
import CollabNavigate from '../collab/CollabNavigate';

const STEPS = [
  { label: 'Select difficulty' },
  { label: 'Wait for a match' },
  { label: "Let's start!" },
];

export default function Home() {
  const { username, token, userId } = useAuth();
  const isMobile = useIsMobile();

  const {
    matching: { requestForMatch },
    collab: { getRoom },
  } = useApiSvc();

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<DIFFICULTY | undefined>();
  const [room, setRoom] = useState<GetRoomRes | undefined>();
  const [msg, setMsg] = useState<string>('');

  const {
    nextStep,
    activeStep,
    reset: resetStep,
  } = useSteps({
    initialStep: 0,
  });

  const reset = useCallback(() => {
    setTimeLeft(-1);
    setDifficulty(undefined);
    setRoom(undefined);
    setMsg('');
    resetStep();
  }, [resetStep]);

  const onClickHandler = useCallback(
    (selectedDifficulty: DIFFICULTY) => {
      setDifficulty(selectedDifficulty);

      requestForMatch(token, {
        userid: userId,
        difficulty: serializeDifficulty(selectedDifficulty),
      }).then((res) => {
        if (isApiError(res)) {
          reset();
          setMsg('Please try again later.');
          return;
        }

        nextStep();
        setTimeLeft(60);
      });
    },
    [token],
  );

  // on page load,
  // check if this user is in any room
  useEffect(() => {
    getRoom(token, username).then((res) => {
      if (isApiError(res)) {
        // safely do nothing
        return;
      }

      setRoom(res.data);
      // this is linked to the conditional render
      // by setting the room here,
      // this will do the navigation directly
    });
  }, []);

  // set timeout to do polling
  useEffect(() => {
    if (!difficulty || room) {
      // do not start timeout
      // component is in invalid 'state'
      return;
    }

    if (timeLeft < 0) {
      // timed out - reset all states
      reset();
      setDifficulty(undefined);
      setRoom(undefined);
      setMsg('Could not find you a match.\nPlease try again later!');
      return;
    }

    // timer in progress
    const timeout = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timeout);
    };
  }, [timeLeft, difficulty, room]);

  // code that does the actual api polling
  useInterval(() => {
    if (!difficulty || room) {
      // do not run on page load
      return;
    }

    getRoom(token, username).then((res) => {
      if (isApiError(res)) {
        // safely do nothing
        return;
      }

      let altUser = res.data.userId1;
      if (altUser === username) {
        altUser = res.data.userId2;
      }

      setRoom({
        ...res.data,
        altUser,
      });

      nextStep();
      new Promise(() => setTimeout(() => nextStep(), 300));
    });
  }, 1000);

  if (room) {
    // navigate to collab site if there is a room
    return <CollabNavigate getRoomRes={room} />;
  }

  return (
    <Center flexDirection="column" h="100vh">
      <UserHomeCard username={username} />

      <Center display="flex" flexDirection="column" mt={8} minWidth="50%">
        <Text fontSize="3xl">Start your interview preparation</Text>
      </Center>

      <Center minWidth="50%" px="10%">
        {!isMobile && (
          <>
            <Steps activeStep={activeStep} mt={4} orientation="vertical" flexBasis="34%">
              {STEPS.map(({ label }) => (
                <Step label={label} key={label} />
              ))}
            </Steps>

            <Box alignSelf="center" width="250px">
              {activeStep === 0 && <DifficultyButtons onClick={onClickHandler} msg={msg} />}
              {activeStep === 1 && difficulty && (
                <MatchingIndicator value={timeLeft} difficulty={difficulty} onAbort={reset} />
              )}
              {activeStep > 1 && difficulty && room && <CollabSuccess getRoomRes={room} />}
            </Box>
          </>
        )}

        {isMobile && (
          <Flex direction="column" align="center" justify="center">
            <Text fontSize="1xl" mb={2}>
              {STEPS[activeStep]?.label ?? ''}
            </Text>

            <Box alignSelf="center" width="250px">
              {activeStep === 0 && <DifficultyButtons onClick={onClickHandler} msg={msg} />}
              {activeStep === 1 && difficulty && (
                <MatchingIndicator value={timeLeft} difficulty={difficulty} onAbort={reset} />
              )}
              {activeStep > 1 && room && <CollabSuccess getRoomRes={room} />}
            </Box>
          </Flex>
        )}
      </Center>
    </Center>
  );
}
