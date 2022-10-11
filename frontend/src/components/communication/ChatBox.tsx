import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
} from '@chakra-ui/react';
import React, { SyntheticEvent, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { ChatMsg } from '../../apis/types/socket.type';
import { FiSend } from 'react-icons/fi';

type ChatBoxProps = {
  messages: ChatMsg[];
  onSend: (msg: string) => void;
};

type ChatFormValues = {
  msg: string;
};

export default function ChatBox(props: ChatBoxProps) {
  const { handleSubmit, register, reset } = useForm<ChatFormValues>();

  const onSubmit = (values: ChatFormValues) => {
    if (!values.msg) {
      return;
    }

    props.onSend(values.msg);
    reset();
  };

  return (
    <Box bg="gray.700" w="100%" h="100%" p={4}>
      <Flex h="70%" direction="column">
        {props.messages.length === 0 && <div>You have no messages</div>}
        {props.messages.length > 0 &&
          props.messages.map((msg, idx) => (
            <Box key={`${idx}-${msg}`}>
              {msg.from}: {msg.content}
            </Box>
          ))}
      </Flex>

      <Box h="30%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Input id="msg" placeholder="Message" {...register('msg')} />
            <InputRightElement>
              <IconButton type="submit" colorScheme="blue" aria-label="Send" icon={<FiSend />} />
            </InputRightElement>
          </InputGroup>
        </form>
      </Box>
    </Box>
  );
}
