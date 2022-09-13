import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Center, Flex, Heading, Link, Text } from '@chakra-ui/react';
import LoginForm from '../../components/user/LoginForm';
import { MdWavingHand } from 'react-icons/md';

export default function Login() {
  return (
    <Center flexDirection="column" h="100vh" rowGap={4}>
      <Flex justify="center" align="center" direction="column">
        <Heading display="flex" columnGap={2}>
          Hello
          <MdWavingHand />
        </Heading>
        <Text fontSize="lg">Let&apos;s get you signed in</Text>

        <Link color="teal.500" as={ReactRouterLink} to="/register">
          New here? Create an account.
        </Link>
      </Flex>
      <LoginForm />
    </Center>
  );
}
