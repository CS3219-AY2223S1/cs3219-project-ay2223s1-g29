import { Flex } from '@chakra-ui/react';
import React from 'react';
import UserHomeCard from '../../components/user/UserHomeCard';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { username } = useAuth();

  return (
    <Flex align="center" justify="center" width="100vw" height="100vh">
      <UserHomeCard username={username} />
    </Flex>
  );
}
