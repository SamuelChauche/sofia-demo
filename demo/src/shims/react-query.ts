// Mock @tanstack/react-query for demo mode
import React from 'react'

export class QueryClient {
  defaultOptions: any = {}
  constructor(opts?: any) {}
  invalidateQueries() {}
  resetQueries() {}
  clear() {}
}

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => children

export const useQuery = (opts: any) => ({
  data: undefined,
  isLoading: false,
  error: null,
  refetch: () => {},
})

export const useMutation = (opts: any) => ({
  mutate: () => {},
  mutateAsync: async () => {},
  isLoading: false,
  error: null,
})

export const useQueryClient = () => new QueryClient()
