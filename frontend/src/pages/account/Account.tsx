import {
  Box,
  Button,
  Center,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleLeft } from 'react-icons/fa';
import { isApiError } from '../../apis/interface';
import ResetPassword, { ResetPasswordValues } from '../../components/user/ResetPassword';
import UserHomeCard from '../../components/user/UserHomeCard';
import { useApiSvc } from '../../context/ApiServiceContext';
import { useOptionalAuth } from '../../context/AuthContext';

export default function Account() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { username, token, clearAuth } = useOptionalAuth();

  const {
    user: { deleteAccount, resetPassword },
  } = useApiSvc();

  const [deleteAccLoading, setDeleteAccLoading] = useState<boolean>(false);
  const [deleteAccErr, setDeleteAccErr] = useState<string>('');

  const [resetPwdLoading, setResetPwdLoading] = useState<boolean>(false);
  const [resetPwdErr, setResetPwdErr] = useState<string>('');

  const onLogoutHandler = useCallback(() => {
    clearAuth();
    window.location.reload();
  }, []);

  const onDeleteAccount = useCallback(() => {
    if (!token) {
      return;
    }

    setDeleteAccLoading(true);
    deleteAccount(token).then((res) => {
      if (isApiError(res)) {
        setDeleteAccLoading(false);
        setDeleteAccErr(res.err.response.data.message);
        return;
      }

      clearAuth();
      window.location.reload();
    });
  }, [token]);

  const onResetPwd = useCallback(
    (d: ResetPasswordValues) => {
      if (!token) {
        return;
      }

      setResetPwdLoading(true);
      resetPassword(token, d.password)
        .then((res) => {
          if (isApiError(res)) {
            setResetPwdErr(res.err.response.data.message);
            return;
          }
        })
        .finally(() => {
          setResetPwdLoading(false);
        });
    },
    [token],
  );

  if (!username) {
    return null;
  }

  return (
    <>
      <Center flexDirection="column" h="100vh" rowGap={4}>
        <UserHomeCard username={username} />
        <Text fontSize="xl" mb={2} display="flex" flexDir="column" align="center">
          Manage Your Account
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

        <Box minW="50%">
          <Box>
            <Divider mb={4} />

            <Text fontSize="xl" mb={2}>
              Reset Password
            </Text>
            <ResetPassword
              err={resetPwdErr}
              buttonLoading={resetPwdLoading}
              onSubmit={onResetPwd}
            />
          </Box>

          <Box mb={4}>
            <Divider mb={4} />
            <Text fontSize="xl" mb={2}>
              Logout
            </Text>
            <Button colorScheme="teal" variant="solid" width="25%" onClick={onLogoutHandler}>
              Logout
            </Button>
          </Box>

          <Box>
            <Divider mb={4} />

            <Text fontSize="xl" mb={2}>
              Delete Account
            </Text>
            <Button colorScheme="red" variant="solid" width="25%" onClick={onOpen}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete your account?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              No
            </Button>
            <Button variant="outline" onClick={onDeleteAccount} isLoading={deleteAccLoading}>
              Yes, I am sure
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
