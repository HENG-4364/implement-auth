"use server";

import client from "@/lib/apollo/apollo-server";
import { ErrorResponse } from "@/types/error-response";
import { gql } from "@apollo/client";
import { cookies } from "next/headers";

const LOGIN_MUTATION = gql`
  mutation Mutation($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const signin = async (input: { email: string; password: string }) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        input: {
          email: input.email,
          password: input.password,
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

    cookies().set("sessions", data?.login?.accessToken, {
      httpOnly: true,
    });

    return {
      data: data?.login,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};
