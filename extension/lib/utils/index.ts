/**
 * Utils barrel file
 * Re-exports all utility functions
 */

// Logging
export { logger, blockchainLogger, apiLogger, storageLogger, createHookLogger, createServiceLogger } from './logger'

// URL & Content
export { normalizeUrl } from './normalizeUrl'
export { cleanTitle, getDisplayTitle } from './cleanTitle'
export { isRestrictedUrl } from './pageRestriction'
export type { RestrictionInfo } from './pageRestriction'
export { parseSofiaMessage } from './parseSofiaMessage'

// Web3 & Identity
export { getEnsAvatar, batchGetEnsAvatars, clearEnsAvatarCache } from './ensUtils'
export { isValidImageUrl, isEthereumAddress, shouldShowDiceBearAvatar, generateDiceBearAvatar, escapeSvgForCss, convertIpfsToHttp, normalizeAvatarUrl, getInitials } from './avatar'

// IPFS
export { batchFetchIPFS, fetchIPFSMetadata, clearIPFSCache, getIPFSCacheSize } from './ipfsCache'

// Quest & Storage Helpers
export { calculateLevelFromXP, calculateXPForNextLevel, getClaimId, computeQuestStatuses } from './questStatusHelpers'
export { getWalletKey } from './storageKeyUtils'

// Cache & Async
export { refetchWithBackoff, debounce } from './refetchUtils'

// Circle & Interest (inlined stubs — real impl removed for demo)
export function loadMemberActivityCache(_w: string) { return null }
export function saveMemberActivityCache(_w: string, _d: any) {}
export function loadCircleRecsCache(_w: string) { return null }
export function saveCircleRecsCache(_w: string, _d: any) {}
export function clearCircleRecsCache(_w: string) {}
export function clearAllMemberActivityCaches(_ws: string[]) {}
export function areInterestNamesSimilar(a: string, b: string) { return a === b }
export async function fetchMemberDomainActivity(_w: string) { return [] }
export function aggregateActivities(_a: any[][]) { return [] }
export function buildMemberDomainMap(_a: any[]) { return new Map() }
export function findRecommendations(_u: any[], _c: any[], _m: Map<string, any>) { return { recommendations: [], matchedCategories: [] } }
