/**
 * ENS utilities — Demo stub (no viem dependency)
 */

const ensAvatarCache = new Map<string, string | null>()

export async function getEnsAvatar(
  ensName: string,
  intuitionImage?: string | null
): Promise<string | null> {
  if (intuitionImage) return intuitionImage
  if (!ensName || ensName.startsWith('0x')) return null
  if (ensAvatarCache.has(ensName)) return ensAvatarCache.get(ensName)!
  // Demo: no real ENS lookup
  ensAvatarCache.set(ensName, null)
  return null
}

export async function batchGetEnsAvatars(
  accounts: Array<{ label: string; image?: string | null }>
): Promise<Map<string, string>> {
  const avatarMap = new Map<string, string>()
  for (const acc of accounts) {
    if (acc.image) avatarMap.set(acc.label, acc.image)
  }
  return avatarMap
}

export function clearEnsAvatarCache(): void {
  ensAvatarCache.clear()
}
