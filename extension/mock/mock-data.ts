/**
 * Mock data for Sofia Demo
 * All hardcoded data used by mock hooks
 */

// ============================================================
// WALLET
// ============================================================
export const MOCK_WALLET = {
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18',
  walletType: 'metamask',
  authenticated: true,
  isLoading: false,
  ready: true,
}

// ============================================================
// INTENTION GROUPS (EchoesTab)
// ============================================================
export const MOCK_GROUPS = [
  {
    id: 'github.com',
    domain: 'github.com',
    title: 'github.com',
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now() - 3600000,
    urls: [
      { url: 'https://github.com/ethereum/solidity', title: 'Solidity Language', domain: 'github.com', addedAt: Date.now() - 86400000 * 10, attentionTime: 720000, certification: 'work' as const, removed: false },
      { url: 'https://github.com/wagmi-dev/wagmi', title: 'Wagmi - React Hooks for Ethereum', domain: 'github.com', addedAt: Date.now() - 86400000 * 5, attentionTime: 480000, certification: 'learning' as const, removed: false },
      { url: 'https://github.com/foundry-rs/foundry', title: 'Foundry - Smart Contract Toolkit', domain: 'github.com', addedAt: Date.now() - 86400000 * 8, attentionTime: 360000, certification: 'work' as const, removed: false },
      { url: 'https://github.com/OpenZeppelin/openzeppelin-contracts', title: 'OpenZeppelin Contracts', domain: 'github.com', addedAt: Date.now() - 86400000 * 20, attentionTime: 900000, certification: 'work' as const, removed: false },
    ],
    level: 5,
    currentPredicate: 'visits for work',
    predicateHistory: [],
    totalAttentionTime: 72000,
    totalCertifications: 8,
    dominantCertification: 'work',
    activeUrlCount: 4,
    certifiedCount: 4,
    isVirtualGroup: false,
    certificationBreakdown: { work: 5, learning: 3, fun: 0, inspiration: 0, buying: 0, trusted: 0, distrusted: 0 },
  },
  {
    id: 'ethereum.org',
    domain: 'ethereum.org',
    title: 'ethereum.org',
    createdAt: Date.now() - 86400000 * 25,
    updatedAt: Date.now() - 7200000,
    urls: [
      { url: 'https://ethereum.org/en/developers/', title: 'Ethereum Developer Resources', domain: 'ethereum.org', addedAt: Date.now() - 86400000 * 25, attentionTime: 1200000, certification: 'learning' as const, removed: false },
      { url: 'https://ethereum.org/en/whitepaper/', title: 'Ethereum Whitepaper', domain: 'ethereum.org', addedAt: Date.now() - 86400000 * 20, attentionTime: 300000, certification: 'learning' as const, removed: false },
      { url: 'https://ethereum.org/en/roadmap/', title: 'Ethereum Roadmap', domain: 'ethereum.org', addedAt: Date.now() - 86400000 * 15, attentionTime: 180000, certification: 'inspiration' as const, removed: false },
    ],
    level: 4,
    currentPredicate: 'visits for learning',
    predicateHistory: [],
    totalAttentionTime: 54000,
    totalCertifications: 6,
    dominantCertification: 'learning',
    activeUrlCount: 3,
    certifiedCount: 3,
    isVirtualGroup: false,
    certificationBreakdown: { work: 0, learning: 5, fun: 0, inspiration: 1, buying: 0, trusted: 0, distrusted: 0 },
  },
  {
    id: 'youtube.com',
    domain: 'youtube.com',
    title: 'youtube.com',
    createdAt: Date.now() - 86400000 * 20,
    updatedAt: Date.now() - 1800000,
    urls: [
      { url: 'https://youtube.com/watch?v=abc123', title: 'Vitalik Buterin on Ethereum Future', domain: 'youtube.com', addedAt: Date.now() - 86400000 * 10, attentionTime: 180000, certification: 'inspiration' as const, removed: false },
      { url: 'https://youtube.com/watch?v=def456', title: 'Solidity Tutorial for Beginners', domain: 'youtube.com', addedAt: Date.now() - 86400000 * 15, attentionTime: 420000, certification: 'learning' as const, removed: false },
      { url: 'https://youtube.com/watch?v=ghi789', title: 'DeFi Explained Simply', domain: 'youtube.com', addedAt: Date.now() - 86400000 * 5, attentionTime: 240000, certification: 'learning' as const, removed: false },
    ],
    level: 3,
    currentPredicate: 'visits for learning',
    predicateHistory: [],
    totalAttentionTime: 36000,
    totalCertifications: 4,
    dominantCertification: 'learning',
    activeUrlCount: 3,
    certifiedCount: 3,
    isVirtualGroup: false,
    certificationBreakdown: { work: 0, learning: 3, fun: 0, inspiration: 1, buying: 0, trusted: 0, distrusted: 0 },
  },
  {
    id: 'twitter.com',
    domain: 'twitter.com',
    title: 'twitter.com',
    createdAt: Date.now() - 86400000 * 18,
    updatedAt: Date.now() - 900000,
    urls: [
      { url: 'https://twitter.com/VitalikButerin', title: 'Vitalik Buterin on X', domain: 'twitter.com', addedAt: Date.now() - 86400000 * 18, attentionTime: 1500000, certification: 'inspiration' as const, removed: false },
      { url: 'https://twitter.com/ethereum', title: 'Ethereum on X', domain: 'twitter.com', addedAt: Date.now() - 86400000 * 15, attentionTime: 1080000, certification: 'trusted' as const, removed: false },
    ],
    level: 3,
    currentPredicate: 'visits for inspiration',
    predicateHistory: [],
    totalAttentionTime: 28000,
    totalCertifications: 3,
    dominantCertification: 'inspiration',
    activeUrlCount: 2,
    certifiedCount: 2,
    isVirtualGroup: false,
    certificationBreakdown: { work: 0, learning: 0, fun: 0, inspiration: 2, buying: 0, trusted: 1, distrusted: 0 },
  },
  {
    id: 'docs.soliditylang.org',
    domain: 'docs.soliditylang.org',
    title: 'docs.soliditylang.org',
    createdAt: Date.now() - 86400000 * 22,
    updatedAt: Date.now() - 10800000,
    urls: [
      { url: 'https://docs.soliditylang.org/en/latest/', title: 'Solidity Documentation', domain: 'docs.soliditylang.org', addedAt: Date.now() - 86400000 * 22, attentionTime: 1800000, certification: 'work' as const, removed: false },
      { url: 'https://docs.soliditylang.org/en/latest/security-considerations.html', title: 'Security Considerations', domain: 'docs.soliditylang.org', addedAt: Date.now() - 86400000 * 12, attentionTime: 720000, certification: 'work' as const, removed: false },
    ],
    level: 6,
    currentPredicate: 'visits for work',
    predicateHistory: [],
    totalAttentionTime: 90000,
    totalCertifications: 10,
    dominantCertification: 'work',
    activeUrlCount: 2,
    certifiedCount: 2,
    isVirtualGroup: false,
    certificationBreakdown: { work: 8, learning: 2, fun: 0, inspiration: 0, buying: 0, trusted: 0, distrusted: 0 },
  },
  {
    id: 'defillama.com',
    domain: 'defillama.com',
    title: 'defillama.com',
    createdAt: Date.now() - 86400000 * 12,
    updatedAt: Date.now() - 5400000,
    urls: [
      { url: 'https://defillama.com/', title: 'DefiLlama - DeFi Dashboard', domain: 'defillama.com', addedAt: Date.now() - 86400000 * 12, attentionTime: 840000, certification: 'work' as const, removed: false },
      { url: 'https://defillama.com/chains', title: 'Chains Overview', domain: 'defillama.com', addedAt: Date.now() - 86400000 * 8, attentionTime: 480000, certification: 'learning' as const, removed: false },
    ],
    level: 2,
    currentPredicate: 'visits for work',
    predicateHistory: [],
    totalAttentionTime: 18000,
    totalCertifications: 3,
    dominantCertification: 'work',
    activeUrlCount: 2,
    certifiedCount: 2,
    isVirtualGroup: false,
    certificationBreakdown: { work: 2, learning: 1, fun: 0, inspiration: 0, buying: 0, trusted: 0, distrusted: 0 },
  },
  {
    id: 'arxiv.org',
    domain: 'arxiv.org',
    title: 'arxiv.org',
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 43200000,
    urls: [
      { url: 'https://arxiv.org/abs/2301.00001', title: 'Attention Is All You Need - Revisited', domain: 'arxiv.org', addedAt: Date.now() - 86400000 * 8, attentionTime: 180000, certification: 'learning' as const, removed: false },
    ],
    level: 1,
    currentPredicate: 'visits for learning',
    predicateHistory: [],
    totalAttentionTime: 12000,
    totalCertifications: 1,
    dominantCertification: 'learning',
    activeUrlCount: 1,
    certifiedCount: 1,
    isVirtualGroup: false,
    certificationBreakdown: { work: 0, learning: 1, fun: 0, inspiration: 0, buying: 0, trusted: 0, distrusted: 0 },
  },
]

// ============================================================
// INTUITION TRIPLETS (HistoryTab)
// ============================================================
export const MOCK_TRIPLETS = [
  {
    blockNumber: 18523456,
    id: '0x0001',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'Solidity Documentation' },
    objectTermId: '0xabc001',
    url: 'https://docs.soliditylang.org/en/latest/',
    description: 'Official Solidity programming language documentation',
    timestamp: Date.now() - 3600000,
    source: 'intuition_api' as const,
    position: { linear: 0.5, offsetProgressive: 2.3, created_at: new Date(Date.now() - 86400000 * 5).toISOString() },
    totalMarketCap: '1500000000000000000',
  },
  {
    blockNumber: 18523400,
    id: '0x0002',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Ethereum Developer Resources' },
    objectTermId: '0xabc002',
    url: 'https://ethereum.org/en/developers/',
    description: 'Comprehensive Ethereum development guides',
    timestamp: Date.now() - 7200000,
    source: 'intuition_api' as const,
    position: { linear: 0.3, offsetProgressive: 1.8, created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    totalMarketCap: '2000000000000000000',
  },
  {
    blockNumber: 18523350,
    id: '0x0003',
    triplet: { subject: 'I', predicate: 'visits for inspiration', object: 'Vitalik Buterin on X' },
    objectTermId: '0xabc003',
    url: 'https://twitter.com/VitalikButerin',
    description: 'Vitalik Buterin\'s thoughts on Ethereum and crypto',
    timestamp: Date.now() - 14400000,
    source: 'intuition_api' as const,
    position: { linear: 0.7, offsetProgressive: 3.1, created_at: new Date(Date.now() - 86400000 * 7).toISOString() },
    totalMarketCap: '800000000000000000',
  },
  {
    blockNumber: 18523300,
    id: '0x0004',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'OpenZeppelin Contracts' },
    objectTermId: '0xabc004',
    url: 'https://github.com/OpenZeppelin/openzeppelin-contracts',
    description: 'Battle-tested smart contract libraries',
    timestamp: Date.now() - 21600000,
    source: 'user_created' as const,
    txHash: '0xdemo004',
    tripleStatus: 'on-chain' as const,
    totalMarketCap: '3000000000000000000',
  },
  {
    blockNumber: 18523250,
    id: '0x0005',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Wagmi React Hooks' },
    objectTermId: '0xabc005',
    url: 'https://github.com/wagmi-dev/wagmi',
    description: 'React Hooks for Ethereum',
    timestamp: Date.now() - 43200000,
    source: 'intuition_api' as const,
    position: { linear: 0.4, offsetProgressive: 2.0, created_at: new Date(Date.now() - 86400000 * 2).toISOString() },
    totalMarketCap: '1200000000000000000',
  },
  {
    blockNumber: 18523200,
    id: '0x0006',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'DeFi Explained Simply' },
    objectTermId: '0xabc006',
    url: 'https://youtube.com/watch?v=ghi789',
    description: 'Simple DeFi explainer video',
    timestamp: Date.now() - 86400000,
    source: 'intuition_api' as const,
    totalMarketCap: '500000000000000000',
  },
  {
    blockNumber: 18523150,
    id: '0x0007',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'DefiLlama Dashboard' },
    objectTermId: '0xabc007',
    url: 'https://defillama.com/',
    description: 'DeFi TVL aggregator and analytics',
    timestamp: Date.now() - 86400000 * 2,
    source: 'user_created' as const,
    txHash: '0xdemo007',
    tripleStatus: 'on-chain' as const,
    totalMarketCap: '2500000000000000000',
  },
  {
    blockNumber: 18523100,
    id: '0x0008',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'Foundry Toolkit' },
    objectTermId: '0xabc008',
    url: 'https://github.com/foundry-rs/foundry',
    description: 'Blazing fast Ethereum development toolkit',
    timestamp: Date.now() - 86400000 * 3,
    source: 'intuition_api' as const,
    totalMarketCap: '900000000000000000',
  },
  {
    blockNumber: 18523050,
    id: '0x0009',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Ethereum Whitepaper' },
    objectTermId: '0xabc009',
    url: 'https://ethereum.org/en/whitepaper/',
    description: 'Original Ethereum whitepaper by Vitalik Buterin',
    timestamp: Date.now() - 86400000 * 4,
    source: 'intuition_api' as const,
    position: { linear: 0.2, offsetProgressive: 1.1, created_at: new Date(Date.now() - 86400000 * 10).toISOString() },
    totalMarketCap: '4000000000000000000',
  },
  {
    blockNumber: 18523000,
    id: '0x0010',
    triplet: { subject: 'I', predicate: 'visits for inspiration', object: 'Ethereum Roadmap' },
    objectTermId: '0xabc010',
    url: 'https://ethereum.org/en/roadmap/',
    description: 'The future plans for Ethereum protocol',
    timestamp: Date.now() - 86400000 * 5,
    source: 'intuition_api' as const,
    totalMarketCap: '600000000000000000',
  },
  {
    blockNumber: 18522950,
    id: '0x0011',
    triplet: { subject: 'I', predicate: 'trusts', object: 'Ethereum on X' },
    objectTermId: '0xabc011',
    url: 'https://twitter.com/ethereum',
    description: 'Official Ethereum Twitter account',
    timestamp: Date.now() - 86400000 * 6,
    source: 'user_created' as const,
    txHash: '0xdemo011',
    tripleStatus: 'on-chain' as const,
    totalMarketCap: '1800000000000000000',
  },
  {
    blockNumber: 18522900,
    id: '0x0012',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'Security Considerations' },
    objectTermId: '0xabc012',
    url: 'https://docs.soliditylang.org/en/latest/security-considerations.html',
    description: 'Solidity security best practices',
    timestamp: Date.now() - 86400000 * 7,
    source: 'intuition_api' as const,
    totalMarketCap: '700000000000000000',
  },
  {
    blockNumber: 18522850,
    id: '0x0013',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Solidity Tutorial for Beginners' },
    objectTermId: '0xabc013',
    url: 'https://youtube.com/watch?v=def456',
    description: 'Step-by-step Solidity learning video',
    timestamp: Date.now() - 86400000 * 8,
    source: 'intuition_api' as const,
    totalMarketCap: '400000000000000000',
  },
  {
    blockNumber: 18522800,
    id: '0x0014',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Attention Is All You Need' },
    objectTermId: '0xabc014',
    url: 'https://arxiv.org/abs/2301.00001',
    description: 'Seminal transformer architecture paper',
    timestamp: Date.now() - 86400000 * 9,
    source: 'intuition_api' as const,
    totalMarketCap: '300000000000000000',
  },
  {
    blockNumber: 18522750,
    id: '0x0015',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Chains Overview' },
    objectTermId: '0xabc015',
    url: 'https://defillama.com/chains',
    description: 'Overview of all blockchain chains and their TVL',
    timestamp: Date.now() - 86400000 * 10,
    source: 'intuition_api' as const,
    totalMarketCap: '200000000000000000',
  },
]

// ============================================================
// PULSE ANALYSIS (PulseTab)
// ============================================================
export const MOCK_PULSE_MESSAGES = [
  {
    id: 1,
    messageId: 'pulse-1',
    type: 'pulse_analysis',
    timestamp: Date.now() - 3600000,
    content: {
      text: JSON.stringify({
        themes: [
          { name: 'Smart Contract Development', category: 'Web3', confidence: 0.92, predicate: 'researches', object: 'Smart Contract Security', keywords: ['solidity', 'audit', 'reentrancy'], urls: ['https://docs.soliditylang.org'] },
          { name: 'DeFi Analytics', category: 'Finance', confidence: 0.85, predicate: 'explores', object: 'DeFi Yield Strategies', keywords: ['uniswap', 'aave', 'curve'], urls: ['https://defillama.com'] },
          { name: 'Ethereum Protocol', category: 'Blockchain', confidence: 0.78, predicate: 'studies', object: 'Ethereum Roadmap', keywords: ['sharding', 'eip-4844', 'danksharding'], urls: ['https://ethereum.org/en/roadmap/'] },
        ],
      }),
    },
  },
  {
    id: 2,
    messageId: 'pulse-2',
    type: 'pulse_analysis',
    timestamp: Date.now() - 86400000,
    content: {
      text: JSON.stringify({
        themes: [
          { name: 'React Development', category: 'Frontend', confidence: 0.88, predicate: 'uses', object: 'React Hooks Patterns', keywords: ['react', 'hooks', 'wagmi'], urls: ['https://github.com/wagmi-dev/wagmi'] },
          { name: 'AI Research', category: 'ML', confidence: 0.72, predicate: 'reads', object: 'Transformer Architecture', keywords: ['attention', 'transformer', 'llm'], urls: ['https://arxiv.org/abs/2301.00001'] },
        ],
      }),
    },
  },
]

// ============================================================
// BOOKMARKS (BookmarkTab)
// ============================================================
export const MOCK_BOOKMARK_LISTS = [
  {
    id: 'list-1',
    walletAddress: MOCK_WALLET.walletAddress,
    name: 'Web3 Essentials',
    description: 'Must-read resources for Web3 development',
    createdAt: Date.now() - 86400000 * 14,
    updatedAt: Date.now() - 86400000,
    tripletIds: ['bm-1', 'bm-2', 'bm-3'],
  },
  {
    id: 'list-2',
    walletAddress: MOCK_WALLET.walletAddress,
    name: 'DeFi Research',
    description: 'DeFi protocols and analytics',
    createdAt: Date.now() - 86400000 * 7,
    updatedAt: Date.now() - 86400000 * 2,
    tripletIds: ['bm-4', 'bm-5'],
  },
]

export const MOCK_BOOKMARKED_TRIPLETS = [
  {
    id: 'bm-1',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'Ethereum Whitepaper' },
    sourceType: 'intuition' as const,
    sourceId: '0x0009',
    addedAt: Date.now() - 86400000 * 7,
    url: 'https://ethereum.org/en/whitepaper/',
    description: 'Original Ethereum whitepaper by Vitalik Buterin',
  },
  {
    id: 'bm-2',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'Solidity Documentation' },
    sourceType: 'intuition' as const,
    sourceId: '0x0001',
    addedAt: Date.now() - 86400000 * 5,
    url: 'https://docs.soliditylang.org/en/latest/',
    description: 'Official Solidity documentation',
  },
  {
    id: 'bm-3',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'OpenZeppelin Contracts' },
    sourceType: 'intuition' as const,
    sourceId: '0x0004',
    addedAt: Date.now() - 86400000 * 3,
    url: 'https://github.com/OpenZeppelin/openzeppelin-contracts',
    description: 'Battle-tested smart contract libraries',
  },
  {
    id: 'bm-4',
    triplet: { subject: 'I', predicate: 'visits for work', object: 'DefiLlama Dashboard' },
    sourceType: 'intuition' as const,
    sourceId: '0x0007',
    addedAt: Date.now() - 86400000 * 4,
    url: 'https://defillama.com/',
    description: 'DeFi TVL aggregator',
  },
  {
    id: 'bm-5',
    triplet: { subject: 'I', predicate: 'visits for learning', object: 'DeFi Explained Simply' },
    sourceType: 'intuition' as const,
    sourceId: '0x0006',
    addedAt: Date.now() - 86400000 * 2,
    url: 'https://youtube.com/watch?v=ghi789',
    description: 'Simple DeFi explainer',
  },
]

// ============================================================
// QUESTS (ProfilePage)
// ============================================================
export const MOCK_QUESTS = [
  { id: 'first-signal', title: 'First Signal', description: 'Create your first on-chain signal', current: 1, total: 1, status: 'completed' as const, xpReward: 100, type: 'signal' },
  { id: 'signal-5', title: 'Signal Creator', description: 'Create 5 signals', current: 5, total: 5, status: 'claimable_xp' as const, xpReward: 200, type: 'signal', milestone: 5 },
  { id: 'signal-25', title: 'Signal Master', description: 'Create 25 signals', current: 18, total: 25, status: 'active' as const, xpReward: 500, type: 'signal', milestone: 25 },
  { id: 'bookmark-1', title: 'Curator', description: 'Create a bookmark list', current: 1, total: 1, status: 'completed' as const, xpReward: 50, type: 'bookmark' },
  { id: 'follow-3', title: 'Social Butterfly', description: 'Follow 3 accounts', current: 2, total: 3, status: 'active' as const, xpReward: 150, type: 'follow' },
  { id: 'trust-1', title: 'Trust Builder', description: 'Trust your first account', current: 1, total: 1, status: 'completed' as const, xpReward: 75, type: 'trust' },
  { id: 'certify-10', title: 'Certifier', description: 'Certify 10 pages', current: 10, total: 10, status: 'claimable_xp' as const, xpReward: 300, type: 'certification', milestone: 10 },
  { id: 'pulse-5', title: 'Pulse Explorer', description: 'Launch 5 pulse analyses', current: 5, total: 5, status: 'completed' as const, xpReward: 150, type: 'pulse' },
  { id: 'streak-7', title: 'Streak Keeper', description: 'Maintain a 7-day streak', current: 3, total: 7, status: 'active' as const, xpReward: 250, type: 'streak' },
  { id: 'pioneer-1', title: 'Pioneer', description: 'Be the first to certify a page', current: 3, total: 1, status: 'completed' as const, xpReward: 200, type: 'discovery' },
  { id: 'oauth-connect', title: 'Connected', description: 'Connect a social account', current: 2, total: 1, status: 'completed' as const, xpReward: 100, type: 'oauth' },
]

export const MOCK_USER_PROGRESS = {
  signalsCreated: 18,
  bookmarkListsCreated: 2,
  bookmarkedSignals: 5,
  oauthConnections: 2,
  followedUsers: 4,
  trustedUsers: 2,
  currentStreak: 3,
  hasSignalToday: true,
  hasCertificationToday: false,
  pulseLaunches: 5,
  weeklyPulseUses: 2,
  discordConnected: true,
  youtubeConnected: false,
  spotifyConnected: true,
  twitchConnected: false,
  twitterConnected: true,
  pioneerCount: 3,
  explorerCount: 7,
  contributorCount: 12,
  totalDiscoveries: 22,
  uniqueIntentionTypes: 4,
  goldAccumulated: 150,
}

// ============================================================
// COMMUNITY (Following, Followers, Trust Circle)
// ============================================================
export const MOCK_FOLLOWING = [
  { id: 'follow-1', label: 'alice.eth', termId: '0x' + 'a1'.repeat(32), tripleId: '0x' + 'b1'.repeat(32), createdAt: Date.now() - 86400000 * 5, trustAmount: 0.5, signalsCount: 42, marketCapWei: '1000000000000000000', image: '', walletAddress: '0x1234567890123456789012345678901234567890' },
  { id: 'follow-2', label: 'bob.eth', termId: '0x' + 'a2'.repeat(32), tripleId: '0x' + 'b2'.repeat(32), createdAt: Date.now() - 86400000 * 3, trustAmount: 0.3, signalsCount: 28, marketCapWei: '500000000000000000', image: '', walletAddress: '0x2345678901234567890123456789012345678901' },
  { id: 'follow-3', label: 'charlie.eth', termId: '0x' + 'a3'.repeat(32), tripleId: '0x' + 'b3'.repeat(32), createdAt: Date.now() - 86400000 * 8, trustAmount: 0.7, signalsCount: 65, marketCapWei: '2000000000000000000', image: '', walletAddress: '0x3456789012345678901234567890123456789012' },
  { id: 'follow-4', label: 'defi_wizard.eth', termId: '0x' + 'a4'.repeat(32), tripleId: '0x' + 'b4'.repeat(32), createdAt: Date.now() - 86400000 * 12, trustAmount: 0.2, signalsCount: 15, marketCapWei: '300000000000000000', image: '', walletAddress: '0x4567890123456789012345678901234567890123' },
]

export const MOCK_FOLLOWERS = [
  { id: 'follower-1', label: 'diana.eth', termId: '0x' + 'c1'.repeat(32), tripleId: '0x' + 'd1'.repeat(32), createdAt: Date.now() - 86400000 * 2, trustAmount: 0.4, signalsCount: 33, marketCapWei: '750000000000000000', image: '', walletAddress: '0x5678901234567890123456789012345678901234' },
  { id: 'follower-2', label: 'eve.eth', termId: '0x' + 'c2'.repeat(32), tripleId: '0x' + 'd2'.repeat(32), createdAt: Date.now() - 86400000 * 6, trustAmount: 0.6, signalsCount: 51, marketCapWei: '1500000000000000000', image: '', walletAddress: '0x6789012345678901234567890123456789012345' },
  { id: 'follower-3', label: 'frank.eth', termId: '0x' + 'c3'.repeat(32), tripleId: '0x' + 'd3'.repeat(32), createdAt: Date.now() - 86400000 * 10, trustAmount: 0.8, signalsCount: 72, marketCapWei: '3000000000000000000', image: '', walletAddress: '0x7890123456789012345678901234567890123456' },
]

export const MOCK_TRUST_CIRCLE = [
  { id: 'trust-1', label: 'alice.eth', termId: '0x' + 'a1'.repeat(32), tripleId: '0x' + 'e1'.repeat(32), createdAt: Date.now() - 86400000 * 4, trustAmount: 1.0, signalsCount: 42, marketCapWei: '1000000000000000000', image: '', walletAddress: '0x1234567890123456789012345678901234567890' },
  { id: 'trust-2', label: 'charlie.eth', termId: '0x' + 'a3'.repeat(32), tripleId: '0x' + 'e2'.repeat(32), createdAt: Date.now() - 86400000 * 7, trustAmount: 1.5, signalsCount: 65, marketCapWei: '2000000000000000000', image: '', walletAddress: '0x3456789012345678901234567890123456789012' },
]

// ============================================================
// CIRCLE FEED (ResonancePage)
// ============================================================
export const MOCK_CIRCLE_FEED = [
  { id: 'feed-1', tripleTermId: '0xfeed01', intentionType: 'work', pageLabel: 'Solidity Security Best Practices', pageUrl: 'https://docs.soliditylang.org/en/latest/security-considerations.html', domain: 'docs.soliditylang.org', memberAddress: '0x1234567890123456789012345678901234567890', memberLabel: 'alice.eth', memberImage: '', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'feed-2', tripleTermId: '0xfeed02', intentionType: 'learning', pageLabel: 'Uniswap V4 Architecture', pageUrl: 'https://github.com/Uniswap/v4-core', domain: 'github.com', memberAddress: '0x3456789012345678901234567890123456789012', memberLabel: 'charlie.eth', memberImage: '', createdAt: new Date(Date.now() - 7200000).toISOString() },
  { id: 'feed-3', tripleTermId: '0xfeed03', intentionType: 'inspiration', pageLabel: 'The Merge - One Year Later', pageUrl: 'https://ethereum.org/en/roadmap/merge/', domain: 'ethereum.org', memberAddress: '0x1234567890123456789012345678901234567890', memberLabel: 'alice.eth', memberImage: '', createdAt: new Date(Date.now() - 14400000).toISOString() },
  { id: 'feed-4', tripleTermId: '0xfeed04', intentionType: 'work', pageLabel: 'EIP-4844 Proto-Danksharding', pageUrl: 'https://eips.ethereum.org/EIPS/eip-4844', domain: 'eips.ethereum.org', memberAddress: '0x2345678901234567890123456789012345678901', memberLabel: 'bob.eth', memberImage: '', createdAt: new Date(Date.now() - 21600000).toISOString() },
  { id: 'feed-5', tripleTermId: '0xfeed05', intentionType: 'learning', pageLabel: 'Zero Knowledge Proofs Explained', pageUrl: 'https://youtube.com/watch?v=zk001', domain: 'youtube.com', memberAddress: '0x3456789012345678901234567890123456789012', memberLabel: 'charlie.eth', memberImage: '', createdAt: new Date(Date.now() - 43200000).toISOString() },
  { id: 'feed-6', tripleTermId: '0xfeed06', intentionType: 'trusted', pageLabel: 'Chainlink Documentation', pageUrl: 'https://docs.chain.link/', domain: 'docs.chain.link', memberAddress: '0x1234567890123456789012345678901234567890', memberLabel: 'alice.eth', memberImage: '', createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: 'feed-7', tripleTermId: '0xfeed07', intentionType: 'work', pageLabel: 'Foundry Book', pageUrl: 'https://book.getfoundry.sh/', domain: 'book.getfoundry.sh', memberAddress: '0x2345678901234567890123456789012345678901', memberLabel: 'bob.eth', memberImage: '', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'feed-8', tripleTermId: '0xfeed08', intentionType: 'buying', pageLabel: 'Base Network', pageUrl: 'https://base.org/', domain: 'base.org', memberAddress: '0x3456789012345678901234567890123456789012', memberLabel: 'charlie.eth', memberImage: '', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
]

// ============================================================
// CHAT (ChatPage)
// ============================================================
export const MOCK_CHAT_RESPONSES: Record<string, string> = {
  default: "Based on your browsing patterns, I can see strong interests in Web3 development, particularly Solidity and DeFi. Your top domains are GitHub, Ethereum.org, and DefiLlama. Would you like me to analyze a specific area?",
  hello: "Hello! I'm Sofia, your AI browsing companion. I've been analyzing your browsing patterns and I can see you're deeply into Web3 development. How can I help you today?",
  interests: "Your main interests based on browsing patterns:\n\n1. **Smart Contract Development** (92% confidence) - Solidity, OpenZeppelin, Foundry\n2. **DeFi Analytics** (85% confidence) - DefiLlama, yield strategies\n3. **Ethereum Protocol** (78% confidence) - roadmap, EIPs, sharding\n4. **AI/ML Research** (72% confidence) - transformer architectures\n\nWant me to dive deeper into any of these?",
  recommend: "Based on your profile, I recommend:\n\n- **Paradigm Research** - paradigm.xyz (DeFi research papers)\n- **Ethereum Magicians** - ethereum-magicians.org (EIP discussions)\n- **Secureum** - secureum.xyz (smart contract security)\n- **Flashbots** - docs.flashbots.net (MEV protection)\n\nShall I add any of these to your bookmarks?",
}

// ============================================================
// DISCOVERY STATS
// ============================================================
export const MOCK_DISCOVERY_STATS = {
  pioneerCount: 3,
  explorerCount: 7,
  contributorCount: 12,
  totalCertifications: 35,
  intentionBreakdown: { for_work: 15, for_learning: 12, for_fun: 0, for_inspiration: 4, for_buying: 0 } as Record<string, number>,
  trustBreakdown: { trusted: 3, distrusted: 1 },
  discoveryGold: {
    fromPioneer: 60,
    fromExplorer: 56,
    fromContributor: 48,
    total: 164,
  },
}

// ============================================================
// INTEREST CATEGORIES
// ============================================================
export const MOCK_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Web3 Development',
    description: 'Smart contracts, dApps, and blockchain development',
    urlCount: 12,
    certificationCount: 8,
    dominantIntention: 'work',
    urls: [
      { url: 'https://docs.soliditylang.org/en/latest/', title: 'Solidity Documentation', intention: 'work' },
      { url: 'https://github.com/OpenZeppelin/openzeppelin-contracts', title: 'OpenZeppelin Contracts', intention: 'work' },
      { url: 'https://github.com/foundry-rs/foundry', title: 'Foundry Toolkit', intention: 'work' },
    ],
  },
  {
    id: 'cat-2',
    name: 'DeFi & Finance',
    description: 'Decentralized finance protocols and analytics',
    urlCount: 6,
    certificationCount: 4,
    dominantIntention: 'work',
    urls: [
      { url: 'https://defillama.com/', title: 'DefiLlama', intention: 'work' },
      { url: 'https://defillama.com/chains', title: 'Chains Overview', intention: 'learning' },
    ],
  },
  {
    id: 'cat-3',
    name: 'Ethereum Ecosystem',
    description: 'Core Ethereum protocol and community',
    urlCount: 8,
    certificationCount: 6,
    dominantIntention: 'learning',
    urls: [
      { url: 'https://ethereum.org/en/developers/', title: 'Ethereum Developers', intention: 'learning' },
      { url: 'https://ethereum.org/en/whitepaper/', title: 'Ethereum Whitepaper', intention: 'learning' },
      { url: 'https://ethereum.org/en/roadmap/', title: 'Ethereum Roadmap', intention: 'inspiration' },
    ],
  },
  {
    id: 'cat-4',
    name: 'AI & Machine Learning',
    description: 'Research papers and ML resources',
    urlCount: 2,
    certificationCount: 1,
    dominantIntention: 'learning',
    urls: [
      { url: 'https://arxiv.org/abs/2301.00001', title: 'Attention Is All You Need', intention: 'learning' },
    ],
  },
]
