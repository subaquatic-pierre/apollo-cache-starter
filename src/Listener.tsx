import { useQuery } from "@apollo/client";
import React from "react";
import { TEST_QUERY } from "./hooks/useSetupCache";

export default function Listener() {
  const { data, error, loading } = useQuery(TEST_QUERY, {
    fetchPolicy: "cache-only",
  });

  if (error) return <div>{JSON.stringify(error.message)}</div>;

  if (loading) return <div>Loading ...</div>;

  return <div className="col-container">{JSON.stringify(data)}</div>;
}
