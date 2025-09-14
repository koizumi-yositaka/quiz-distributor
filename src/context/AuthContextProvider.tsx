import React, { useState } from "react";
import { AuthContext, AuthDispatchContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string>("");

  return (
    <AuthContext.Provider value={accessToken}>
      <AuthDispatchContext.Provider value={setAccessToken}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
