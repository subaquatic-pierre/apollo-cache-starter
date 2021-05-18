import { useApolloClient, gql } from "@apollo/client";

export const TEST_QUERY = gql`
  query Test {
    test {
      value
    }
  }
`;

export default function useSetupCache() {
  const client = useApolloClient();

  try {
    const data = client.readQuery({ query: TEST_QUERY });
    if (!data) throw new Error("Query not found");
  } catch (error) {
    client.writeQuery({
      query: TEST_QUERY,
      data: {
        test: {
          value: 1,
        },
      },
    });
  }
}
