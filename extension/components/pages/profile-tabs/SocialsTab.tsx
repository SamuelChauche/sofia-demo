import { useState, useCallback } from 'react'
import youtubeIcon from '../../ui/social/youtube.svg'
import spotifyIcon from '../../ui/social/spotify.svg'
import twitchIcon from '../../ui/social/twitch.svg'
import discordIcon from '../../ui/social/discord.svg'
import xIcon from '../../ui/social/x.svg'
import { useWalletFromStorage } from '../../../hooks'
import { useSocialVerifier } from '../../../hooks'
import { createHookLogger } from '../../../lib/utils/logger'
import '../../styles/AccountTab.css'
import '../../styles/InterestTab.css'

const logger = createHookLogger('SocialsTab')

type Platform = 'youtube' | 'spotify' | 'twitch' | 'discord' | 'twitter'

const PLATFORMS: { key: Platform; label: string; icon: string; iconClass: string }[] = [
  { key: 'twitter', label: 'X', icon: xIcon, iconClass: 'twitter-icon' },
  { key: 'discord', label: 'Discord', icon: discordIcon, iconClass: 'discord-icon' },
  { key: 'youtube', label: 'YouTube', icon: youtubeIcon, iconClass: 'youtube-icon' },
  { key: 'twitch', label: 'Twitch', icon: twitchIcon, iconClass: 'twitch-icon' },
  { key: 'spotify', label: 'Spotify', icon: spotifyIcon, iconClass: 'spotify-icon' },
]

const SocialsTab = () => {
  const { walletAddress } = useWalletFromStorage()
  const { isSocialVerified, canVerify, isVerifying, verifySocials } = useSocialVerifier()

  // Demo: twitter and discord are "connected"
  const [oauthTokens, setOauthTokens] = useState<Record<Platform, boolean>>({
    youtube: false,
    spotify: false,
    twitch: false,
    discord: true,
    twitter: true,
  })

  const connectOAuth = (platform: Platform) => {
    // Demo: simulate OAuth connection
    logger.debug(`Demo: connecting ${platform}`)
    setOauthTokens(prev => ({ ...prev, [platform]: true }))
  }

  const disconnectOAuth = useCallback(async (platform: Platform) => {
    if (!walletAddress) return
    // Demo: simulate OAuth disconnection
    logger.debug(`Demo: disconnecting ${platform}`)
    setOauthTokens(prev => ({ ...prev, [platform]: false }))
  }, [walletAddress])

  return (
    <div className="socials-tab">
      {/* Social Verification */}
      {canVerify && !isSocialVerified && (
        <div className="social-verify-section">
          <button
            className="interest-analyze-btn"
            onClick={verifySocials}
            disabled={isVerifying}
          >
            {isVerifying ? 'Verifying...' : 'Verify Socials'}
          </button>
        </div>
      )}

      {/* Platform Icons */}
      <div className="platform-icons-container">
        {PLATFORMS.map(({ key, icon, label, iconClass }) => {
          const connected = oauthTokens[key]

          return (
            <button
              key={key}
              className={`connect-button ${key} ${connected ? 'connected' : ''}`}
              onClick={() => connected ? disconnectOAuth(key) : connectOAuth(key)}
            >
              <div className={`platform-icon ${iconClass}`}>
                <img src={icon} alt={label} />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SocialsTab
