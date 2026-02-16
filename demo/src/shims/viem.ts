// Mock viem for demo mode
export const getAddress = (addr: string) => addr
export const formatEther = (value: bigint) => (Number(value) / 1e18).toString()
export const parseEther = (value: string) => BigInt(Math.round(parseFloat(value) * 1e18))
export const isAddress = (addr: string) => /^0x[a-fA-F0-9]{40}$/.test(addr)
export const zeroAddress = '0x0000000000000000000000000000000000000000'
export const createPublicClient = () => ({})
export const createWalletClient = () => ({})
export const custom = () => ({})

// Chain exports
export const base = { id: 8453, name: 'Base' }
export const baseSepolia = { id: 84532, name: 'Base Sepolia' }
export const mainnet = { id: 1, name: 'Ethereum' }
