import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RecordsProvider } from './context/RecordsContext'
import { ToastProvider } from './context/ToastContext'
import { LocalFilesProvider } from './context/LocalFilesContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { DashboardLayout } from './components/DashboardLayout'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardHome } from './pages/DashboardHome'
import { RepositoryPage } from './pages/RepositoryPage'
import { RecordDetailsPage } from './pages/RecordDetailsPage'
import { AddRecordPage } from './pages/AddRecordPage'

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout basePath="/admin" pageTitle="Admin Dashboard" />}>
        <Route index element={<DashboardHome basePath="/admin" variant="admin" />} />
        <Route path="repository" element={<RepositoryPage basePath="/admin" />} />
        <Route path="records/:id" element={<RecordDetailsPage basePath="/admin" />} />
      </Route>
    </Routes>
  )
}

function GloRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout basePath="/glo" pageTitle="GLO Officer Dashboard" />}>
        <Route index element={<DashboardHome basePath="/glo" variant="glo" />} />
        <Route path="repository" element={<RepositoryPage basePath="/glo" />} />
        <Route path="records/:id" element={<RecordDetailsPage basePath="/glo" />} />
      </Route>
    </Routes>
  )
}

function PmRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout basePath="/pm" pageTitle="Project Manager Dashboard" />}>
        <Route index element={<DashboardHome basePath="/pm" variant="pm" />} />
        <Route path="repository" element={<RepositoryPage basePath="/pm" showDocumentAction={false} />} />
        <Route path="add-record" element={<AddRecordPage basePath="/pm" />} />
        <Route path="records/:id" element={<RecordDetailsPage basePath="/pm" />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RecordsProvider>
          <LocalFilesProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/glo/*"
                element={
                  <ProtectedRoute allowedRoles={['glo']}>
                    <GloRoutes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pm/*"
                element={
                  <ProtectedRoute allowedRoles={['pm']}>
                    <PmRoutes />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
          </LocalFilesProvider>
        </RecordsProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
