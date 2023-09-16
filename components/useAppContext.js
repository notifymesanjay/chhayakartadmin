import React, { createContext, useContext, useEffect } from "react";
import useAuthService from "../services/authService";
import { ResponsiveProvider } from "./shared/use-responsive";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const { authService } = useAuthService();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authorizationData"));
    authService.setAuthentication({ ...authData });
  }, []);

  return (
    <AppContext.Provider value={{}}>
      <ResponsiveProvider>{children}</ResponsiveProvider>
    </AppContext.Provider>
  );
}

export default function useAppContext() {
  return useContext(AppContext);
}
