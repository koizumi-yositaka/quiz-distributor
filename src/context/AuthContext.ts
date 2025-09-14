import { createContext, useContext, type Dispatch } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthDispatch = () => {
  return useContext(AuthDispatchContext);
};

export const AuthContext = createContext<string | undefined>(undefined);

export const AuthDispatchContext = createContext<Dispatch<string> | undefined>(
  undefined
);

