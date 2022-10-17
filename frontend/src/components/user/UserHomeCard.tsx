import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { FaHandsHelping, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

type UserHomeCardProps = {
  username: string;
  onManageAccount?: () => void;
  onLogout?: () => void;
};

export default function UserHomeCard(props: UserHomeCardProps) {
  const { username } = props;

  return (
    <Flex direction="column" rowGap={2}>
      <Heading display="flex" columnGap={2}>
        Peer Prep
        <FaHandsHelping />
      </Heading>

      <Text fontSize="md" display="flex" columnGap={1} alignItems="center" justifyContent="center">
        Hello, <FaUser />
        {username}.
      </Text>

      {props.onManageAccount && (
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          type="button"
          onClick={props.onManageAccount}
        >
          Manage Account
        </Button>
      )}

      {props.onLogout && (
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          type="button"
          onClick={props.onLogout}
        >
          Logout
        </Button>
      )}
    </Flex>
  );
}
