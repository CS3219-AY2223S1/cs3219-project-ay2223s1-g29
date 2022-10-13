import { Box, Center, CircularProgress, Skeleton } from '@chakra-ui/react';
import React from 'react';

export default function SuspenseApp() {
  return (
    <Box height="100vh" m={4}>
      <Skeleton p={4} />
    </Box>
  );
}
