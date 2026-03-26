import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navigation';
import { Footer } from './components/Footer';
import { ShortlistProvider } from './context/ShortlistContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetail from './pages/JobDetail';
import EmployersLanding from './pages/EmployersLanding';
import About from './pages/About';
import Login from './pages/Login';
import SignupCandidate from './pages/SignupCandidate';
import SignupEmployer from './pages/SignupEmployer';
import CandidateDashboard from './pages/CandidateDashboard';
import CandidateProfile from './pages/CandidateProfile';
import ShortlistedJobs from './pages/ShortlistedJobs';
import AppliedJobs from './pages/AppliedJobs';
import AIResumeBuilder from './pages/AIResumeBuilder';
import CandidateSettings from './pages/CandidateSettings';
import Chat from './pages/Chat';
import EmployerDashboard from './pages/EmployerDashboard';
import JobManagement from './pages/JobManagement';
import JobApplicants from './pages/JobApplicants';
import PostJob from './pages/PostJob';
import LayoffSupport from './pages/LayoffSupport';
import SubscriptionBilling from './pages/SubscriptionBilling';
import CompanyVerification from './pages/CompanyVerification';
import EmployerSettings from './pages/EmployerSettings';
import AdminDashboard from './pages/AdminDashboard';
import AdminEmployerManagement from './pages/AdminEmployerManagement';
import AdminJobManagement from './pages/AdminJobManagement';
import AdminJobApplicants from './pages/AdminJobApplicants';
import AdminCandidateManagement from './pages/AdminCandidateManagement';
import AdminSubscriptionPlans from './pages/AdminSubscriptionPlans';
import AdminInquiries from './pages/AdminInquiries';
import AdminSettings from './pages/AdminSettings';

import { motion } from 'motion/react';

export default function App() {
  return (
    <AuthProvider>
      <ShortlistProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<><Navbar /><Home /></>} />
                <Route path="/jobs" element={<><Navbar /><JobListings /></>} />
                <Route path="/jobs/:id" element={<><Navbar /><JobDetail /></>} />
                <Route path="/employers" element={<><Navbar /><EmployersLanding /></>} />
                <Route path="/about" element={<><Navbar /><About /></>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup-candidate" element={<SignupCandidate />} />
                <Route path="/signup-employer" element={<SignupEmployer />} />

                {/* Protected Routes */}
                <Route 
                  path="/candidate/*" 
                  element={
                    <ProtectedRoute allowedRoles={['candidate']}>
                      <CandidateRoutes />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/employer/*" 
                  element={
                    <ProtectedRoute allowedRoles={['employer']}>
                      <EmployerRoutes />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminRoutes />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ShortlistProvider>
    </AuthProvider>
  );
}

function CandidateRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<CandidateDashboard />} />
      <Route path="resume-builder" element={<AIResumeBuilder />} />
      <Route path="messages" element={<Chat role="candidate" />} />
      <Route path="my-jobs" element={<AppliedJobs />} />
      <Route path="shortlisted" element={<ShortlistedJobs />} />
      <Route path="profile" element={<CandidateProfile />} />
      <Route path="settings" element={<CandidateSettings />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

function EmployerRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<EmployerDashboard />} />
      <Route path="jobs" element={<JobManagement />} />
      <Route path="jobs/:jobId/applicants" element={<JobApplicants />} />
      <Route path="messages" element={<Chat role="employer" />} />
      <Route path="layoff-support" element={<LayoffSupport />} />
      <Route path="billing" element={<SubscriptionBilling />} />
      <Route path="verification" element={<CompanyVerification />} />
      <Route path="settings" element={<EmployerSettings />} />
      <Route path="post-job" element={<PostJob />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="employers" element={<AdminEmployerManagement />} />
      <Route path="candidates" element={<AdminCandidateManagement />} />
      <Route path="jobs" element={<AdminJobManagement />} />
      <Route path="jobs/:jobId/applicants" element={<AdminJobApplicants />} />
      <Route path="messages" element={<Chat role="admin" />} />
      <Route path="subscriptions" element={<AdminSubscriptionPlans />} />
      <Route path="inquiries" element={<AdminInquiries />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
}

