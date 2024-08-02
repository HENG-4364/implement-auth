"use server";

import client from "@/lib/apollo/apollo-server";
import { gql } from "@apollo/client";

const GET_ME = gql`
  query Me {
    getMe {
      id
      firstName
      lastName
      email
      gender
      password
      created_at
      updated_at
    }
  }
`;

export const getMe = async (): Promise<{
  me: any;
  error: string | null;
}> => {
  try {
    const { data, error } = await client.query({
      query: GET_ME,
    });

    if (error?.message) {
      return {
        me: null,
        error: error.message,
      };
    }

    return {
      me: data?.getMe,
      error: null,
    };
  } catch (error: any) {
    return {
      me: null,
      error: error?.message,
    };
  }
};
