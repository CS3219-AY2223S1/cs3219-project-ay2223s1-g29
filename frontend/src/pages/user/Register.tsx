import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import RegisterForm from '../../components/user/RegisterForm';

export default function Register() {
  return (
    <Flex justify="center" align="center" w="100vw" h="100vh" direction="column" rowGap={4}>
      <Flex justify="center" align="center" direction="column">
        <Heading display="flex" columnGap={2}>
          Welcome
          <MdWavingHand />
        </Heading>
        <Text fontSize="lg">Get started by creating an account</Text>
      </Flex>
      <RegisterForm />
    </Flex>
  );
}
