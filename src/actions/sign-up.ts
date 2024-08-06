"use server";

import client from "@/lib/apollo/apollo-server";
import { ErrorResponse } from "@/types/error-response";
import { gql } from "@apollo/client";

const SIGN_UP_MUTATION = gql`
  mutation Mutation($input: CreateUserInput!) {
    create(input: $input) {
      data {
        id
        firstName
        lastName
        email
        gender
        password
        isStatus
        created_at
        updated_at
      }
    }
  }
`;

export const signup = async (input: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: SIGN_UP_MUTATION,
      variables: {
        input: {
          email: input.email,
          password: input.password,
          firstName: input.firstName,
          lastName: input.lastName,
        },
      },
    });

    if (errors) {
      const error: ErrorResponse = errors[0];
      return {
        error: error.message,
        data: null,
      };
    }

    return {
      data: data?.create,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};
