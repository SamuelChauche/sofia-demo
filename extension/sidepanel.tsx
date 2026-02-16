import "./components/styles/Global.css"

import RouterProvider, { useRouter } from "./components/layout/RouterProvider"
import AppLayout from "./components/layout/AppLayout"
import BottomNavigation from "./components/layout/BottomNavigation"

// Pages
import HomePage from "./components/pages/HomePage"
import HomeConnectedPage from "./components/pages/HomeConnectedPage"
import SettingsPage from "./components/pages/SettingsPage"
import ProfilePage from "./components/pages/ProfilePage"
import CorePage from "./components/pages/CorePage"
import ResonancePage from "./components/pages/ResonancePage"
import ChatPage from "./components/pages/ChatPage"
import UserProfilePage from "./components/pages/UserProfilePage"
import OnboardingImportPage from "./components/pages/OnboardingImportPage"
import OnboardingTutorialPage from "./components/pages/OnboardingTutorialPage"
import OnboardingBookmarkSelectPage from "./components/pages/OnboardingBookmarkSelectPage"

const SidePanelContent = () => {
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

function SidePanel() {
  return (
    <RouterProvider initialPage="home-connected">
      <SidePanelContent />
    </RouterProvider>
  )
}

export default SidePanel
