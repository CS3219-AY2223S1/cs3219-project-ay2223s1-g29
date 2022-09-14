import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

type UserHomeCardProps = {
  username: string;
};

export default function UserHomeCard(props: UserHomeCardProps) {
  const { username } = props;
  const { clearAuth } = useAuth();

  const onLogout = useCallback(() => {
    clearAuth();
    window.location.reload();
  }, []);

  return (
    <Flex direction="column" rowGap={2}>
      <Heading display="flex" columnGap={2}>
        <FaUser />
        {username}
      </Heading>

      <Button colorScheme="teal" variant="outline" size="sm" type="button" onClick={onLogout}>
        Logout
      </Button>
    </Flex>
  );
}
