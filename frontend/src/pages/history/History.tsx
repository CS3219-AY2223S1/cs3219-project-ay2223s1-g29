import {
  Center,
  Text,
  Link,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import UserHomeCard from '../../components/user/UserHomeCard';
import { useOptionalAuth } from '../../context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { useApiSvc } from '../../context/ApiServiceContext';
import { isApiError } from '../../apis/interface';
import { stat } from 'fs';

type StatModel = {
  easyCnt: number;
  medCnt: number;
  hardCnt: number;
  randomCnt: number;
};

export default function History() {
  const {
    history: { getHistory },
  } = useApiSvc();
  const { username, token } = useOptionalAuth();

  const [stats, setStats] = useState<StatModel | undefined>();
  const [err, setErr] = useState<string>('Hang on while we fetch your data.');

  useEffect(() => {
    if (!token || !username) {
      return;
    }

    getHistory(token, username).then((res) => {
      if (isApiError(res)) {
        setErr('We could not fetch your data for now. Please try again later.');
        return;
      }

      const { records } = res.data;
      let cnt = 0;
      const statModel: StatModel = {
        easyCnt: 0,
        medCnt: 0,
        hardCnt: 0,
        randomCnt: 0,
      };

      records.forEach((rec) => {
        cnt += 1;
        switch (rec.difficulty) {
          case 'easy':
            statModel.easyCnt += 1;
            break;
          case 'medium':
            statModel.medCnt += 1;
            break;
          case 'hard':
            statModel.hardCnt += 1;
            break;
          case 'random':
            statModel.randomCnt += 1;
            break;
          default:
            statModel.easyCnt += 1;
        }
      });

      if (cnt === 0) {
        setErr('You have not been in any sessions.');
        return;
      } else {
        setStats(statModel);
        setErr('');
      }
    });
  }, []);

  if (!username) {
    return null;
  }

  return (
    <Center flexDirection="column" h="100vh" rowGap={4}>
      <UserHomeCard username={username} />
      <Text fontSize="xl" mb={2} display="flex" flexDir="column" align="center">
        View My Statistics
        <Link
          as={RouterLink}
          to="/"
          fontSize="sm"
          style={{
            display: 'flex',
            columnGap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaAngleLeft />
          Return to homepage
        </Link>
      </Text>

      {err && <Text>{err}</Text>}

      {stats && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Difficulty</Th>
                <Th>Number of Sessions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Easy</Td>
                <Td isNumeric>{stats.easyCnt}</Td>
              </Tr>
              <Tr>
                <Td>Medium</Td>
                <Td isNumeric>{stats.medCnt}</Td>
              </Tr>
              <Tr>
                <Td>Hard</Td>
                <Td isNumeric>{stats.hardCnt}</Td>
              </Tr>
              <Tr>
                <Td>Random</Td>
                <Td isNumeric>{stats.randomCnt}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>Total</Td>
                <Td isNumeric>{stats.easyCnt + stats.medCnt + stats.hardCnt + stats.randomCnt}</Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      )}
    </Center>
  );
}
