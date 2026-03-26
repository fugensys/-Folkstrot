import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, FileText, Lock, AlertCircle } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { SUBSCRIPTION_PLANS } from '../constants';
import { supabase } from '../lib/supabase';

import { useAuth } from '../context/AuthContext';

const SignupEmployer = () => {
  const { refreshUser, dbConnected, dbError, loading: authLoading } = useAuth();
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [companySize, setCompanySize] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleEmailNext = () => {
    const blockedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
    const domain = email.split('@')[1];
    
    if (!email) {
      setError('Email is required.');
      return;
    }

    if (blockedDomains.includes(domain)) {
      setError('Please use a company domain email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!fullName) {
      setError('Full name is required.');
      return;
    }

    if (!companyName) {
      setError('Company name is required.');
      return;
    }

    if (!companySize) {
      setError('Company size is required.');
      return;
    }

    setError('');
    setStep(2);
  };

  const handleSignup = async () => {
    setApiError('Database is currently disconnected. Signup is unavailable. Please use "Continue as Guest" on the login page.');
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-8 relative">
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
        <BackButton />
      </div>
      <div className="w-full max-w-4xl py-12 sm:py-0">
        {/* Progress */}
        <div className="mb-8 sm:mb-12 max-w-2xl mx-auto">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all ${step >= s ? 'bg-coral text-white' : 'bg-teal-900/10 text-teal-900/30'}`}>
                {step > s ? <CheckCircle2 size={18} className="sm:w-5 sm:h-5" /> : s}
              </div>
            ))}
          </div>
          <div className="h-1 bg-teal-900/10 rounded-full overflow-hidden">
            <motion.div className="h-full bg-coral" animate={{ width: `${(step / 4) * 100}%` }} />
          </div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 sm:p-12 rounded-[32px] sm:rounded-[48px] shadow-2xl border border-teal-900/5"
        >
          {step === 1 && (
            <div className="max-w-md mx-auto space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Company Verification</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Enter your official work email to get started.</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 text-sm" 
                      placeholder="Your Full Name" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 text-sm" 
                      placeholder="you@company.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 text-sm" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 text-sm" 
                      placeholder="Your Company Name" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Company Size</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                    <select 
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                      className="w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 appearance-none text-sm"
                    >
                      <option value="">Select Company Size</option>
                      <option value="1-10">1-10 Employees</option>
                      <option value="11-50">11-50 Employees</option>
                      <option value="51-200">51-200 Employees</option>
                      <option value="201-500">201-500 Employees</option>
                      <option value="500+">500+ Employees</option>
                    </select>
                  </div>
                  {error && <p className="text-rose-500 text-[10px] font-bold mt-2 uppercase tracking-wider pl-2">{error}</p>}
                </div>
                <button onClick={handleEmailNext} className="w-full bg-coral text-white py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg hover:bg-teal-950 transition-all flex items-center justify-center shadow-xl shadow-coral/20">
                  Continue <ArrowRight size={18} className="ml-2 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="p-5 sm:p-6 bg-peach/10 rounded-3xl border border-peach/20 flex items-start space-x-4">
                <ShieldCheck className="text-coral shrink-0" size={20} />
                <p className="text-xs sm:text-sm text-teal-950/70 leading-relaxed">
                  We only accept company domain emails to ensure platform integrity and security for our candidates.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Select Your Plan</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Choose the scale that fits your hiring goals.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <div key={plan.id} className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-cream border border-teal-900/5 hover:border-coral/40 transition-all cursor-pointer group flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-teal-950 mb-1">{plan.name}</h3>
                    <p className="text-xl sm:text-2xl font-black text-coral mb-4 sm:mb-6">{plan.price}</p>
                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                      {plan.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="text-[10px] sm:text-xs font-bold text-teal-950/60 flex items-center">
                          <CheckCircle2 size={14} className="mr-2 text-emerald-500 shrink-0" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setStep(3)} className="w-full py-2.5 sm:py-3 bg-white text-teal-950 rounded-xl font-bold text-xs sm:text-sm group-hover:bg-coral group-hover:text-white transition-all shadow-sm">
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 sm:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Profile Verification</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Upload official documents to verify your business.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                <div className="p-6 sm:p-8 border-2 border-dashed border-teal-900/10 rounded-[24px] sm:rounded-[32px] bg-cream/50 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-all">
                  <FileText className="text-teal-950/20 mb-3 sm:mb-4 group-hover:text-coral transition-colors" size={32} sm:size={40} />
                  <p className="text-sm sm:text-base font-bold text-teal-950">Incorporation Certificate</p>
                  <p className="text-[10px] sm:text-xs text-teal-950/40 mt-1">PDF or Image (Max 10MB)</p>
                </div>
                <div className="p-6 sm:p-8 border-2 border-dashed border-teal-900/10 rounded-[24px] sm:rounded-[32px] bg-cream/50 flex flex-col items-center text-center group cursor-pointer hover:bg-white transition-all">
                  <FileText className="text-teal-950/20 mb-3 sm:mb-4 group-hover:text-coral transition-colors" size={32} sm:size={40} />
                  <p className="text-sm sm:text-base font-bold text-teal-950">Company PAN / Tax ID</p>
                  <p className="text-[10px] sm:text-xs text-teal-950/40 mt-1">PDF or Image (Max 10MB)</p>
                </div>
              </div>
              <div className="flex justify-center flex-col items-center space-y-4">
                {apiError && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600 w-full max-w-md">
                    <AlertCircle size={20} className="shrink-0" />
                    <p className="text-sm font-medium">{apiError}</p>
                  </div>
                )}
                <button 
                  disabled={loading}
                  onClick={handleSignup} 
                  className="w-full sm:w-auto px-8 sm:px-12 py-3.5 sm:py-4 bg-coral text-white rounded-2xl font-bold hover:bg-teal-950 transition-all shadow-xl shadow-coral/20 disabled:opacity-50 text-sm sm:text-base"
                >
                  {loading ? 'Submitting...' : 'Submit for Verification'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 sm:py-12 space-y-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <CheckCircle2 size={40} sm:size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-950">Application Submitted!</h2>
              <p className="text-teal-950/60 max-w-md mx-auto text-base sm:text-lg">
                Our team is reviewing your documents. You'll receive an email once your account is verified (usually within 24 hours).
              </p>
              <button onClick={() => navigate('/employer/dashboard')} className="px-8 sm:px-10 py-3.5 sm:py-4 bg-coral text-white rounded-2xl font-bold hover:bg-teal-950 transition-all flex items-center mx-auto shadow-xl shadow-coral/20 text-sm sm:text-base">
                Go to Dashboard <ArrowRight size={18} className="ml-2 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="mt-8 sm:mt-12 flex justify-between">
              {step > 1 ? (
                <button onClick={() => setStep(step - 1)} className="flex items-center space-x-2 px-4 sm:px-8 py-3.5 sm:py-4 text-teal-950 font-bold hover:text-coral transition-colors text-sm sm:text-base">
                  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                  <span>Back</span>
                </button>
              ) : <div />}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignupEmployer;
