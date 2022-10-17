import { Flex, FormControl, FormLabel, Input, FormErrorMessage, Button } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

export type ResetPasswordValues = {
  password: string;
  cfmPassword: string;
};

type ResetPasswordProps = {
  err: string;
  buttonLoading: boolean;
  onSubmit: (d: ResetPasswordValues) => void | Promise<void>;
};

export default function ResetPassword(props: ResetPasswordProps) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordValues>();

  const validateCfmPassword = useCallback(
    (cfmPassword: string) => {
      const { password } = getValues();
      return password === cfmPassword || 'Passwords do not match';
    },
    [getValues],
  );

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Flex rowGap={2} direction="column" minW="30vw">
        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">New Password</FormLabel>
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

        <Button mt={4} colorScheme="teal" isLoading={props.buttonLoading} type="submit">
          Reset Password
        </Button>
      </Flex>
      <div style={{ minHeight: '2em' }}>{props.err}</div>
    </form>
  );
}
