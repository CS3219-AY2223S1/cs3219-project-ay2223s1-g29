import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Flex } from '@chakra-ui/react';
import UserApi from '../../apis/UserApi';
import { useOptionalAuth } from '../../context/AuthContext';

type LoginFormValues = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const { setAuth } = useOptionalAuth();
  const [loginErr, setLoginErr] = useState<string>('');

  function onSubmit(values: { username: string; password: string }) {
    UserApi.login(values)
      .then((res) => {
        const {
          data: { id, token, username },
        } = res;
        setAuth({ id, username }, token);
      })
      .catch((err) => setLoginErr(err.message));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex rowGap={2} direction="column" minW="30vw">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            placeholder="Enter username"
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

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Sign In
        </Button>
      </Flex>
    </form>
  );
}
