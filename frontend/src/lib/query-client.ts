import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import TokenStorage from "@/infraestructure/cookies/cookie-storage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 20,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

export const clearPersistedQueryCache = () => {
  if (typeof window === "undefined") return;

  Object.keys(localStorage)
    .filter((key) => key.startsWith("RQ_"))
    .forEach((key) => localStorage.removeItem(key));
};

if (typeof window !== "undefined") {
  const localStoragePersister = createAsyncStoragePersister({
    storage: window.localStorage,
  });

  const token =
    typeof document !== "undefined" ? TokenStorage.getToken() : null;

  if (token) {
    persistQueryClient({
      queryClient,
      persister: localStoragePersister,
    });
  }
}

export const resetQueryClientOnLogout = () => {
  queryClient.clear();
  clearPersistedQueryCache();
  queryClient.getQueryCache().clear();
};

export { queryClient }