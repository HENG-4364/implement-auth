"use server";

import client from "@/lib/apollo/apollo-server";
import { gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      data {
        id
        firstName
        lastName
        email
        gender
        isStatus
        created_at
        updated_at
      }
    }
  }
`;

export const getUsers = async (): Promise<{
  users: any;
  error: string | null;
}> => {
  try {
    const { data, error } = await client.query({
      query: GET_USERS,
    });

    if (error?.message) {
      return {
        users: null,
        error: error.message,
      };
    }

    return {
      users: data?.users,
      error: null,
    };
  } catch (error: any) {
    return {
      users: null,
      error: error?.message,
    };
  }
};
