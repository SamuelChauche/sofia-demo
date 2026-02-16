import { useState, useEffect } from 'react'
import { createHookLogger } from '../../../lib/utils/logger'
import { useWalletFromStorage } from '../../../hooks'
import { useWeightOnChain } from '../../../hooks'
import StakeModal from '../../modals/StakeModal'
import Avatar from '../../ui/Avatar'
import '../../styles/CoreComponents.css'
import '../../styles/PageBlockchainCard.css'
import '../../styles/FeedTab.css'

interface FeedEvent {
  id: string
  type: string
  created_at: string
  accountLabel: string
  accountWallet: string
  accountImage?: string
  description: string
  details: string
  portalLink?: string
  objectUrl?: string
  amount?: string
  amountLabel?: string
}

const logger = createHookLogger('FeedTab')

const MOCK_FEED_ITEMS: FeedEvent[] = [
  {
    id: 'feed-1',
    type: 'Deposited',
    created_at: new Date(Date.now() - 3600000).toISOString(),
    accountLabel: 'vitalik.eth',
    accountWallet: '0x1234567890abcdef1234567890abcdef12345678',
    accountImage: '',
    description: 'deposited into',
    details: 'Ethereum \u2022 is important for \u2022 DeFi',
    portalLink: 'https://portal.intuition.systems/explore/triple/123',
    objectUrl: 'https://ethereum.org',
    amount: '0.5000',
    amountLabel: 'TRUST'
  },
  {
    id: 'feed-2',
    type: 'Deposited',
    created_at: new Date(Date.now() - 7200000).toISOString(),
    accountLabel: 'sofia.eth',
    accountWallet: '0xabcdef1234567890abcdef1234567890abcdef12',
    accountImage: '',
    description: 'deposited into',
    details: 'AI Research \u2022 advances \u2022 Knowledge Systems',
    portalLink: 'https://portal.intuition.systems/explore/triple/456',
    objectUrl: 'https://arxiv.org',
    amount: '1.0000',
    amountLabel: 'TRUST'
  },
  {
    id: 'feed-3',
    type: 'Deposited',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    accountLabel: 'builder.eth',
    accountWallet: '0x9876543210fedcba9876543210fedcba98765432',
    accountImage: '',
    description: 'deposited into',
    details: 'TypeScript \u2022 is better than \u2022 JavaScript',
    portalLink: 'https://portal.intuition.systems/explore/triple/789',
    objectUrl: 'https://typescriptlang.org',
    amount: '0.2500',
    amountLabel: 'TRUST'
  }
]

const FeedTab = () => {
  const { walletAddress: address } = useWalletFromStorage()
  const [feedItems, setFeedItems] = useState<FeedEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<FeedEvent | null>(null)
  const [selectedVaultId, setSelectedVaultId] = useState<string>('')
  const [isUpvoteModalOpen, setIsUpvoteModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [shouldRefreshOnClose, setShouldRefreshOnClose] = useState(false)
  const [declinedEvents, setDeclinedEvents] = useState<string[]>([])
  const { addWeight } = useWeightOnChain()

  // Load mock feed items on mount
  useEffect(() => {
    logger.debug('Loading mock feed items', { count: MOCK_FEED_ITEMS.length })
    setFeedItems(MOCK_FEED_ITEMS)
  }, [])

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const handleJoinClick = (item: FeedEvent, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Extract vaultId from portalLink
    let vaultId = ''
    if (item.type === 'AtomCreated' || item.portalLink?.includes('/atom/')) {
      const match = item.portalLink?.match(/\/atom\/(.+)$/)
      vaultId = match ? match[1] : ''
    } else if (item.type === 'TripleCreated' || item.portalLink?.includes('/triple/')) {
      const match = item.portalLink?.match(/\/triple\/(.+)$/)
      vaultId = match ? match[1] : ''
    }

    setSelectedEvent(item)
    setSelectedVaultId(vaultId)
    setIsUpvoteModalOpen(true)
  }

  const handleDeclineClick = (itemId: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setDeclinedEvents((prev) => [...(prev || []), itemId])
  }

  const handleCloseModal = () => {
    setIsUpvoteModalOpen(false)
    setSelectedEvent(null)
    setSelectedVaultId('')
    setIsProcessing(false)
    setShouldRefreshOnClose(false)
  }

  if (!address) {
    return (
      <div className="feed-tab">
        <div className="empty-state">
          <h3>Connect Your Wallet</h3>
          <p>Please connect your wallet to view your Trust Circle feed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="feed-tab">
      <div className="feed-header">
        <p className="feed-subtitle">
        </p>
      </div>

      {feedItems.length > 0 ? (
        <div className="feed-items">
          {feedItems
            .filter((item) => !declinedEvents?.includes(item.id))
            .map((item) => {
              // Can only join on deposits/redemptions (vault already exists with liquidity)
              // Cannot join on newly created atoms/triples (no initial deposit yet)
              const canJoin = item.portalLink && (item.type === 'Deposited' || item.type === 'Redeemed')

              // Determine category based on type
              let category = 'Activity'
              if (item.type === 'AtomCreated') category = 'Identity'
              else if (item.type === 'TripleCreated') category = 'Claim'
              else if (item.type === 'Deposited') category = 'Deposit'
              else if (item.type === 'Redeemed') category = 'Redemption'

              return (
                <div key={item.id} className="feed-item-wrapper">
                  <div className="feed-item-header">
                    <Avatar
                      imgSrc={item.accountImage}
                      name={item.accountWallet}
                      avatarClassName="feed-avatar"
                      size="medium"
                    />
                    <div className="feed-header-text">
                      <span className="feed-account-name">{item.accountLabel}</span>
                      {' '}
                      <span className="feed-action">{item.description} :</span>
                    </div>
                  </div>
                  <div className="feed-item-container">
                  <div className="feed-content">
                    <div className="feed-text">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ flex: 1 }}>
                          {item.portalLink ? (
                            <a
                              href={item.portalLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="feed-details-link"
                            >
                              {item.details}
                            </a>
                          ) : (
                            <span className="feed-details-text">{item.details}</span>
                          )}
                          {item.amount && item.amountLabel && (
                            <>
                              {' '}
                              <span className="feed-amount">
                                ({item.amount} {item.amountLabel})
                              </span>
                            </>
                          )}
                        </div>
                        {item.objectUrl && (
                          <a
                            href={item.objectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="feed-link-button"
                          >
                            🔗
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="feed-meta">
                      <span className="feed-timestamp">{formatTimestamp(item.created_at)}</span>
                      <span className="feed-separator">·</span>
                      <span className="feed-category">{category}</span>
                    </div>
                    {canJoin && (
                      <div className="feed-actions">
                        <button
                          className="trust-page-button join-button-css"
                          onClick={(e) => handleJoinClick(item, e)}
                        >
                          <span className="trust-button-content">Join</span>
                        </button>
                        <button
                          className="feed-decline-button"
                          onClick={(e) => handleDeclineClick(item.id, e)}
                        >
                          Decline
                        </button>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              )
            })}
            <br />
        </div>
      ) : (
        <div className="empty-state">
          <p>No activity yet</p>
          <p className="empty-subtext">
            Accounts in your Trust Circle haven't had any activity yet.
          </p>
        </div>
      )}

      <StakeModal
        isOpen={isUpvoteModalOpen}
        onClose={handleCloseModal}
        onSubmit={async (amount: bigint, curveId: 1 | 2) => {
          if (!selectedEvent) {
            return { success: false, error: 'No event selected' }
          }

          if (!selectedVaultId) {
            return { success: false, error: 'No vault ID found for this event' }
          }

          try {
            setIsProcessing(true)

            logger.info('Deposit calculation', {
              amount: amount.toString(),
              depositInTRUST: (Number(amount) / 1e18).toFixed(4),
              curveId
            })

            const result = await addWeight(selectedVaultId, amount, BigInt(curveId))
            logger.debug('addWeight result', result)

            if (result.success) {
              logger.info('Transaction successful', { txHash: result.txHash })
              setShouldRefreshOnClose(true)

              setIsProcessing(false)
              return { success: true, txHash: result.txHash }
            } else {
              setIsProcessing(false)
              return { success: false, error: result.error || 'Transaction failed' }
            }
          } catch (error) {
            logger.error('Transaction error', error)
            setIsProcessing(false)
            return {
              success: false,
              error: error instanceof Error ? error.message : 'Transaction failed'
            }
          }
        }}
        subjectName="Feed"
        predicateName={selectedEvent?.type === 'AtomCreated' ? 'created' : 'supports'}
        objectName={selectedEvent ? selectedEvent.details : ''}
        tripleId={selectedVaultId}
        defaultCurve={1}
        isProcessing={isProcessing}
      />
    </div>
  )
}

export default FeedTab
