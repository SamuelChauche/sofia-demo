import { useState, useEffect, useCallback, useRef } from 'react'
import { type Interest } from '../../../types/interests'
import InterestCard from '../../ui/InterestCard'
import SofiaLoader from '../../ui/SofiaLoader'
import '../../styles/InterestTab.css'

interface UserInterestTabProps {
  walletAddress: string
}

type Phase = 'idle' | 'fetching' | 'classifying' | 'ready' | 'error'

const CACHE_KEY_PREFIX = 'sofia_interest_'

interface CachedInterestData {
  interests: Interest[]
  summary: string
  totalPositions: number
  analyzedAt: string
}

function loadCache(wallet: string): CachedInterestData | null {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${wallet.toLowerCase()}`)
    if (!raw) return null
    const data: CachedInterestData = JSON.parse(raw)
    if (!data.interests || data.interests.length === 0) return null
    return data
  } catch {
    return null
  }
}

function saveCache(wallet: string, data: CachedInterestData): void {
  try {
    localStorage.setItem(`${CACHE_KEY_PREFIX}${wallet.toLowerCase()}`, JSON.stringify(data))
  } catch { /* localStorage full */ }
}

const UserInterestTab = ({ walletAddress }: UserInterestTabProps) => {
  const [phase, setPhase] = useState<Phase>('idle')
  const [interests, setInterests] = useState<Interest[]>([])
  const [summary, setSummary] = useState('')
  const [totalPositions, setTotalPositions] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const isRunningRef = useRef(false)

  // Load from cache on mount, or auto-analyze
  useEffect(() => {
    if (!walletAddress) return
    const cached = loadCache(walletAddress)
    if (cached) {
      setInterests(cached.interests)
      setSummary(cached.summary)
      setTotalPositions(cached.totalPositions)
      setPhase('ready')
    } else if (phase === 'idle') {
      analyze()
    }
  }, [walletAddress])

  const analyze = useCallback(async () => {
    if (!walletAddress || isRunningRef.current) return
    isRunningRef.current = true
    setError(null)

    try {
      setPhase('fetching')
      // Demo: simulate analysis with mock data
      await new Promise(resolve => setTimeout(resolve, 1500))
      setPhase('classifying')
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockInterests: Interest[] = [
        { id: 'int-1', name: 'Web Development', domains: ['github.com', 'stackoverflow.com'], level: 4, xp: 850, xpToNextLevel: 150, totalCertifications: 42, certifications: { work: 30, learning: 8, fun: 2, inspiration: 2, buying: 0 }, confidence: 0.95, reasoning: 'Building web applications and tools' },
        { id: 'int-2', name: 'Blockchain Research', domains: ['ethereum.org', 'arxiv.org'], level: 3, xp: 620, xpToNextLevel: 180, totalCertifications: 28, certifications: { work: 5, learning: 18, fun: 0, inspiration: 5, buying: 0 }, confidence: 0.88, reasoning: 'Exploring decentralized systems' },
        { id: 'int-3', name: 'AI & Machine Learning', domains: ['arxiv.org', 'huggingface.co'], level: 2, xp: 480, xpToNextLevel: 320, totalCertifications: 15, certifications: { work: 3, learning: 10, fun: 0, inspiration: 2, buying: 0 }, confidence: 0.82, reasoning: 'Understanding AI models and applications' },
        { id: 'int-4', name: 'Design Inspiration', domains: ['dribbble.com', 'behance.net'], level: 2, xp: 320, xpToNextLevel: 480, totalCertifications: 10, certifications: { work: 1, learning: 2, fun: 3, inspiration: 4, buying: 0 }, confidence: 0.75, reasoning: 'Collecting design ideas and patterns' },
      ]

      saveCache(walletAddress, {
        interests: mockInterests,
        summary: 'Active developer with strong focus on web3 and AI technologies.',
        totalPositions: 47,
        analyzedAt: new Date().toISOString()
      })

      setInterests(mockInterests)
      setSummary('Active developer with strong focus on web3 and AI technologies.')
      setTotalPositions(47)
      setPhase('ready')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze interests')
      setPhase('error')
    } finally {
      isRunningRef.current = false
    }
  }, [walletAddress])

  // Loading states
  if (phase === 'idle' || phase === 'fetching') {
    return (
      <div className="interest-tab">
        <div className="interest-loading">
          <SofiaLoader size={100} />
          <p className="interest-loading-text">Fetching on-chain activity...</p>
        </div>
      </div>
    )
  }

  if (phase === 'classifying') {
    return (
      <div className="interest-tab">
        <div className="interest-loading">
          <SofiaLoader size={100} />
          <p className="interest-loading-text">Classifying interests...</p>
        </div>
      </div>
    )
  }

  if (phase === 'error') {
    return (
      <div className="interest-tab">
        <div className="interest-error">
          <span className="interest-error-icon">!</span>
          <p className="interest-error-text">{error}</p>
          <button className="interest-error-retry" onClick={analyze}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Ready — no interests found
  if (interests.length === 0) {
    return (
      <div className="interest-tab">
        <div className="interest-empty">
          <span className="interest-empty-icon">-</span>
          <h3 className="interest-empty-title">No Interests Found</h3>
          <p className="interest-empty-text">
            This user hasn't certified enough web activity to identify interests yet.
          </p>
        </div>
      </div>
    )
  }

  // Ready — show interests
  return (
    <div className="interest-tab">
      <div className="interest-header">
        <button className="interest-analyze-btn" onClick={analyze}>
          Refresh
        </button>
      </div>

      {summary && (
        <div className="interest-summary">
          <p className="interest-summary-text">{summary}</p>
          <div className="interest-summary-meta">
            <span>{totalPositions} certifications analyzed</span>
            <span>{interests.length} interests identified</span>
          </div>
        </div>
      )}

      <div className="interest-grid">
        {interests.map((interest) => (
          <InterestCard key={interest.id} interest={interest} />
        ))}
      </div>
    </div>
  )
}

export default UserInterestTab
