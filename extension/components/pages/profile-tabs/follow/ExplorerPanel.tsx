/**
 * ExplorerPanel - Global account search and discovery
 * Shows top most active Sofia accounts + search
 */

import { useRouter } from '../../../layout/RouterProvider'
import type { AccountAtom } from '../../../../hooks'
import { FollowSearchBox } from './FollowSearchBox'
import Avatar from '../../../ui/Avatar'
import { createHookLogger } from '../../../../lib/utils/logger'
import '../../../styles/CoreComponents.css'
import '../../../styles/FollowTab.css'

const logger = createHookLogger('ExplorerPanel')

interface ExplorerPanelProps {
  walletAddress: string | undefined
}

interface TopAccount {
  walletAddress: string
  label: string
  image?: string | null
  termId?: string
  txCount: number
}

const MOCK_TOP_ACCOUNTS: TopAccount[] = [
  { walletAddress: '0x1234567890abcdef1234567890abcdef12345678', label: 'vitalik.eth', image: null, termId: 'term-1', txCount: 142 },
  { walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12', label: 'sofia.eth', image: null, termId: 'term-2', txCount: 98 },
  { walletAddress: '0x9876543210fedcba9876543210fedcba98765432', label: 'builder.eth', image: null, termId: 'term-3', txCount: 76 },
  { walletAddress: '0xfedcba9876543210fedcba9876543210fedcba98', label: 'researcher.eth', image: null, termId: 'term-4', txCount: 54 },
  { walletAddress: '0x1111222233334444555566667777888899990000', label: 'creator.eth', image: null, termId: 'term-5', txCount: 41 },
]

export function ExplorerPanel({ walletAddress }: ExplorerPanelProps) {
  const { navigateTo } = useRouter()

  const topAccounts = MOCK_TOP_ACCOUNTS

  const handleSearchResultClick = (account: AccountAtom) => {
    navigateTo('user-profile', {
      termId: account.id,
      label: account.label,
      image: account.image,
      walletAddress: account.data,
      url: undefined,
      description: undefined
    })
  }

  const handleTopAccountClick = (account: TopAccount) => {
    navigateTo('user-profile', {
      termId: account.termId ?? '',
      label: account.label,
      image: account.image ?? undefined,
      walletAddress: account.walletAddress,
      url: undefined,
      description: undefined
    })
  }

  if (!walletAddress) {
    return (
      <div className="follow-panel">
        <div className="empty-state">
          <p>Connect wallet to explore accounts</p>
        </div>
      </div>
    )
  }

  return (
    <div className="follow-panel">
      <FollowSearchBox
        onSelectAccount={handleSearchResultClick}
        onFollowSuccess={() => {
          logger.debug('Follow successful from explorer')
        }}
        placeholder="Search all accounts on Intuition..."
      />

      <div className="explorer-top-accounts">
        <h3 className="explorer-section-title">Most Active on Sofia (7 days)</h3>

        {topAccounts.length === 0 && (
          <div className="empty-state">
            <p>No accounts found</p>
          </div>
        )}

        {topAccounts.length > 0 && (
          <div className="followed-accounts">
            {topAccounts.map((account, index) => (
              <div
                key={account.walletAddress}
                className="followed-account-card"
                onClick={() => handleTopAccountClick(account)}
                style={{ cursor: 'pointer' }}
              >
                <div className="account-left">
                  <span className="account-number">{index + 1}</span>
                  <Avatar
                    imgSrc={account.image}
                    name={account.label}
                    avatarClassName="account-avatar"
                    size="medium"
                  />
                  <div className="account-info">
                    <span className="account-label">{account.label}</span>
                    <span className="trust-amount">
                      {account.txCount} signals
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
