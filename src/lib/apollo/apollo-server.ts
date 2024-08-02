import "server-only";

import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cookies } from "next/headers";

const authLink = setContext(async (_, { headers }) => {
  const token = cookies().get("sessions")?.value;

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
      ...headers,
    },
  };
});

const link = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
  fetchOptions: { cache: "no-store" },
});

const client = new ApolloClient({
  link: from([authLink, link]),
  cache: new InMemoryCache(),
});

export default client;
