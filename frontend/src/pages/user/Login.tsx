import React from 'react';
import { Flex, Heading, Text } from '@chakra-ui/react';
import LoginForm from '../../components/user/LoginForm';
import { MdWavingHand } from 'react-icons/md';

export default function Login() {
  return (
    <Flex justify="center" align="center" w="100vw" h="100vh" direction="column" rowGap={4}>
      <Flex justify="center" align="center" direction="column">
        <Heading display="flex" columnGap={2}>
          Hello
          <MdWavingHand />
        </Heading>
        <Text fontSize="lg">Let's get you signed in</Text>
      </Flex>
      <LoginForm />
    </Flex>
  );
}
