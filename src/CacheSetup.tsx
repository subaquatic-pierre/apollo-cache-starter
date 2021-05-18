import React, { ReactNode } from "react";
import useSetupCache from "./hooks/useSetupCache";

type SetupCacheProps = {
  children?: ReactNode;
};

export default function SetupCache({ children }: SetupCacheProps) {
  useSetupCache();
  return <>{children}</>;
}
