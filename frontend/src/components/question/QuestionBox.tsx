import { Box, Center, Text } from '@chakra-ui/react';
import React from 'react';

type QuestionBoxProps = {
  question: string;
};

export default function QuestionBox(props: QuestionBoxProps) {
  return (
    <>
      <Text fontSize="3xl">Question</Text>
      <Text whiteSpace="pre-wrap">{props.question}</Text>
    </>
  );
}
