import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import './App.css'
import { ProtectedAdmin } from './Protected.jsx';
import { DarkModeProvider } from "../contexts/DarkModeContext";

// Lazy load ALL components
const HomePage = lazy(() => import("./pages/User/Home/HomePage"));
const About = lazy(() => import("./pages/User/About/About"));
const ViewDetails = lazy(() => import("./pages/User/Details/ViewDetails"));
const ContactUs = lazy(() => import("./pages/User/Contact/ContactUs"));
const Apply = lazy(() => import("./pages/User/Apply/Apply"));
const AdminApplication = lazy(() => import("./pages/Admin/Applicants/Applicants"));
const InternshipListings = lazy(() => import("./pages/User/InternListing/InternListing"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard/Dashboard"));
const Interview = lazy(() => import("./pages/Admin/Interviews/Interview"));
const Settings = lazy(() => import("./pages/Admin/Settings/Settings"));
const Position = lazy(() => import("./pages/Admin/Position/Position"));
const Login = lazy(() => import("./pages/Login/Login"));
const ForgotPassword = lazy(() => import("./pages/Login/ForgotPassword.jsx"));
const Reset = lazy(() => import("./pages/Login/Reset.jsx"));
const NotificationsPageContent = lazy(() => import("./pages/Admin/Notification/Notification.jsx"));
const Messages = lazy(() => import("./pages/Admin/Messages/Messages.jsx"));
const LogoutPage = lazy(() => import("./pages/logout.jsx"));

// Enhanced Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="text-center space-y-4 p-6">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
      <p className="text-muted-foreground max-w-md">
        {error?.message || "An unexpected error occurred while loading the page."}
      </p>
      <div className="space-x-4">
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  </div>
);

// Route wrapper with Suspense and Error Boundary
const RouteWrapper = ({ children }) => (
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error, errorInfo) => {
      console.error('Route Error:', error, errorInfo);
    }}
    onReset={() => window.location.reload()}
  >
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('App Error:', error, errorInfo);
      }}
    >
      <DarkModeProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <RouteWrapper>
                  <HomePage />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/about" 
              element={
                <RouteWrapper>
                  <About />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/Details/:id" 
              element={
                <RouteWrapper>
                  <ViewDetails />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/contact" 
              element={
                <RouteWrapper>
                  <ContactUs />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/Apply" 
              element={
                <RouteWrapper>
                  <Apply />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/Internship" 
              element={
                <RouteWrapper>
                  <InternshipListings />
                </RouteWrapper>
              } 
            />

            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <RouteWrapper>
                  <Login />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/forgot" 
              element={
                <RouteWrapper>
                  <ForgotPassword />
                </RouteWrapper>
              } 
            />
            
            <Route 
              path="/reset-password/:token" 
              element={
                <RouteWrapper>
                  <Reset />
                </RouteWrapper>
              } 
            />

            {/* Protected Admin Routes */}
            <Route 
              path="/logout" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <LogoutPage />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/admin/applications" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <AdminApplication />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/admin/dashboards" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <Dashboard />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/admin/interviews" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <Interview />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <Settings />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/admin/positions" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <Position />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/admin/messages" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <Messages />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
            
            <Route 
              path="/notifications" 
              element={
                <ProtectedAdmin>
                  <RouteWrapper>
                    <NotificationsPageContent />
                  </RouteWrapper>
                </ProtectedAdmin>
              } 
            />
          </Routes>
        </BrowserRouter>
      </DarkModeProvider>
    </ErrorBoundary>
  );
}

export default App;