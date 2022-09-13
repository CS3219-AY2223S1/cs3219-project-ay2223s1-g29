import { Flex, Heading, Text, Link, Center } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import React from 'react';
import { MdWavingHand } from 'react-icons/md';
import RegisterForm from '../../components/user/RegisterForm';

export default function Register() {
  return (
    <Center flexDirection="column" h="100vh" rowGap={4}>
      <Flex justify="center" align="center" direction="column">
        <Heading display="flex" columnGap={2}>
          Welcome
          <MdWavingHand />
        </Heading>
        <Text fontSize="lg">Get started by creating an account</Text>
        <Link color="teal.500" as={ReactRouterLink} to="/">
          Already registered? Sign in.
        </Link>
      </Flex>
      <RegisterForm />
    </Center>
  );
}
