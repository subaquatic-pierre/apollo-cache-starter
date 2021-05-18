import React, { useCallback, useEffect, useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
  useQuery,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";

import Controller from "./Controller";
import Listener from "./Listener";
import CacheSetup from "./CacheSetup";

function App() {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [persistor, setPersistor] =
    useState<CachePersistor<NormalizedCacheObject>>();

  useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();

      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: "write",
      });

      await newPersistor.restore();

      setPersistor(newPersistor);

      setClient(
        new ApolloClient({
          uri: "https://api.spacex.land/graphql",
          cache,
        })
      );
    }

    init().catch(console.error);
  }, []);

  const clearCache = useCallback(() => {
    if (!persistor) {
      return;
    }
    persistor.purge();
  }, [persistor]);

  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  if (!client) {
    return <h2>Initializing app...</h2>;
  }

  return (
    <ApolloProvider client={client}>
      <CacheSetup>
        <div className="app">
          <header className="heading-div">
            <h1>Apollo Cache</h1>
          </header>
          <div className="container">
            <div className="content-div">
              <article className="content-col">
                <Controller clearCache={clearCache} />
              </article>
              <article className="content-col">
                <Listener />
              </article>
            </div>
          </div>
        </div>
      </CacheSetup>
    </ApolloProvider>
  );
}

export default App;
