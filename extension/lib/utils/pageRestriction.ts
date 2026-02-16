/**
 * Page restriction utilities
 * Detects pages where content scripts and wallet operations cannot run
 */

// Inlined constants (originally from background/constants)
const RESTRICTED_PROTOCOLS = ['chrome:', 'chrome-extension:', 'about:', 'devtools:', 'edge:', 'brave:']
const RESTRICTED_DOMAINS = ['chrome.google.com', 'addons.mozilla.org', 'microsoftedge.microsoft.com']
const RESTRICTION_MESSAGES: Record<string, string> = {
  'chrome:': 'Chrome internal pages are not supported',
  'chrome-extension:': 'Extension pages are not supported',
  'about:': 'Browser internal pages are not supported',
  default: 'This page is restricted',
  ad: 'Ad frames are not supported'
}

export interface RestrictionInfo {
  restricted: boolean
  message?: string
}

/**
 * Check if a URL is restricted (wallet bridge won't work, content scripts can't run)
 */
export function isRestrictedUrl(url: string | null): RestrictionInfo {
  if (!url) {
    return { restricted: true, message: 'No page loaded' }
  }

  try {
    const urlObj = new URL(url)

    // Check restricted protocols
    for (const protocol of RESTRICTED_PROTOCOLS) {
      if (urlObj.protocol === protocol) {
        return {
          restricted: true,
          message: RESTRICTION_MESSAGES[protocol] || RESTRICTION_MESSAGES.default
        }
      }
    }

    // Check restricted domains
    for (const domain of RESTRICTED_DOMAINS) {
      if (urlObj.hostname.includes(domain)) {
        const isAdDomain = ['2mdn', 'doubleclick', 'googlesyndication', 'googleadservices',
          'adsrvr', 'adnxs', 'criteo', 'taboola', 'outbrain', 'pubmatic', 'rubicon',
          'disqus', 'ad-srv', 'servenobid'].some(ad => domain.includes(ad))
        const message = isAdDomain ? RESTRICTION_MESSAGES.ad : 'Extension store'
        return { restricted: true, message }
      }
    }

    return { restricted: false }
  } catch {
    return { restricted: true, message: 'Invalid URL' }
  }
}
