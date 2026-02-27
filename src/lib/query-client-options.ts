import { QueryClientConfig } from "@tanstack/react-query";

export const queryClientOptions: QueryClientConfig = {
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 // 1 minuto
        }
    }
};