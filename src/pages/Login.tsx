import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, AlertCircle, Sparkles } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, dbConnected, dbError, loading: authLoading, mockLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      const dashboardPath = user.role === 'admin' ? '/admin/dashboard' : 
                          user.role === 'employer' ? '/employer/dashboard' : 
                          '/candidate/dashboard';
      navigate(from !== '/' ? from : dashboardPath, { replace: true });
    }
  }, [user, navigate, from]);

  if (authLoading || dbConnected === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-teal-950/60 font-medium">Checking connection...</p>
        </div>
      </div>
    );
  }

  const [loginType, setLoginType] = useState<'candidate' | 'employer'>('candidate');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    handleGuestLogin();
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError('Database is currently disconnected. OAuth is unavailable.');
  };

  const handleGuestLogin = () => {
    mockLogin(loginType);
    // The useEffect will handle the redirect
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-forest-teal relative items-center justify-center p-20 overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <Link to="/" className="flex items-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-peach rounded-xl flex items-center justify-center">
              <span className="text-forest-teal font-bold text-2xl">F</span>
            </div>
            <span className="text-3xl font-bold tracking-tighter text-white">Folkstrot</span>
          </Link>
          <h2 className="text-5xl font-bold text-white leading-tight mb-6">
            Welcome back to the <br />
            <span className="text-peach">Future of Hiring.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            Access your personalized dashboard and continue your journey in the B2B ecosystem.
          </p>
        </div>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-peach/10 rounded-full blur-[100px] -ml-32 -mb-32" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 bg-cream flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-50">
          <BackButton />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md py-12 sm:py-0"
        >
          <div className="mb-6 lg:hidden">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-forest-teal rounded-xl flex items-center justify-center">
                <span className="text-peach font-bold text-lg sm:text-xl">F</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tighter text-teal-950">Folkstrot</span>
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-950 mb-1 sm:mb-2">Login</h1>
          <p className="text-xs sm:text-sm lg:text-base text-teal-950/60 mb-6 sm:mb-8">Choose your account type to continue.</p>

          {/* Tab View */}
          <div className="flex p-1 bg-teal-900/5 rounded-xl sm:rounded-2xl mb-6 sm:mb-8">
            <button 
              onClick={() => setLoginType('candidate')}
              className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${loginType === 'candidate' ? 'bg-white text-teal-950 shadow-sm' : 'text-teal-950/40 hover:text-teal-950'}`}
            >
              Candidate
            </button>
            <button 
              onClick={() => setLoginType('employer')}
              className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all ${loginType === 'employer' ? 'bg-white text-teal-950 shadow-sm' : 'text-teal-950/40 hover:text-teal-950'}`}
            >
              Employer
            </button>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600"
            >
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <div className="space-y-6">
            <form onSubmit={handleLogin} className="p-5 sm:p-6 bg-white rounded-[24px] sm:rounded-[32px] border border-teal-900/5 shadow-sm space-y-5 sm:space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${loginType === 'candidate' ? 'bg-coral/10 text-coral' : 'bg-forest-teal/10 text-forest-teal'}`}>
                  {loginType === 'candidate' ? <Mail size={20} className="sm:w-6 sm:h-6" /> : <Lock size={20} className="sm:w-6 sm:h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-teal-950 text-sm sm:text-base">
                    {loginType === 'candidate' ? 'Candidate Access' : 'Employer Access'}
                  </h3>
                  <p className="text-[10px] text-teal-950/40 font-bold uppercase tracking-widest">
                    {loginType === 'candidate' ? 'Find your next role' : 'Hire top talent'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-teal-950/40 uppercase tracking-widest pl-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                    <input 
                      type="email" 
                      placeholder={loginType === 'candidate' ? "name@example.com" : "hiring@company.com"}
                      className="w-full bg-cream/50 border border-teal-900/5 rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-[10px] font-bold text-teal-950/40 uppercase tracking-widest">Password</label>
                    <button type="button" className="text-[10px] font-bold text-coral hover:underline uppercase tracking-widest">Forgot?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full bg-cream/50 border border-teal-900/5 rounded-2xl pl-12 pr-4 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg text-white transition-all flex items-center justify-center shadow-xl ${loginType === 'candidate' ? 'bg-coral shadow-coral/20 hover:bg-teal-950' : 'bg-forest-teal shadow-forest-teal/20 hover:bg-coral'}`}
              >
                Sign In <span className="hidden sm:inline ml-1">as {loginType === 'candidate' ? 'Candidate' : 'Employer'}</span> <ArrowRight size={20} className="ml-2" />
              </button>
            </form>

            <div className="text-center">
              <p className="text-teal-950/40 text-[10px] font-bold uppercase tracking-widest px-4">
                Free Pass Enabled: Any credentials will grant access.
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 text-center text-teal-950/60 text-sm sm:text-base">
            <p className="mb-2">Don't have an account?</p>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-2 space-y-2 sm:space-y-0">
              <Link to="/signup-candidate" className="text-coral font-bold hover:underline">Join as Candidate</Link>
              <span className="hidden sm:inline text-teal-950/20">•</span>
              <Link to="/signup-employer" className="text-forest-teal font-bold hover:underline">Join as Employer</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
