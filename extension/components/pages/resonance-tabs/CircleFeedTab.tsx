import { useState, useEffect, useMemo } from 'react'
import { useRouter } from '../../layout/RouterProvider'
import { useWalletFromStorage, useIntentionCategories, useVoteOnTriple, useTripleVotes } from '../../../hooks'
import type { IntentionType } from '../../../types/intentionCategories'
import { INTENTION_CONFIG } from '../../../types/intentionCategories'
import CategoryCard from '../../ui/CategoryCard'
import CategoryDetailView from '../../ui/CategoryDetailView'
import Avatar from '../../ui/Avatar'
import '../../styles/CircleFeedTab.css'
import '../../styles/CategoryStyles.css'

// Get favicon URL from domain (high-res for large display)
const getFaviconUrl = (domain: string): string => {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

// Format relative time
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

interface CircleFeedItem {
  id: string
  tripleTermId: string
  intentionType: IntentionType
  pageLabel: string
  pageUrl: string
  domain: string
  memberAddress: string
  memberLabel: string
  memberImage: string
  createdAt: string
}

const MOCK_CIRCLE_ITEMS: CircleFeedItem[] = [
  {
    id: 'cf-1', tripleTermId: 'triple-1', intentionType: 'work' as IntentionType,
    pageLabel: 'GitHub - React Repository', pageUrl: 'https://github.com/facebook/react',
    domain: 'github.com', memberAddress: '0x1234', memberLabel: 'vitalik.eth',
    memberImage: '', createdAt: new Date(Date.now() - 1800000).toISOString()
  },
  {
    id: 'cf-2', tripleTermId: 'triple-2', intentionType: 'learning' as IntentionType,
    pageLabel: 'Introduction to Zero Knowledge Proofs', pageUrl: 'https://ethereum.org/en/zero-knowledge-proofs/',
    domain: 'ethereum.org', memberAddress: '0x5678', memberLabel: 'sofia.eth',
    memberImage: '', createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'cf-3', tripleTermId: 'triple-3', intentionType: 'fun' as IntentionType,
    pageLabel: 'Amazing Web3 Game', pageUrl: 'https://axieinfinity.com',
    domain: 'axieinfinity.com', memberAddress: '0x1234', memberLabel: 'vitalik.eth',
    memberImage: '', createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'cf-4', tripleTermId: 'triple-4', intentionType: 'inspiration' as IntentionType,
    pageLabel: 'The Future of Decentralized Identity', pageUrl: 'https://medium.com/decentralized-identity',
    domain: 'medium.com', memberAddress: '0xabcd', memberLabel: 'builder.eth',
    memberImage: '', createdAt: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: 'cf-5', tripleTermId: 'triple-5', intentionType: 'buying' as IntentionType,
    pageLabel: 'New NFT Marketplace Launch', pageUrl: 'https://opensea.io',
    domain: 'opensea.io', memberAddress: '0x5678', memberLabel: 'sofia.eth',
    memberImage: '', createdAt: new Date(Date.now() - 28800000).toISOString()
  },
  {
    id: 'cf-6', tripleTermId: 'triple-6', intentionType: 'work' as IntentionType,
    pageLabel: 'TypeScript Handbook', pageUrl: 'https://www.typescriptlang.org/docs/handbook/',
    domain: 'typescriptlang.org', memberAddress: '0xabcd', memberLabel: 'builder.eth',
    memberImage: '', createdAt: new Date(Date.now() - 43200000).toISOString()
  }
]

type ViewState =
  | { type: 'feed' }
  | { type: 'member-profile'; address: string; label: string; image?: string }
  | { type: 'member-category'; address: string; label: string; image?: string }

const CircleFeedTab = () => {
  const { navigateTo, setActiveProfileTab } = useRouter()
  const { walletAddress: address } = useWalletFromStorage()
  const [activeFilter, setActiveFilter] = useState<'all' | IntentionType>('all')
  const [viewState, setViewState] = useState<ViewState>({ type: 'feed' })
  const [feedItems, setFeedItems] = useState<CircleFeedItem[]>([])

  // Load mock data on mount
  useEffect(() => {
    setFeedItems(MOCK_CIRCLE_ITEMS)
  }, [])

  // Filter items by active category
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return feedItems
    return feedItems.filter(item => item.intentionType === activeFilter)
  }, [feedItems, activeFilter])

  // Member profile: use useIntentionCategories with member's wallet
  const memberWallet = viewState.type === 'member-profile' || viewState.type === 'member-category'
    ? viewState.address
    : undefined
  const {
    categories: memberCategories,
    selectedCategory: memberSelectedCategory,
    loading: memberCategoriesLoading,
    selectCategory: memberSelectCategory
  } = useIntentionCategories(memberWallet)

  // Vote system
  const tripleTermIds = useMemo(
    () => feedItems.map(item => item.tripleTermId).filter(Boolean),
    [feedItems]
  )
  const { votesMap, refetch: refetchVotes } = useTripleVotes(tripleTermIds, address || null)
  const { vote, loading: voteLoading, votingTripleId } = useVoteOnTriple()

  const handleVote = async (e: React.MouseEvent, tripleTermId: string, voteType: 'like' | 'dislike') => {
    e.stopPropagation()
    if (!address || !tripleTermId) return
    await vote(tripleTermId, voteType)
    refetchVotes()
  }

  const loading = false

  // Refresh feed data (no-op with mock data)
  const handleRefresh = () => {
    console.log('Refresh requested (using mock data)')
    refetchVotes()
  }

  // Handle member click
  const handleMemberClick = (memberAddress: string, memberLabel: string, memberImage?: string) => {
    setViewState({ type: 'member-profile', address: memberAddress, label: memberLabel, image: memberImage })
    memberSelectCategory(null)
  }

  // Handle category click in member profile
  const handleMemberCategoryClick = (categoryId: IntentionType) => {
    if (viewState.type === 'member-profile') {
      memberSelectCategory(categoryId)
      setViewState({ ...viewState, type: 'member-category' })
    }
  }

  // Handle back
  const handleBack = () => {
    if (viewState.type === 'member-category') {
      memberSelectCategory(null)
      setViewState({
        type: 'member-profile',
        address: viewState.address,
        label: viewState.label,
        image: viewState.image
      })
    } else {
      setViewState({ type: 'feed' })
    }
  }

  // No wallet
  if (!address) {
    return (
      <div className="circle-feed-tab">
        <div className="circle-empty">
          <h3>Connect Your Wallet</h3>
          <p>Connect your wallet to see your Trust Circle's activity.</p>
        </div>
      </div>
    )
  }

  // Member category detail view
  if (viewState.type === 'member-category' && memberSelectedCategory) {
    return (
      <div className="circle-feed-tab">
        <CategoryDetailView
          category={memberSelectedCategory}
          onBack={handleBack}
        />
      </div>
    )
  }

  // Member profile view
  if (viewState.type === 'member-profile') {
    return (
      <div className="circle-feed-tab">
        <div className="circle-member-header">
          <button className="circle-back-btn" onClick={handleBack}>Back</button>
          <Avatar
            imgSrc={viewState.image}
            name={viewState.address}
            avatarClassName="circle-member-avatar"
            size="medium"
          />
          <h3 className="circle-member-name">{viewState.label}</h3>
        </div>

        {memberCategoriesLoading ? (
          <div className="circle-loading">Loading certifications...</div>
        ) : (
          <div className="circle-categories-grid">
            {memberCategories.map(category => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => handleMemberCategoryClick(category.id)}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Main feed view
  return (
    <div className="circle-feed-tab">
      {/* Category filter chips + Go to Circle link */}
      <div className="circle-top-bar">
        <div className="circle-category-chips">
          <button
            className={`circle-chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          {(Object.entries(INTENTION_CONFIG) as [IntentionType, { label: string; color: string }][]).map(
            ([type, config]) => (
              <button
                key={type}
                className={`circle-chip ${activeFilter === type ? 'active' : ''}`}
                style={{
                  '--chip-color': config.color
                } as React.CSSProperties}
                onClick={() => setActiveFilter(type)}
              >
                {config.label}
              </button>
            )
          )}
        </div>
        <button
          className="circle-go-btn"
          onClick={handleRefresh}
        >
          ↻
        </button>
        <button
          className="circle-go-btn"
          onClick={() => {
            setActiveProfileTab('community')
            navigateTo('profile')
          }}
        >
          My Circle
        </button>
      </div>

      {/* Loading */}
      {loading && feedItems.length === 0 && (
        <div className="circle-loading">Loading Trust Circle activity...</div>
      )}

      {/* Empty: no results for filter */}
      {!loading && feedItems.length > 0 && filteredItems.length === 0 && (
        <div className="circle-empty">
          <p>No {INTENTION_CONFIG[activeFilter as IntentionType]?.label || ''} certifications from your circle.</p>
        </div>
      )}

      {/* Feed grid */}
      {filteredItems.length > 0 && (
        <div className="circle-grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="circle-card"
              onClick={() => window.open(item.pageUrl, '_blank', 'noopener,noreferrer')}
            >
              {/* Header: favicon + badge */}
              <div className="circle-card-header">
                <img
                  src={getFaviconUrl(item.domain)}
                  alt=""
                  className="circle-card-favicon"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <span
                  className="circle-intention-badge"
                  style={{
                    backgroundColor: `${INTENTION_CONFIG[item.intentionType].color}20`,
                    color: INTENTION_CONFIG[item.intentionType].color
                  }}
                >
                  {INTENTION_CONFIG[item.intentionType].label}
                </span>
              </div>

              {/* Page title */}
              <div className="circle-card-title">{item.pageLabel}</div>

              {/* Footer: member + votes + time */}
              <div className="circle-card-footer">
                <span
                  className="circle-card-member-name"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMemberClick(item.memberAddress, item.memberLabel, item.memberImage)
                  }}
                >
                  {item.memberLabel}
                </span>
                {item.tripleTermId && (
                  <div className="circle-card-votes">
                    <button
                      className={`circle-vote-btn circle-vote-up ${votesMap.get(item.tripleTermId)?.userVote === 'like' ? 'active' : ''}`}
                      onClick={(e) => handleVote(e, item.tripleTermId, 'like')}
                      disabled={voteLoading && votingTripleId === item.tripleTermId}
                      title="Like this certification"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4l-8 8h5v8h6v-8h5z" />
                      </svg>
                    </button>
                    <span className="circle-vote-count">
                      {(votesMap.get(item.tripleTermId)?.likeCount || 0) - (votesMap.get(item.tripleTermId)?.dislikeCount || 0)}
                    </span>
                    <button
                      className={`circle-vote-btn circle-vote-down ${votesMap.get(item.tripleTermId)?.userVote === 'dislike' ? 'active' : ''}`}
                      onClick={(e) => handleVote(e, item.tripleTermId, 'dislike')}
                      disabled={voteLoading && votingTripleId === item.tripleTermId}
                      title="Dislike this certification"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 20l8-8h-5V4H9v8H4z" />
                      </svg>
                    </button>
                  </div>
                )}
                <span className="circle-card-time">{formatTimestamp(item.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CircleFeedTab
