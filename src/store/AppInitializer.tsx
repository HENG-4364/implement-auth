"use client";

import React, { ReactNode } from "react";
import { useStore } from ".";

interface AppInitializerProps {
  me: any | null;
  children: ReactNode;
}

export default function AppInitializer({
  me,
  children,
}: AppInitializerProps) {
  useStore.setState({
    me,
  });

  return <>{children}</>;
}
