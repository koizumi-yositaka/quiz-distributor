import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { loadingInterceptor } from "../api/interceptors/loadingInterceptor";

type LoadingContextValue = {
  isLoading: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

export const useLoading = (): LoadingContextValue => {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return ctx;
};

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const counterRef = useRef(0);

  const increment = useCallback(() => {
    loadingInterceptor.increment();
  }, []);

  const decrement = useCallback(() => {
    loadingInterceptor.decrement();
  }, []);

  const reset = useCallback(() => {
    loadingInterceptor.reset();
  }, []);

  useEffect(() => {
    loadingInterceptor.setListener((count) => {
      counterRef.current = count;
      setIsLoading(count > 0);
    });
    return () => {
      loadingInterceptor.setListener(null);
    };
  }, []);

  const value = useMemo(
    () => ({ isLoading, increment, decrement, reset }),
    [isLoading, increment, decrement, reset]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};


