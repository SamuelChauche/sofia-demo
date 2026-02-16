import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../extension'),
      // Shim external dependencies that don't exist in demo
      '@plasmohq/storage': path.resolve(__dirname, 'src/shims/plasmo-storage.ts'),
      '@0xsofia/graphql': path.resolve(__dirname, 'src/shims/graphql.ts'),
      '@0xintuition/graphql': path.resolve(__dirname, 'src/shims/graphql.ts'),
      'wagmi': path.resolve(__dirname, 'src/shims/wagmi.ts'),
      'viem': path.resolve(__dirname, 'src/shims/viem.ts'),
      'viem/chains': path.resolve(__dirname, 'src/shims/viem.ts'),
      '@tanstack/react-query': path.resolve(__dirname, 'src/shims/react-query.ts'),
      '@wagmi/connectors': path.resolve(__dirname, 'src/shims/wagmi.ts'),
      'idb': path.resolve(__dirname, 'src/shims/idb.ts'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
