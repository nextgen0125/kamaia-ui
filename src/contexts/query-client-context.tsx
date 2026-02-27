
'use client';

import { queryClientOptions } from '@/lib/query-client-options';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, ReactNode } from 'react';


const QueryClientContext = createContext<undefined>(undefined);

export const QueryClientContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = React.useRef(new QueryClient(queryClientOptions));

  return (
    <QueryClientContext.Provider value={undefined}>
      <QueryClientProvider client={queryClient.current}>
        {children}
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
};



