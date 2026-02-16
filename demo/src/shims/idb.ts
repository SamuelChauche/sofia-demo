// Mock idb (IndexedDB) for demo mode
export const openDB = async () => ({
  get: async () => null,
  put: async () => {},
  delete: async () => {},
  getAll: async () => [],
  getAllKeys: async () => [],
  transaction: () => ({
    objectStore: () => ({
      get: async () => null,
      put: async () => {},
      getAll: async () => [],
      index: () => ({ getAll: async () => [] }),
    }),
    done: Promise.resolve(),
  }),
})

export const deleteDB = async () => {}
