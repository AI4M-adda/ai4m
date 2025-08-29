"use client";

import { createContext, useContext, useMemo } from "react";

export interface IPersonalAssistanceContext {
  input: string | null;
}

const PersonalAssistanceContext =
  createContext<IPersonalAssistanceContext | null>(null);

export const usePersonalAssistanceContext = () => {
  const context = useContext(PersonalAssistanceContext);
  if (!context) {
    throw new Error(
      "usePersonalAssistanceContext must be used within a PersonalAssistanceContext"
    );
  }
  return context;
};

export function PersonalAssistanceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const contextValue = useMemo(
    () => ({
      input: "",
    }),
    []
  );
  return (
    <PersonalAssistanceContext.Provider value={contextValue}>
      {children}
    </PersonalAssistanceContext.Provider>
  );
}
