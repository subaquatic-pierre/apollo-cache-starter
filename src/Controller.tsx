import React from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { TEST_QUERY } from "./hooks/useSetupCache";

type ControllerProps = {
  clearCache?: () => void;
};

export default function Controller({ clearCache }: ControllerProps) {
  const client = useApolloClient();
  const { data, loading, error } = useQuery(TEST_QUERY, {
    fetchPolicy: "cache-only",
  });
  const handleAddClick = () => {
    const {
      test: { value },
    } = data;
    client.writeQuery({
      query: TEST_QUERY,
      data: {
        test: {
          value: value + 1,
        },
      },
    });
    console.log("Add button clicked");
  };

  const handleMinusClick = () => {
    const {
      test: { value },
    } = data;
    client.writeQuery({
      query: TEST_QUERY,
      data: {
        test: {
          value: value - 1,
        },
      },
    });
    console.log("Minus button clicked");
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>{JSON.stringify(error.message)}</div>;

  return (
    <div className="col-container">
      Controller
      <div className="button-box">
        <button onClick={handleAddClick}>Addition</button>
        <button onClick={handleMinusClick}>Subtraction</button>
      </div>
      <div className="button-box">
        <button onClick={clearCache}>Clear Cache</button>
      </div>
    </div>
  );
}
