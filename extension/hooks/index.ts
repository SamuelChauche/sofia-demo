/**
 * DEMO HOOKS - All hooks return hardcoded mock data
 * Original hooks backed up in hooks.bak/
 */

import { useState, useCallback } from 'react'
import {
  MOCK_WALLET,
  MOCK_GROUPS,
  MOCK_TRIPLETS,
  MOCK_BOOKMARK_LISTS,
  MOCK_BOOKMARKED_TRIPLETS,
  MOCK_QUESTS,
  MOCK_USER_PROGRESS,
  MOCK_FOLLOWING,
  MOCK_FOLLOWERS,
  MOCK_TRUST_CIRCLE,
  MOCK_DISCOVERY_STATS,
  MOCK_CATEGORIES,
} from '../mock/mock-data'

// ============================================================
// TYPE RE-EXPORTS (keep backward compat)
// ============================================================

export type VoteType = 'like' | 'dislike'
export interface VoteOnTripleResult {
  vote: (tripleTermId: string, voteType: VoteType) => Promise<void>
  reset: () => void
  loading: boolean
  error: string | null
  success: boolean
  votingTripleId: string | null
}
export type VoteState = 'like' | 'dislike' | null
export interface TripleVoteData {
  userVote: VoteState
  likeCount: number
  dislikeCount: number
}
export interface ModalTriplet {
  id: string
  triplet: { subject: string; predicate: string; object: string }
  description: string
  url: string
  intention?: string
}
export interface AccountAtom {
  termId: string
  label: string
  image?: string
  walletAddress?: string
  id?: string
  data?: string
}
export interface LevelUpPreview {
  currentLevel: number
  nextLevel: number
  cost: number
  benefits: string[]
}

export type IntentionGroupWithStats = (typeof MOCK_GROUPS)[0]
export type SortOption = 'level' | 'urls' | 'alphabetic' | 'recent'
export type UrlCertificationStatus = {
  url: string
  isCertifiedOnChain: boolean
  allCertificationLabels: string[]
  tripleDetails?: { tripleTermId: string }[]
}

// ============================================================
// WALLET & AUTH
// ============================================================

export const useWalletFromStorage = () => MOCK_WALLET

export const openAuthTab = () => {
  console.log('[Demo] openAuthTab called')
}

export const disconnectWallet = async () => {
  console.log('[Demo] disconnectWallet called')
}

// ============================================================
// BLOCKCHAIN WRITE OPERATIONS (no-ops)
// ============================================================

export const useCreateAtom = () => ({
  createAtomWithMultivault: async () => ({ success: true, vaultId: '0xdemo', atomHash: '0xdemo', txHash: '0xdemo' }),
  createAtomsBatch: async () => ({}),
  pinAtomToIPFS: async (atomData: any) => ({ atomData, ipfsUri: 'ipfs://demo', encodedData: '0x' as `0x${string}` }),
  createAtomsFromPinned: async () => ({}),
  ensureProxyApproval: async () => {},
})

export const useCreateTripleOnChain = () => ({
  createTripleOnChain: async () => ({
    success: true, tripleVaultId: '0xdemo', txHash: '0xdemo' as `0x${string}`,
    subjectVaultId: '0xdemo', predicateVaultId: '0xdemo', objectVaultId: '0xdemo',
    source: 'created' as const, tripleHash: '0xdemo',
  }),
  createTriplesBatch: async () => ({
    success: true, results: [], txHash: '0xdemo' as `0x${string}`,
    failedTriples: [], createdCount: 0, depositCount: 0,
  }),
})

export const useWeightOnChain = () => ({
  addWeight: async () => ({ success: true, txHash: '0xdemo' as `0x${string}` }),
  addShares: async () => ({ success: true, txHash: '0xdemo' as `0x${string}` }),
  removeWeight: async () => ({ success: true, txHash: '0xdemo' as `0x${string}` }),
})

export const useRedeemTriple = () => {
  const redeemPosition = useCallback(async () => ({ success: true as const, txHash: '0xdemo' as `0x${string}` }), [])
  const redeemAllPositions = useCallback(async (_ids: string[]) => ({ success: true as const, txHash: '0xdemo' as `0x${string}` }), [])
  const getUserShares = useCallback(async () => '0', [])
  return { redeemPosition, redeemAllPositions, getUserShares, loading: false }
}

export const useIntentionCertify = () => {
  const certifyWithIntention = useCallback(async () => {}, [])
  const certifyWithCustomPredicate = useCallback(async () => {}, [])
  const reset = useCallback(() => {}, [])
  return {
    certifyWithIntention,
    certifyWithCustomPredicate,
    reset,
    loading: false,
    error: null as string | null,
    success: false,
    tripleVaultId: null as string | null,
    operationType: null as 'created' | 'deposit' | null,
    transactionHash: null as string | null,
    currentIntention: null,
  }
}

export const useVoteOnTriple = (): VoteOnTripleResult => ({
  vote: async () => {},
  reset: () => {},
  loading: false,
  error: null,
  success: false,
  votingTripleId: null,
})

export const useTripleVotes = (_tripleIds?: string[]) => ({
  votesMap: new Map<string, TripleVoteData>(),
  loading: false,
  refetch: () => {},
})

export const useEchoPublishing = () => ({
  publishTriplet: async () => ({
    success: true, tripleVaultId: '0xdemo', txHash: '0xdemo' as `0x${string}`,
    subjectVaultId: '0xdemo', predicateVaultId: '0xdemo', objectVaultId: '0xdemo',
    source: 'created' as const, tripleHash: '0xdemo',
  }),
  publishSelected: async () => ({
    success: true, results: [], txHash: '0xdemo' as `0x${string}`,
    failedTriples: [], createdCount: 3, depositCount: 2,
  }),
})

export const useTrustPage = () => ({
  trustPage: async () => {},
  loading: false,
  error: null as string | null,
  success: false,
  tripleVaultId: null as string | null,
  operationType: null as 'created' | 'deposit' | null,
  transactionHash: null as string | null,
})

export const useTrustAccount = () => ({
  trustAccount: async () => {},
  loading: false,
  error: null as string | null,
  success: false,
  tripleVaultId: null as string | null,
  operationType: null as 'created' | 'deposit' | null,
  transactionHash: null as string | null,
})

// ============================================================
// BLOCKCHAIN READ OPERATIONS (mock data)
// ============================================================

export const useIntuitionTriplets = () => ({
  triplets: MOCK_TRIPLETS,
  isLoading: false,
  refreshFromAPI: async () => MOCK_TRIPLETS,
})

export const usePageBlockchainData = () => ({
  triplets: [],
  counts: {
    atomsCount: 5, triplesCount: 12, displayedAtomsCount: 5, displayedTriplesCount: 12,
    totalShares: 45, totalPositions: 8, attestationsCount: 3, trustCount: 99,
    distrustCount: 1, totalSupport: 100, trustRatio: 99,
  },
  atomsList: [],
  loading: false,
  error: null as string | null,
  currentUrl: 'https://join.base.app/' as string | null,
  pageTitle: 'Base | Join the Onchain Economy' as string | null,
  isRestricted: false,
  restrictionMessage: null as string | null,
  fetchDataForCurrentPage: async () => {},
  pauseRefresh: () => {},
  resumeRefresh: () => {},
})

export const useBondingCurveData = (_tripleId?: string) => ({
  chartData: [],
  currentPrice: '0.001',
  priceChange: { value: 0, percentage: 0, direction: 'up' as const },
  isLoading: false,
  error: null as Error | null,
  userShares: '0',
  totalShares: '1000',
  marketCap: '1.5',
  totalInvested: '0.8',
  totalRedeemed: '0.1',
})

export const useDepositPreview = (_tripleId?: string, _amount?: string) => ({
  sharesOut: '0',
  effectivePrice: '0',
  fees: '0',
  totalCost: '0',
  isLoading: false,
  error: null as Error | null,
})

export const useUserAtomStats = (_termId?: string, _address?: string) => ({
  termId: _termId || '',
  label: 'demo-user.eth',
  totalMarketCap: '2500000000000000000',
  positionCount: 18,
  currentSharePrice: '1000000000000000',
  totalShares: '25000000000000000000',
  followingCount: 4,
  followersCount: 3,
  followersMarketCap: '1500000000000000000',
  loading: false,
  error: null as string | null,
})

export const useGetAtomAccount = (_address?: string) => ({
  termId: '0xdemo',
  label: _address ? 'demo-user.eth' : '',
  image: '',
  walletAddress: _address || '',
  id: '0xdemo',
  data: _address || '',
  searchAccounts: async (_query: string): Promise<AccountAtom[]> => [],
})

export const useAccountStats = () => ({
  signalsCreated: 18,
  totalMarketCap: 2.5,
  loading: false,
  error: null as string | null,
})

// ============================================================
// SOCIAL & FOLLOW
// ============================================================

export const useDiscordProfile = () => ({
  username: 'demo_user#1234',
  avatar: '',
  loading: false,
  error: null as string | null,
})

export const useFollowAccount = () => ({
  followAccount: async () => ({ success: true, transactionHash: '0xdemo', tripleVaultId: '0xdemo' }),
  unfollowAccount: async () => ({ success: true }),
  isLoading: false,
})

export const useCreateFollowTriples = () => ({
  createFollowTriple: async () => ({ success: true, txHash: '0xdemo' }),
})

export const useCheckFollowStatus = (_termId?: string) => ({
  isFollowing: false,
  isTrusting: false,
  loading: false,
  refetch: async () => {},
})

export const useFollowing = () => ({
  accounts: MOCK_FOLLOWING,
  loading: false,
  error: null as string | null,
  refetch: async () => {},
})

export const useFollowers = () => ({
  accounts: MOCK_FOLLOWERS,
  loading: false,
  error: null as string | null,
  refetch: async () => {},
})

export const useTrustCircle = () => ({
  accounts: MOCK_TRUST_CIRCLE,
  loading: false,
  error: null as string | null,
  refetch: async () => {},
})

export const useTrustedByCount = (_termId?: string) => ({
  count: 7,
  loading: false,
  refetch: async () => {},
})

export const useSocialVerifier = () => ({
  isSocialVerified: true,
  canVerify: false,
  isVerifying: false,
  verifySocials: async () => ({ success: true }),
})

export const useIdentityResolution = (opts?: { label?: string; image?: string; walletAddress?: string }) => ({
  displayLabel: opts?.label || 'demo-user.eth',
  displayAvatar: opts?.image || '',
  resolvedAddress: opts?.walletAddress || MOCK_WALLET.walletAddress,
  loading: false,
})

// ============================================================
// GROUPS & INTENTIONS
// ============================================================

function sortGroups(groups: typeof MOCK_GROUPS, sortBy: SortOption) {
  return [...groups].sort((a, b) => {
    switch (sortBy) {
      case 'level': return b.level !== a.level ? b.level - a.level : b.activeUrlCount - a.activeUrlCount
      case 'urls': return b.activeUrlCount - a.activeUrlCount
      case 'alphabetic': return a.domain.localeCompare(b.domain)
      case 'recent': return b.updatedAt - a.updatedAt
      default: return 0
    }
  })
}

const useIntentionGroups = () => {
  const [sortBy, setSortBy] = useState<SortOption>('level')
  const [selectedGroup, setSelectedGroup] = useState<(typeof MOCK_GROUPS)[0] | null>(null)

  const selectGroup = useCallback((groupId: string | null) => {
    if (groupId === null) { setSelectedGroup(null); return }
    const group = MOCK_GROUPS.find(g => g.id === groupId) ?? null
    setSelectedGroup(group)
  }, [])

  return {
    groups: sortGroups(MOCK_GROUPS, sortBy),
    selectedGroup,
    isLoading: false,
    error: null as string | null,
    sortBy,
    setSortBy,
    loadGroups: async () => {},
    selectGroup,
    certifyUrl: async () => true,
    removeUrl: async () => true,
    refreshGroup: async () => {},
    deleteGroup: async () => true,
  }
}
export { useIntentionGroups }
export default useIntentionGroups

export const useOnChainIntentionGroups = () => ({
  groups: [],
  loading: false,
  error: null as string | null,
  refetch: async () => {},
})

const useGroupOnChainCertifications = (_groupId?: string, _urls?: string[]) => {
  const getUrlCertification = useCallback((_url: string): UrlCertificationStatus | undefined => undefined, [])
  const refetch = useCallback(async () => {}, [])
  return {
    certifications: [] as UrlCertificationStatus[],
    stats: {
      certifiedCount: 0,
      uncertifiedCount: 0,
      certifiedUrls: new Map<string, { isCertifiedOnChain: boolean; allCertificationLabels: string[] }>(),
    } as any,
    loading: false,
    error: null as string | null,
    getUrlCertification,
    refetch,
  }
}
export { useGroupOnChainCertifications }

const useGroupAmplify = () => {
  const amplify = useCallback(async (_groupId: string) => ({ success: true as const, txHash: '0xdemo' }), [])
  const reset = useCallback(() => {}, [])
  return {
    amplify,
    amplifyGroup: amplify,
    loading: false,
    error: null as string | null,
    result: null as { success: boolean; txHash?: string; error?: string } | null,
    reset,
  }
}
export { useGroupAmplify }

export const usePageIntentionStats = (_url?: string | null) => ({
  stats: { work: 3, learning: 2, fun: 0, inspiration: 1, buying: 0, trusted: 1, distrusted: 0 },
  intentions: { for_work: 3, for_learning: 2, for_fun: 0, for_inspiration: 1, for_buying: 0 },
  totalCertifications: 6,
  maxIntentionCount: 3,
  loading: false,
  error: null as string | null,
})

const useIntentionCategories = (_wallet?: string) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  return {
    categories: MOCK_CATEGORIES,
    selectedCategory,
    selectCategory: (cat: string | null) => setSelectedCategory(cat),
    loading: false,
    error: null as string | null,
    refetch: async () => {},
  }
}
export { useIntentionCategories }

// ============================================================
// CERTIFICATIONS & DISCOVERY
// ============================================================

export const useUserCertifications = () => ({
  certifications: [],
  loading: false,
  error: null as string | null,
  refetch: async () => {},
})

export const getCertificationForUrl = (_url: string) => null

export const useDiscoveryScore = () => ({
  stats: MOCK_DISCOVERY_STATS,
  loading: false,
  error: null as string | null,
  refetch: async () => {},
  claimedDiscoveryGold: 50,
  claimDiscoveryGold: async (amount: number) => amount,
})

export const usePageDiscovery = (_url?: string | null) => ({
  discoveryLevel: 'explorer' as const,
  score: 0.7,
  totalCertifications: 6,
  loading: false,
  error: null as string | null,
  refetch: async () => {},
})

export const useDiscoveryReward = () => ({
  reward: 10,
  claimed: false,
  loading: false,
  claimReward: async () => {},
  discoveryReward: 10,
  handleClaimReward: async (_claimFn?: any) => {},
  rewardClaimed: false,
  resetReward: () => {},
  calculateAndTriggerReward: (_totalCerts: number) => {},
})

// ============================================================
// UI HOOKS
// ============================================================

export const useFavicon = (url?: string) => {
  if (!url) return { faviconUrl: '', faviconError: false }
  try {
    const domain = new URL(url).hostname
    return { faviconUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`, faviconError: false }
  } catch { return { faviconUrl: '', faviconError: true } }
}

// Re-export types used by blockchain components
import type { PageBlockchainTriplet, PageAtomInfo, PageBlockchainCounts } from '~/types/page'

export const getTotalShares = (triplet: PageBlockchainTriplet): number => {
  if (!triplet.positions) return 0
  return triplet.positions.reduce((sum: number, pos: any) => sum + (Number(pos.shares || 0) / 1e18), 0)
}

export interface CredibilityAnalysis {
  trustCount: number
  distrustCount: number
  totalSupport: number
  trustRatio: number
  barColor: string
  atomsCount: number
  triplesCount: number
  atomsList: PageAtomInfo[]
}

export const useCredibilityAnalysis = (counts?: PageBlockchainCounts, atomsList?: PageAtomInfo[]): CredibilityAnalysis => ({
  trustCount: counts?.trustCount ?? 99,
  distrustCount: counts?.distrustCount ?? 1,
  totalSupport: counts?.totalSupport ?? 100,
  trustRatio: counts?.trustRatio ?? 99,
  barColor: '#22c55e',
  atomsCount: counts?.atomsCount ?? 5,
  triplesCount: counts?.triplesCount ?? 12,
  atomsList: atomsList ?? [],
})

export const useCertificationModal = () => ({
  showWeightModal: false,
  modalTriplets: [] as ModalTriplet[],
  modalType: 'trust' as 'trust' | 'distrust',
  openTrustModal: () => {},
  openDistrustModal: () => {},
  openIntentionModal: () => {},
  handleModalSubmit: async () => {},
  handleModalClose: () => {},
  trustState: { loading: false, success: false, error: null, operationType: null, transactionHash: null },
  distrustState: { loading: false, success: false, error: null, operationType: null, transactionHash: null },
  intentionState: { loading: false, success: false, error: null, operationType: null, transactionHash: null, currentIntention: null },
})

// ============================================================
// QUEST & XP
// ============================================================

export const useQuestSystem = (_targetWallet?: string) => ({
  quests: MOCK_QUESTS,
  activeQuests: MOCK_QUESTS.filter(q => q.status === 'active'),
  completedQuests: MOCK_QUESTS.filter(q => q.status === 'completed'),
  claimableQuests: MOCK_QUESTS.filter(q => q.status === 'claimable_xp'),
  userProgress: MOCK_USER_PROGRESS,
  level: 5,
  totalXP: 1250,
  xpForNextLevel: 500,
  loading: false,
  error: null as string | null,
  claimingQuestId: null as string | null,
  refreshQuests: async () => {},
  markQuestCompleted: async () => {},
  claimQuestXP: async () => ({ success: true, txHash: '0xdemo' }),
})

export const useUserQuests = (_walletAddress?: string) => ({
  completedQuests: MOCK_QUESTS.filter(q => q.status === 'completed'),
  totalXP: 1250,
  level: 5,
  signalsCreated: 18,
  loading: false,
  error: null as string | null,
})

export const useGoldSystem = () => ({
  discoveryGold: 100,
  certificationGold: 50,
  spentGold: 0,
  totalGold: 150,
  loading: false,
})

const useLevelUp = () => {
  const preview = useCallback(async (_groupId: string): Promise<LevelUpPreview | null> => ({
    currentLevel: 3,
    nextLevel: 4,
    cost: 50,
    benefits: ['Increased visibility', 'More trust weight'],
  }), [])
  const levelUp = useCallback(async (_groupId: string, _certBreakdown?: any) => ({ success: true as const, txHash: '0xdemo', newPredicate: 'visits for work' }), [])
  const reset = useCallback(() => {}, [])
  return {
    preview,
    previewLevelUp: preview,
    levelUp,
    loading: false,
    error: null as string | null,
    result: null as { success: boolean; txHash?: string; error?: string; newPredicate?: string; required?: number; available?: number } | null,
    reset,
  }
}
export { useLevelUp }

// ============================================================
// BOOKMARKS & LISTS
// ============================================================

export const useBookmarks = () => {
  const [lists, setLists] = useState(MOCK_BOOKMARK_LISTS)
  const [triplets, setTriplets] = useState(MOCK_BOOKMARKED_TRIPLETS)

  return {
    lists,
    triplets,
    createList: async (name: string, description?: string) => {
      const id = `list-${Date.now()}`
      const newList = { id, walletAddress: MOCK_WALLET.walletAddress, name, description: description || '', tripletIds: [] as string[], createdAt: Date.now(), updatedAt: Date.now() }
      setLists(prev => [...prev, newList])
      return id
    },
    deleteList: async (id: string) => { setLists(prev => prev.filter(l => l.id !== id)); return true },
    updateList: async (id: string, updates: any) => {
      const updated = { ...lists.find(l => l.id === id)!, ...updates, updatedAt: Date.now() }
      setLists(prev => prev.map(l => l.id === id ? updated : l))
      return updated
    },
    addTripletToList: async (_listId: string, triplet: any, sourceInfo: any) => {
      const newT = { id: `bm-${Date.now()}`, triplet, ...sourceInfo, addedAt: Date.now() }
      setTriplets(prev => [...prev, newT])
      return newT
    },
    removeTripletFromList: async (_listId: string, tripletId: string) => {
      setTriplets(prev => prev.filter(t => t.id !== tripletId))
      return true
    },
    getTripletsByList: (listId: string) => {
      const list = lists.find(l => l.id === listId)
      if (!list) return []
      return triplets.filter(t => list.tripletIds.includes(t.id))
    },
    searchTriplets: (query: string) => {
      if (!query.trim()) return triplets
      const q = query.toLowerCase()
      return triplets.filter(t =>
        t.triplet.object.toLowerCase().includes(q) ||
        (t.url && t.url.toLowerCase().includes(q))
      )
    },
    refreshFromLocal: async () => ({ lists, triplets }),
  }
}

export const useUserLists = () => ({
  lists: MOCK_BOOKMARK_LISTS,
  loading: false,
  error: null as string | null,
})

export const useUserSignals = () => ({
  signals: MOCK_TRIPLETS.filter(t => t.source === 'user_created'),
  loading: false,
  error: null as string | null,
})

// ============================================================
// RECOMMENDATIONS & INTEREST
// ============================================================

export const useRecommendations = () => ({
  recommendations: [],
  loading: false,
  error: null as string | null,
  refresh: async () => {},
})

const useInterestAnalysis = () => ({
  interests: [
    { id: 'int-1', name: 'Web3 Development', domains: ['github.com', 'ethereum.org'], level: 4, xp: 850, xpToNextLevel: 150, totalCertifications: 42, certifications: { work: 30, learning: 8, fun: 2, inspiration: 2, buying: 0 }, confidence: 0.95, reasoning: 'Building decentralized apps' },
    { id: 'int-2', name: 'DeFi Protocols', domains: ['uniswap.org', 'aave.com'], level: 3, xp: 620, xpToNextLevel: 180, totalCertifications: 28, certifications: { work: 5, learning: 18, fun: 0, inspiration: 5, buying: 0 }, confidence: 0.88, reasoning: 'Decentralized finance research' },
    { id: 'int-3', name: 'Ethereum Protocol', domains: ['ethereum.org', 'ethresear.ch'], level: 2, xp: 480, xpToNextLevel: 320, totalCertifications: 15, certifications: { work: 3, learning: 10, fun: 0, inspiration: 2, buying: 0 }, confidence: 0.82, reasoning: 'Core protocol research' },
    { id: 'int-4', name: 'AI/ML Research', domains: ['arxiv.org', 'huggingface.co'], level: 2, xp: 320, xpToNextLevel: 480, totalCertifications: 10, certifications: { work: 1, learning: 2, fun: 3, inspiration: 4, buying: 0 }, confidence: 0.75, reasoning: 'Machine learning exploration' },
  ],
  summary: 'Active developer with strong focus on web3 and AI technologies.',
  totalPositions: 47,
  isLoading: false,
  loading: false,
  error: null as string | null,
  analyzedAt: new Date().toISOString(),
  analyzeInterests: async (_wallet?: string) => {},
  reset: () => {},
  loadFromCache: async (_wallet?: string) => {},
})
export { useInterestAnalysis }

export const useInterestAttention = () => ({
  attentionData: [],
  loading: false,
  error: null as string | null,
})

const useCircleInterestRecommendations = () => ({
  recommendations: [],
  loading: false,
  error: null as string | null,
})
export { useCircleInterestRecommendations }

// ============================================================
// TRACKING
// ============================================================

export const useTracking = () => ({
  isTrackingEnabled: true,
  toggleTracking: async () => { console.log('[Demo] toggleTracking') },
})
