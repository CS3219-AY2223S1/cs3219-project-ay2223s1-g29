import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

type QuestionBoxProps = {
  question: string;
};

export default function QuestionBox(props: QuestionBoxProps) {
  return (
    <Box bg="teal.800" w="100%" h="100%" p={4}>
      <Text fontSize="3xl">Question</Text>
      <Text>{props.question}</Text>
    </Box>
  );
}
