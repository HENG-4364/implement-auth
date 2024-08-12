"use server";

import client from "@/lib/apollo/apollo-server";
import { ErrorResponse } from "@/types/error-response";
import { gql } from "@apollo/client";
import { NextResponse } from "next/server";

const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      accessToken
      refreshToken
    }
  }
`;

export const getRefreshToken = async (refreshToken: string) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: REFRESH_TOKEN_MUTATION,
      variables: {
        input: {
          refreshToken: refreshToken,
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
    const response = NextResponse.next();
    response.cookies.set("sessions", data?.refreshToken?.accessToken, {
      httpOnly: true,
    });

    return {
      data: data?.refreshToken,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};
