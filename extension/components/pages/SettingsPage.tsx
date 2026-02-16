import { useState } from 'react'
import { useRouter } from '../layout/RouterProvider'
import { useTracking } from '../../hooks'
import { useWalletFromStorage, disconnectWallet } from '../../hooks'
import SwitchButton from '../ui/SwitchButton'
import WalletConnectionButton from '../ui/THP_WalletConnectionButton'
import '../styles/Global.css'
import '../styles/SettingsPage.css'
import '../styles/Modal.css'

const SettingsPage = () => {
  const { navigateTo } = useRouter()
  const { isTrackingEnabled, toggleTracking } = useTracking()
  const { walletAddress: account } = useWalletFromStorage()

  const [isClearing, setIsClearing] = useState(false)

  const handleClearStorage = async () => {
    if (!confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) return
    setIsClearing(true)
    setTimeout(() => {
      alert('Demo: All data cleared!')
      setIsClearing(false)
    }, 500)
  }

  return (
    <div className="page settings-page">

      <h2 className="section-title">Settings</h2>

      {/* Settings Section */}
      <div className="settings-section">

        {/* Connected Wallet */}
        {account && (
          <div className="settings-item">
            <span>Connected Wallet</span>
            <div className="wallet-address-display">
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>
        )}

        {/* Data Tracking */}
        <div className="settings-item">
          <div className="settings-item-content">
            <span>Data Tracking</span>
            <span className="settings-item-description">Enable or disable Sofia's data tracking</span>
          </div>
          <SwitchButton isEnabled={isTrackingEnabled} onToggle={toggleTracking} />
        </div>

        {/* Status */}
        <div className="settings-item">
          <span>Status</span>
          <a
            href="https://stats.intuition.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="available-for-btn"
          >
            <div className="circle">
              <div className="dot"></div>
              <div className="outline"></div>
            </div>
            View Mainnet Status
          </a>
        </div>

        {/* Wallet Connection */}
        <div className="settings-item">
          <span>Wallet Connection</span>
          <WalletConnectionButton />
        </div>

        {/* Replay Tutorial */}
        <div className="settings-item">
          <span>Tutorial</span>
          <button
            onClick={() => navigateTo('onboarding-tutorial')}
            className="delete-button-3d noselect"
          >
            Tutorial
          </button>
        </div>

        {/* Clear All Data */}
        <div className="settings-item">
          <span>Clear All Data</span>
          <button
            onClick={handleClearStorage}
            disabled={isClearing}
            className="delete-button-3d noselect"
          >
            {isClearing ? 'Clearing...' : 'Delete'}
          </button>
        </div>

      </div>

      <p className="description-paragraph terms-text" style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', opacity: 0.6 }}>
        <a href="https://sofia.intuition.box/privacy" target="_blank" rel="noopener noreferrer"><strong>Privacy Policy</strong></a> · <a href="https://sofia.intuition.box/terms" target="_blank" rel="noopener noreferrer"><strong>Terms & Conditions</strong></a>
      </p>
    </div>
  )
}

export default SettingsPage
