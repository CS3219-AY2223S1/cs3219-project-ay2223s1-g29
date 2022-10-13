import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Flex } from '@chakra-ui/react';
import { useOptionalAuth } from '../../context/AuthContext';
import { useApiSvc } from '../../context/ApiServiceContext';
import { isApiError } from '../../apis/interface';

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const {
    user: { login: apiLogin },
  } = useApiSvc();

  const { setAuth } = useOptionalAuth();
  const [loginErr, setLoginErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback((values: { username: string; password: string }) => {
    setLoading(true);
    apiLogin(values)
      .then((res) => {
        if (isApiError(res)) {
          setLoginErr(res.err.response.data.message);
          return;
        }

        const {
          data: { id, token, username },
        } = res;
        setAuth({ id, username }, token);
        window.location.reload();
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex rowGap={2} direction="column" minW="30vw">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Enter username"
            autoFocus
            {...register('username', {
              required: 'Username is required',
            })}
          />
          <FormErrorMessage>
            <span>{errors.username && errors.username.message?.toString()}</span>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="Enter password"
            type="password"
            {...register('password', {
              required: 'Passwords must be more than 8 characters long',
              minLength: { value: 8, message: 'Passwords must be more than 8 characters long' },
            })}
          />
          <FormErrorMessage>
            <span>{errors.password && errors.password.message?.toString()}</span>
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
          Sign In
        </Button>
      </Flex>
      <div style={{ minHeight: '2em' }}>{loginErr}</div>
    </form>
  );
}
