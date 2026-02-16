// Mock wagmi for demo mode
import React from 'react'

export const useAccount = () => ({
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  isConnected: true,
  isDisconnected: false,
  status: 'connected',
  chain: { id: 8453, name: 'Base' },
})

export const useConnect = () => ({
  connect: () => {},
  connectors: [],
  isPending: false,
  error: null,
})

export const useDisconnect = () => ({
  disconnect: () => {},
})

export const useBalance = () => ({
  data: { formatted: '1.5', symbol: 'ETH', value: BigInt(1500000000000000000) },
  isLoading: false,
})

export const useChainId = () => 8453

export const createConfig = () => ({})
export const http = () => ({})
export const WagmiProvider = ({ children }: { children: React.ReactNode }) => children
export const WagmiConfig = ({ children }: { children: React.ReactNode }) => children

// Connector stubs
export const injected = () => ({})
export const metaMask = () => ({})
export const coinbaseWallet = () => ({})
export const walletConnect = () => ({})
