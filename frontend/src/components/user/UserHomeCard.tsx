import {
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
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

type UserHomeCardProps = {
  username: string;
  onManageAccount?: () => void;
  onLogout?: () => void;
};

export default function UserHomeCard(props: UserHomeCardProps) {
  const { username } = props;
  const navigate = useNavigate();

  const onViewHistory = useCallback(() => {
    navigate('/history');
  }, []);

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

      {props.onManageAccount && props.onLogout && (
        <ButtonGroup colorScheme="teal" size="sm" isAttached variant="outline">
          <Button type="button" w="100%" onClick={onViewHistory}>
            View My Statistics
          </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="More actions"
              icon={<BiDotsVerticalRounded />}
              variant="outline"
            />
            <MenuList>
              <MenuItem onClick={props.onManageAccount}>Manage Account</MenuItem>
              <MenuItem onClick={props.onLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      )}
    </Flex>
  );
}
