import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { TEST_QUERY } from "./hooks/useSetupCache";
import { asyncRequest, useFetchStatus } from "./useFetchStatus";

type Some = {
  cool: string;
};

export default function Listener() {
  const { data, error, loading } = useQuery(TEST_QUERY, {
    fetchPolicy: "cache-only",
  });

  const [reply, set] = useState<Some>();
  const [
    { data: fetchData, error: fetchError, loading: fetchLoading },
    setStatus,
  ] = useFetchStatus();

  useEffect(() => {
    asyncRequest(setStatus);
  }, [setStatus]);

  if (error) return <div>{JSON.stringify(error.message)}</div>;

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="col-container">
      <div>
        <div>
          <h3>Using Controller</h3>
          {JSON.stringify(data)}
        </div>
        <hr style={{ width: "100%" }} />
      </div>
      <div>
        <div>
          <h3>Use loading status</h3>
          {fetchLoading && <div>Async Fetch Loading ...</div>}
          {fetchError && <div>{JSON.stringify(fetchError.message)}</div>}
          {fetchData && <div>{JSON.stringify(fetchData)}</div>}
        </div>
        <hr style={{ width: "100%" }} />
      </div>
    </div>
  );
}
