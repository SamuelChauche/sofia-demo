import { useState, useEffect } from 'react'
import { useWalletFromStorage, useEchoPublishing } from '../../../hooks'
import { MOCK_PULSE_MESSAGES } from '../../../mock/mock-data'
import WeightModal from '../../modals/WeightModal'
import SofiaLoader from '../../ui/SofiaLoader'
import type { EchoTriplet } from '../../../types/blockchain'
import '../../styles/CoreComponents.css'
import '../../styles/CorePage.css'
import '../../styles/PulsePage.css'


interface PulseTheme {
  name: string
  category: string
  confidence: number
  predicate: string
  object: string
  keywords: string[]
  urls: string[]
}

interface PulseAnalysis {
  msgIndex: number
  messageId: number
  timestamp: number
  themes: PulseTheme[]
}

const getHostname = (url: string): string => {
  try { return new URL(url).hostname } catch { return url }
}

const PulseTab = () => {
  const { walletAddress: address } = useWalletFromStorage()
  const [pulseAnalyses, setPulseAnalyses] = useState<PulseAnalysis[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedSessions, setExpandedSessions] = useState<Set<number>>(new Set())
  const [expandedTriplets, setExpandedTriplets] = useState<Set<string>>(new Set())
  const [selectedSessions, setSelectedSessions] = useState<Set<number>>(new Set())
  const [selectedTriplets, setSelectedTriplets] = useState<Set<string>>(new Set())
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Modal state
  const [showWeightModal, setShowWeightModal] = useState(false)
  const [selectedTripletsForWeighting, setSelectedTripletsForWeighting] = useState<EchoTriplet[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const [transactionError, setTransactionError] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined)
  const [createdCount, setCreatedCount] = useState(0)
  const [depositCount, setDepositCount] = useState(0)

  const createEchoTripletsFromSelection = (): EchoTriplet[] => {
    if (selectedTriplets.size === 0 || pulseAnalyses.length === 0) return []
    const echoTriplets: EchoTriplet[] = []
    selectedTriplets.forEach(tripletId => {
      const [sessionIndexStr, tripletIndexStr] = tripletId.split('-')
      const sessionIndex = parseInt(sessionIndexStr)
      const tripletIndex = parseInt(tripletIndexStr)
      const analysis = pulseAnalyses[sessionIndex]
      if (!analysis || !analysis.themes) return
      const theme = analysis.themes[tripletIndex]
      if (!theme) return
      echoTriplets.push({
        id: `pulse_${tripletId}`,
        triplet: { subject: 'I', predicate: theme.predicate, object: theme.object },
        url: theme.urls?.[0] || '',
        description: theme.name,
        timestamp: analysis.timestamp,
        sourceMessageId: analysis.messageId.toString(),
        status: 'available'
      })
    })
    return echoTriplets
  }

  const pulseEchoTriplets = createEchoTripletsFromSelection()
  const pulseSelectedEchoes = new Set(pulseEchoTriplets.map(t => t.id))

  const { publishSelected } = useEchoPublishing()

  // Parse mock pulse data
  const fetchPulseAnalyses = async () => {
    try {
      const analysisGroups: PulseAnalysis[] = MOCK_PULSE_MESSAGES.map((msg, msgIndex) => {
        const parsed = JSON.parse(msg.content.text)
        return {
          msgIndex,
          messageId: msg.id,
          timestamp: msg.timestamp,
          themes: parsed.themes || []
        }
      }).filter(a => a.themes.length > 0)

      analysisGroups.sort((a, b) => b.timestamp - a.timestamp)
      setPulseAnalyses(analysisGroups)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPulseAnalyses() }, [])

  const startPulseAnalysis = () => {
    setIsAnalyzing(true)
    // Demo: simulate analysis
    setTimeout(() => {
      fetchPulseAnalyses().finally(() => setIsAnalyzing(false))
    }, 2000)
  }

  const formatTimestamp = (timestamp: number) => new Date(timestamp).toLocaleString()

  const handleAmplifyClick = () => {
    if (selectedTriplets.size > 0) {
      setSelectedTripletsForWeighting(pulseEchoTriplets)
      setShowWeightModal(true)
    }
  }

  const handleWeightSubmit = async (customWeights?: (bigint | null)[]) => {
    if (selectedTripletsForWeighting.length === 0) return
    try {
      setIsCreating(true)
      setTransactionError(null)
      setTransactionSuccess(false)
      const result = await publishSelected(customWeights)
      setCreatedCount(result.createdCount || 0)
      setDepositCount(result.depositCount || 0)
      setTransactionHash(result.txHash)
      setTransactionSuccess(true)
    } catch (error) {
      setTransactionError(error instanceof Error ? error.message : 'Failed to publish')
    } finally {
      setIsCreating(false)
    }
  }

  const handleWeightModalClose = () => {
    setShowWeightModal(false)
    setSelectedTripletsForWeighting([])
    setTransactionError(null)
    setTransactionSuccess(false)
    setTransactionHash(undefined)
    setCreatedCount(0)
    setDepositCount(0)
    setSelectedTriplets(new Set())
  }

  const toggleSessionExpansion = (sessionIndex: number) => {
    setExpandedSessions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sessionIndex)) {
        newSet.delete(sessionIndex)
        setExpandedTriplets(expandedTripletsSet => {
          const newTripletSet = new Set(expandedTripletsSet)
          for (const tripletId of newTripletSet) {
            if (tripletId.startsWith(`${sessionIndex}-`)) newTripletSet.delete(tripletId)
          }
          return newTripletSet
        })
      } else {
        newSet.add(sessionIndex)
      }
      return newSet
    })
  }

  const toggleTripletExpansion = (sessionIndex: number, tripletIndex: number) => {
    const tripletId = `${sessionIndex}-${tripletIndex}`
    setExpandedTriplets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tripletId)) newSet.delete(tripletId)
      else newSet.add(tripletId)
      return newSet
    })
  }

  const toggleSessionSelection = (sessionIndex: number) => {
    setSelectedSessions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sessionIndex)) newSet.delete(sessionIndex)
      else newSet.add(sessionIndex)
      return newSet
    })
  }

  const toggleTripletSelection = (sessionIndex: number, tripletIndex: number) => {
    const tripletId = `${sessionIndex}-${tripletIndex}`
    setSelectedTriplets(prev => {
      const newSet = new Set(prev)
      if (newSet.has(tripletId)) newSet.delete(tripletId)
      else newSet.add(tripletId)
      return newSet
    })
  }

  const toggleSelectAllTriplets = () => {
    if (selectedTriplets.size > 0) {
      setSelectedTriplets(new Set())
    } else {
      const allTripletIds: string[] = []
      pulseAnalyses.forEach((analysis, sessionIndex) => {
        analysis.themes.forEach((_, tripletIndex) => {
          allTripletIds.push(`${sessionIndex}-${tripletIndex}`)
        })
      })
      setSelectedTriplets(new Set(allTripletIds))
    }
  }

  const toggleSelectAllSessions = () => {
    if (selectedSessions.size > 0) setSelectedSessions(new Set())
    else setSelectedSessions(new Set(pulseAnalyses.map((_, index) => index)))
  }

  const deleteSelectedSessions = async () => {
    if (selectedSessions.size === 0) return
    if (!confirm(`Delete ${selectedSessions.size} session(s)?`)) return
    setPulseAnalyses(prev => prev.filter((_, index) => !selectedSessions.has(index)))
    setSelectedSessions(new Set())
    setSelectedTriplets(new Set())
    setExpandedSessions(new Set())
    setExpandedTriplets(new Set())
  }

  const deleteSelectedTriplets = async () => {
    if (selectedTriplets.size === 0) return
    const sessionUpdates = new Map<number, Set<number>>()
    selectedTriplets.forEach(tripletId => {
      const [sessionIndex, themeIndex] = tripletId.split('-').map(Number)
      if (!sessionUpdates.has(sessionIndex)) sessionUpdates.set(sessionIndex, new Set())
      sessionUpdates.get(sessionIndex)!.add(themeIndex)
    })
    setPulseAnalyses(prev => {
      return prev.map((analysis, index) => {
        if (sessionUpdates.has(index)) {
          const toRemove = sessionUpdates.get(index)!
          const filtered = analysis.themes.filter((_, i) => !toRemove.has(i))
          return filtered.length > 0 ? { ...analysis, themes: filtered } : null
        }
        return analysis
      }).filter(Boolean) as PulseAnalysis[]
    })
    setSelectedTriplets(new Set())
  }

  useEffect(() => {
    if (pulseAnalyses.length > 0 && expandedSessions.size === 0) {
      setExpandedSessions(new Set(pulseAnalyses.map((_, index) => index)))
    }
  }, [pulseAnalyses])

  if (loading || isAnalyzing) {
    return (
      <div className="pulse-container">
        <div className="pulse-loading-indicator">
          <SofiaLoader size={150} />
        </div>
      </div>
    )
  }

  if (pulseAnalyses.length === 0) {
    return (
      <div className="pulse-container">
        <div className="reveal-interest-cta" style={{ flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 20px' }}>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', textAlign: 'center', maxWidth: '280px', lineHeight: '1.5' }}>
            Analyze your open tabs to discover browsing patterns and extract semantic signals from your current session.
          </p>
          <button className="btn iridescence-btn" onClick={startPulseAnalysis}>
            Pulse Analysis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pulse-container">
      <div className="reveal-interest-cta">
        <button className="btn iridescence-btn" onClick={startPulseAnalysis}>
          Pulse Analysis
        </button>
      </div>

      {selectedTriplets.size === 0 && pulseAnalyses.length > 0 && (
        <div className="pulse-selection-panel">
          <div className="pulse-selection-info">
            <label className="pulse-select-all-label">
              <span onClick={toggleSelectAllTriplets} className="pulse-cursor-pointer">
                Select All Signals for Publishing
              </span>
            </label>
          </div>
        </div>
      )}

      {selectedTriplets.size > 0 && (
        <div className="pulse-selection-panel">
          <div className="pulse-selection-info">
            <label className="pulse-select-all-label">
              <span className="pulse-cursor-default">
                {selectedTriplets.size} Signals selected for publishing
              </span>
            </label>
          </div>
          <div className="pulse-batch-actions">
            <button className="pulse-batch-btn pulse-add-to-signals" onClick={handleAmplifyClick} disabled={isCreating}>
              Amplify ({selectedTriplets.size})
            </button>
            <button className="pulse-batch-btn pulse-delete-selected" onClick={deleteSelectedTriplets}>
              Remove ({selectedTriplets.size})
            </button>
          </div>
        </div>
      )}

      {selectedSessions.size === 0 && pulseAnalyses.length > 0 && (
        <div className={`pulse-selection-panel ${selectedTriplets.size > 0 ? 'pulse-margin-top-conditional' : 'pulse-margin-top-none'}`}>
          <div className="pulse-selection-info">
            <label className="pulse-select-all-label">
              <span onClick={toggleSelectAllSessions} className="pulse-cursor-pointer">
                Delete All
              </span>
            </label>
          </div>
        </div>
      )}

      {selectedSessions.size > 0 && (
        <div className={`pulse-selection-panel ${selectedTriplets.size > 0 ? 'pulse-margin-top-conditional' : 'pulse-margin-top-none'}`}>
          <div className="pulse-selection-info">
            <label className="pulse-select-all-label">
              <span className="pulse-cursor-default">
                {selectedSessions.size} sessions selected for deletion
              </span>
            </label>
          </div>
          <div className="pulse-batch-actions">
            <button className="pulse-batch-btn pulse-delete-selected" onClick={deleteSelectedSessions}>
              Remove Sessions ({selectedSessions.size})
            </button>
          </div>
        </div>
      )}

      <div className="pulse-list">
        {pulseAnalyses.map((analysis, analysisIndex) => {
          const isSessionExpanded = expandedSessions.has(analysisIndex)
          const isSelected = selectedSessions.has(analysisIndex)

          return (
            <div key={analysis.msgIndex} className={`session-card ${isSelected ? 'session-selected' : ''}`}>
              <div className={`pulse-triplet-item ${isSessionExpanded ? 'pulse-expanded' : ''}`}>
                <div className="pulse-analysis-header pulse-flex-space-between">
                  <div className="pulse-analysis-session-content">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSessionSelection(analysisIndex)}
                      className="pulse-session-checkbox"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="pulse-clickable pulse-session-expand-content" onClick={() => toggleSessionExpansion(analysisIndex)}>
                      <h4>
                        <span className="pulse-session-arrow">{isSessionExpanded ? '▼' : '▶'}</span>
                        Session #{analysisIndex + 1}
                      </h4>
                      <div className="pulse-analysis-meta">
                        <span className="pulse-analysis-time">{formatTimestamp(analysis.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {isSessionExpanded && (
                  <div className="pulse-analysis-themes">
                    {analysis.themes.map((theme, themeIndex) => {
                      const tripletId = `${analysisIndex}-${themeIndex}`
                      const isExpanded = expandedTriplets.has(tripletId)
                      const isSelected = selectedTriplets.has(tripletId)

                      return (
                        <div
                          key={`${analysis.msgIndex}-${themeIndex}`}
                          className={`pulse-card pulse-card-pointer ${isSelected ? 'pulse-selected' : ''}`}
                          onClick={() => toggleTripletSelection(analysisIndex, themeIndex)}
                        >
                          <div className={`pulse-triplet-item ${isExpanded ? 'pulse-expanded' : ''}`}>
                            <div className="pulse-header">
                              <p
                                className="pulse-text pulse-clickable"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleTripletExpansion(analysisIndex, themeIndex)
                                }}
                              >
                                <span className="pulse-subject">I</span>{' '}
                                <span className="pulse-action">{theme.predicate}</span>{' '}
                                <span className="pulse-object">{theme.object}</span>
                              </p>
                            </div>

                            {isExpanded && (
                              <div className="pulse-details">
                                <div className="pulse-detail-section">
                                  <h4 className="pulse-detail-title">Pattern Name</h4>
                                  <p className="pulse-detail-name">{theme.name}</p>
                                </div>
                                <div className="pulse-detail-section">
                                  <h4 className="pulse-detail-title">Keywords</h4>
                                  <div className="pulse-detail-description">
                                    {theme.keywords?.join(', ') || 'No keywords'}
                                  </div>
                                </div>
                                {theme.urls && theme.urls.length > 0 && (
                                  <div className="pulse-detail-section">
                                    <h4 className="pulse-detail-title">Link</h4>
                                    {theme.urls.map((url: string, i: number) => (
                                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="pulse-detail-url">
                                        {getHostname(url)}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <WeightModal
        isOpen={showWeightModal}
        triplets={selectedTripletsForWeighting}
        isProcessing={isCreating}
        transactionSuccess={transactionSuccess}
        transactionError={transactionError}
        transactionHash={transactionHash}
        createdCount={createdCount}
        depositCount={depositCount}
        onClose={handleWeightModalClose}
        onSubmit={handleWeightSubmit}
      />
    </div>
  )
}

export default PulseTab
