import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { SiteShell } from './components/layout/site-shell'
import { LoadingState } from './components/shared/loading-state'
import { useBootstrapData } from './hooks/use-bootstrap-data'
import { useLiveStatus } from './hooks/use-live-status'

const HomePage = lazy(() =>
  import('./pages/home-page').then((module) => ({
    default: module.HomePage,
  })),
)
const BrowsePage = lazy(() =>
  import('./pages/browse-page').then((module) => ({
    default: module.BrowsePage,
  })),
)
const ListingDetailPage = lazy(() =>
  import('./pages/listing-detail-page').then((module) => ({
    default: module.ListingDetailPage,
  })),
)
const AuthPage = lazy(() =>
  import('./pages/auth-page').then((module) => ({
    default: module.AuthPage,
  })),
)
const LenderDashboardPage = lazy(() =>
  import('./pages/lender-dashboard-page').then((module) => ({
    default: module.LenderDashboardPage,
  })),
)
const BorrowerDashboardPage = lazy(() =>
  import('./pages/borrower-dashboard-page').then((module) => ({
    default: module.BorrowerDashboardPage,
  })),
)
const ProfilePage = lazy(() =>
  import('./pages/profile-page').then((module) => ({
    default: module.ProfilePage,
  })),
)
const NotFoundPage = lazy(() =>
  import('./pages/not-found-page').then((module) => ({
    default: module.NotFoundPage,
  })),
)

function App() {
  const { status, error, retry } = useBootstrapData()

  useLiveStatus()

  if (status !== 'ready') {
    return <LoadingState error={error} onRetry={retry} />
  }

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LoadingState error={null} onRetry={() => {}} />}>
          <Routes>
            <Route element={<SiteShell />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route
                path="/listing/:listingId"
                element={<ListingDetailPage />}
              />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/dashboard/lender"
                element={<LenderDashboardPage />}
              />
              <Route
                path="/dashboard/borrower"
                element={<BorrowerDashboardPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3200,
          style: {
            borderRadius: '16px',
            background: '#082f2a',
            color: '#f3fffc',
            border: '1px solid rgba(255,255,255,0.12)',
          },
        }}
      />
    </>
  )
}

export default App
