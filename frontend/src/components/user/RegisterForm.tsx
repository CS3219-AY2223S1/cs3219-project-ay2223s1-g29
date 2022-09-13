import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormLabel, FormControl, Input, Button, Flex } from '@chakra-ui/react';

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

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
            <span>{errors.cfmPassword && errors.cfmPassword.message?.toString()}</span>
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Create Account
        </Button>
      </Flex>
    </form>
  );
}
