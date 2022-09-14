import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  FormHelperText,
  Box,
} from '@chakra-ui/react';
import UserApi from '../../apis/UserApi';
import { useOptionalAuth } from '../../context/AuthContext';

type RegisterFormValues = {
  username: string;
  password: string;
  cfmPassword: string;
};

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<RegisterFormValues>();

  const { setAuth } = useOptionalAuth();
  const [registerErr, setRegisterErr] = useState<string>('');

  const onSubmit = useCallback((values: RegisterFormValues) => {
    UserApi.register(values)
      .then((res) => {
        const {
          data: { id, token, username },
        } = res;
        setAuth({ id, username }, token);
        window.location.reload();
      })
      .catch((err) => setRegisterErr(err.message));
  }, []);

  const validateCfmPassword = useCallback(
    (cfmPassword: string) => {
      const { password } = getValues();
      return password === cfmPassword || 'Passwords do not match';
    },
    [getValues],
  );

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

        <FormControl isInvalid={!!errors.cfmPassword}>
          <FormLabel htmlFor="cfmPassword">Confirm Password</FormLabel>
          <Input
            id="cfmPassword"
            placeholder="Confirm password"
            type="password"
            {...register('cfmPassword', {
              required: 'Passwords do not match',
              validate: validateCfmPassword,
            })}
          />
          <FormErrorMessage>
            {errors.cfmPassword && errors.cfmPassword.message?.toString()}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Create Account
        </Button>
      </Flex>
      <div style={{ minHeight: '2em' }}>{registerErr}</div>
    </form>
  );
}