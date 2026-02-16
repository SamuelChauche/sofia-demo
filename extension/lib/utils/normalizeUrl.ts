// Inlined from background/constants
const TRACKING_URL_PARAMS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'fbclid', 'gclid', 'gclsrc', 'dclid', 'msclkid',
  'mc_cid', 'mc_eid', 'ref', 'referrer', 'source',
  '_ga', '_gid', '_gl', 'hsa_cam', 'hsa_grp', 'hsa_mt', 'hsa_src', 'hsa_ad', 'hsa_acc', 'hsa_net', 'hsa_ver', 'hsa_la', 'hsa_ol', 'hsa_kw',
  'si', 'igshid', 'share_id', 'feature', 'app',
  'twclid', 'li_fat_id', 'ttclid', 'ScCid', 'cid'
])

/**
 * Normalize a URL for cache keying and matching.
 * - Lowercase, remove www., remove trailing slash, remove protocol
 * - KEEP content query params (v=abc on YouTube)
 * - STRIP tracking query params (utm_*, fbclid, etc.)
 */
export function normalizeUrl(url: string): { label: string; isRootDomain: boolean } {
  const urlObj = new URL(url)
  let hostname = urlObj.hostname.toLowerCase()
  const pathname = urlObj.pathname

  if (hostname.startsWith('www.')) hostname = hostname.slice(4)

  // Strip tracking params, keep content params
  const cleanParams = new URLSearchParams()
  urlObj.searchParams.forEach((value, key) => {
    if (!TRACKING_URL_PARAMS.has(key.toLowerCase())) {
      cleanParams.set(key, value)
    }
  })
  const search = cleanParams.toString() ? `?${cleanParams.toString()}` : ''

  // Include hash fragment for SPA routing (e.g., #/markets/0x...)
  const hash = urlObj.hash || ''

  const fullPath = pathname + search + hash
  const hasPath = fullPath && fullPath !== '/'
  const label = hasPath
    ? `${hostname}${fullPath.replace(/\/$/, '')}`.toLowerCase()
    : hostname

  return { label, isRootDomain: !hasPath }
}
