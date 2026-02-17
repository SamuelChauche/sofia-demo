// Chrome API shim — must run before any component import
if (typeof window !== 'undefined' && !window.chrome) {
  const storage: Record<string, any> = {}
  const listeners: Array<(message: any, sender: any, sendResponse: any) => void> = []

  ;(window as any).chrome = {
    storage: {
      local: {
        get: (_keys: any, cb?: any) => cb?.({}),
        set: (_data: any, cb?: any) => cb?.(),
        remove: (_keys: any, cb?: any) => cb?.(),
        onChanged: { addListener: () => {}, removeListener: () => {} },
      },
      session: {
        get: (_keys: any, cb?: any) => cb?.({}),
        set: (_data: any, cb?: any) => cb?.(),
        remove: (_keys: any, cb?: any) => cb?.(),
        onChanged: { addListener: () => {}, removeListener: () => {} },
      },
      sync: {
        get: (_keys: any, cb?: any) => cb?.({}),
        set: (_data: any, cb?: any) => cb?.(),
        remove: (_keys: any, cb?: any) => cb?.(),
        onChanged: { addListener: () => {}, removeListener: () => {} },
      },
      onChanged: { addListener: () => {}, removeListener: () => {} },
    },
    runtime: {
      sendMessage: (_msg: any, cb?: any) => cb?.({}),
      onMessage: {
        addListener: (fn: any) => listeners.push(fn),
        removeListener: (fn: any) => {
          const idx = listeners.indexOf(fn)
          if (idx >= 0) listeners.splice(idx, 1)
        },
      },
      getURL: (path: string) => path,
      id: 'demo-extension-id',
    },
    tabs: {
      query: (_opts: any, cb?: any) => cb?.([{ id: 1, url: 'https://sofia.intuition.box/' }]),
      sendMessage: (_tabId: any, _msg: any, cb?: any) => cb?.({}),
      onUpdated: { addListener: () => {}, removeListener: () => {} },
      onActivated: { addListener: () => {}, removeListener: () => {} },
    },
    action: {
      onClicked: { addListener: () => {} },
    },
    sidePanel: {
      open: async () => {},
    },
    bookmarks: {
      getTree: (cb?: any) => cb?.([]),
    },
    identity: {
      getAuthToken: (_opts: any, cb?: any) => cb?.('mock-token'),
      launchWebAuthFlow: (_opts: any, cb?: any) => cb?.('https://localhost/callback#token=mock'),
    },
  }
}

import React from 'react'
import ReactDOM from 'react-dom/client'

// Import global CSS
import '~/components/styles/Global.css'

// Import the app structure from the extension
import RouterProvider, { useRouter } from '~/components/layout/RouterProvider'
import AppLayout from '~/components/layout/AppLayout'
import BottomNavigation from '~/components/layout/BottomNavigation'

// Pages
import HomeConnectedPage from '~/components/pages/HomeConnectedPage'
import SettingsPage from '~/components/pages/SettingsPage'
import ProfilePage from '~/components/pages/ProfilePage'
import CorePage from '~/components/pages/CorePage'
import ResonancePage from '~/components/pages/ResonancePage'
import ChatPage from '~/components/pages/ChatPage'
import UserProfilePage from '~/components/pages/UserProfilePage'
import OnboardingImportPage from '~/components/pages/OnboardingImportPage'
import OnboardingTutorialPage from '~/components/pages/OnboardingTutorialPage'
import OnboardingBookmarkSelectPage from '~/components/pages/OnboardingBookmarkSelectPage'

const AppContent = () => {
  const { currentPage } = useRouter()

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
      case 'home-connected':
        return <HomeConnectedPage />
      case 'settings':
        return <SettingsPage />
      case 'profile':
        return <ProfilePage />
      case 'Sofia':
        return <CorePage />
      case 'resonance':
        return <ResonancePage />
      case 'chat':
        return <ChatPage />
      case 'user-profile':
        return <UserProfilePage />
      case 'onboarding-import':
        return <OnboardingImportPage />
      case 'onboarding-select':
        return <OnboardingBookmarkSelectPage />
      case 'onboarding-tutorial':
        return <OnboardingTutorialPage />
      default:
        return <HomeConnectedPage />
    }
  }

  return (
    <AppLayout>
      {renderCurrentPage()}
      <BottomNavigation />
    </AppLayout>
  )
}

function App() {
  return (
    <RouterProvider initialPage="home-connected">
      <AppContent />
    </RouterProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
