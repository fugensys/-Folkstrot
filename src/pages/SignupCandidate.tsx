import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, MapPin, Upload, CheckCircle2, ArrowRight, ArrowLeft, Lock, AlertCircle, X } from 'lucide-react';
import { BackButton } from '../components/BackButton';
import { supabase } from '../lib/supabase';

import { useAuth } from '../context/AuthContext';

const SignupCandidate = () => {
  const { refreshUser, dbConnected, dbError, loading: authLoading } = useAuth();
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    location: '',
    workPreference: 'Remote',
    skills: [] as string[]
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = React.useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [customSkill, setCustomSkill] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
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

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData.password.trim()) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      
      const mobileRegex = /^\d{10}$/;
      const cleanMobile = formData.mobile.replace(/\D/g, '');
      if (!formData.mobile.trim()) {
        newErrors.mobile = 'Mobile number is required';
      } else if (!mobileRegex.test(cleanMobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number';
      }
    } else if (step === 2) {
      if (formData.skills.length === 0) {
        newErrors.skills = 'Please select at least one skill';
      }
    } else if (step === 3) {
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    } else if (step === 4) {
      if (!resumeFile) newErrors.resume = 'Please upload your resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSignup = async () => {
    if (!validateStep()) return;
    setApiError('Database is currently disconnected. Signup is unavailable. Please use "Continue as Guest" on the login page.');
  };
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
    if (errors.skills) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.skills;
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      if (errors.resume) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.resume;
          return newErrors;
        });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCustomSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const skill = customSkill.trim();
      if (skill && !formData.skills.includes(skill)) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, skill]
        }));
        setCustomSkill('');
        if (errors.skills) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.skills;
            return newErrors;
          });
        }
      }
    }
  };

  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'Product Management', 'Sales', 'Marketing'];

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-50">
        <BackButton />
      </div>
      <div className="w-full max-w-2xl py-16 sm:py-20 lg:py-0">
        {/* Progress Bar */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex justify-between mb-3 sm:mb-4 px-2 sm:px-0">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm lg:text-base transition-all ${step >= s ? 'bg-coral text-white' : 'bg-teal-900/10 text-teal-900/30'}`}>
                  {step > s ? <CheckCircle2 size={16} className="sm:w-5 sm:h-5" /> : s}
                </div>
              </div>
            ))}
          </div>
          <div className="h-1 bg-teal-900/10 rounded-full overflow-hidden mx-2 sm:mx-0">
            <motion.div 
              className="h-full bg-coral"
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-5 sm:p-8 lg:p-12 rounded-[24px] sm:rounded-[32px] lg:rounded-[48px] shadow-2xl border border-teal-900/5 mx-2 sm:mx-0"
        >
          {step === 1 && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Personal Information</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Let's start with the basics.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-cream rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none focus:ring-2 text-sm ${errors.firstName ? 'ring-red-500/20 border border-red-500/50' : 'ring-coral/20'}`} 
                    placeholder="John" 
                  />
                  {errors.firstName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-cream rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none focus:ring-2 text-sm ${errors.lastName ? 'ring-red-500/20 border border-red-500/50' : 'ring-coral/20'}`} 
                    placeholder="Doe" 
                  />
                  {errors.lastName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.lastName}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-cream rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none focus:ring-2 text-sm ${errors.email ? 'ring-red-500/20 border border-red-500/50' : 'ring-coral/20'}`} 
                    placeholder="john@example.com" 
                  />
                  {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.email}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 text-sm ${errors.password ? 'ring-red-500/20 border border-red-500/50' : 'ring-coral/20'}`} 
                      placeholder="••••••••" 
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.password}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Mobile Number</label>
                  <input 
                    type="tel" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full bg-cream rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none focus:ring-2 text-sm ${errors.mobile ? 'ring-red-500/20 border border-red-500/50' : 'ring-coral/20'}`} 
                    placeholder="1234567890" 
                  />
                  {errors.mobile && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.mobile}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Your Skills</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Select from existing skills or type your own and press Enter.</p>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyDown={handleCustomSkillKeyDown}
                    className="w-full bg-cream rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 outline-none focus:ring-2 ring-coral/20 text-sm" 
                    placeholder="Type a skill and press Enter..." 
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <div 
                      key={skill} 
                      className="flex items-center bg-coral text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold animate-in fade-in zoom-in duration-200"
                    >
                      {skill}
                      <button 
                        onClick={() => toggleSkill(skill)}
                        className="ml-2 hover:text-peach transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {skills.map((skill) => (
                  <button 
                    key={skill} 
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all text-left ${
                      formData.skills.includes(skill) 
                        ? 'bg-coral text-white shadow-lg shadow-coral/20' 
                        : 'bg-cream text-teal-950 hover:bg-peach/20'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-bold">{skill}</span>
                  </button>
                ))}
              </div>
              {errors.skills && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.skills}</p>}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Location & Preferences</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Where would you like to work?</p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Current Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={20} />
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full bg-cream rounded-2xl pl-12 pr-6 py-3.5 sm:py-4 outline-none focus:ring-2 text-sm ${errors.location ? 'ring-red-500/20 border border-red-500/50' : 'ring-coral/20'}`} 
                      placeholder="e.g. London, UK" 
                    />
                  </div>
                  {errors.location && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider pl-2">{errors.location}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold text-teal-950/40 uppercase tracking-widest">Work Preference</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {['Remote', 'On-site', 'Hybrid'].map((pref) => (
                      <button 
                        key={pref} 
                        onClick={() => setFormData(prev => ({ ...prev, workPreference: pref }))}
                        className={`py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all border ${formData.workPreference === pref ? 'bg-coral text-white border-coral shadow-lg shadow-coral/20' : 'bg-cream text-teal-950 border-transparent hover:border-coral/20'}`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-950 mb-1 sm:mb-2">Resume Upload</h2>
                <p className="text-sm sm:text-base text-teal-950/60">Upload your latest resume (PDF only).</p>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.docx"
                className="hidden"
              />

              <div 
                onClick={triggerFileInput}
                className={`border-4 border-dashed rounded-[24px] sm:rounded-[32px] p-8 sm:p-12 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                  resumeFile ? 'border-emerald-500/20 bg-emerald-50/30' : errors.resume ? 'border-red-500/20 bg-red-50/10' : 'border-teal-900/5 bg-cream/50 hover:bg-cream'
                }`}
              >
                <div className={`w-16 h-16 sm:w-20 h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-4 sm:mb-6 transition-all ${
                  resumeFile ? 'bg-emerald-500/10' : errors.resume ? 'bg-red-500/10' : 'bg-forest-teal/5 group-hover:bg-coral/10'
                }`}>
                  {resumeFile ? (
                    <CheckCircle2 className="text-emerald-500" size={28} />
                  ) : (
                    <Upload className={`${errors.resume ? 'text-red-500' : 'text-forest-teal group-hover:text-coral'}`} size={28} />
                  )}
                </div>
                
                {resumeFile ? (
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-teal-950 mb-1 sm:mb-2 break-all px-4">{resumeFile.name}</p>
                    <p className="text-emerald-600 font-bold text-[10px] sm:text-sm uppercase tracking-widest">File selected successfully</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-lg sm:text-xl font-bold text-teal-950 mb-1 sm:mb-2">Drag & drop your resume</p>
                    <p className={`${errors.resume ? 'text-red-500/60' : 'text-teal-950/40'} font-medium text-sm`}>or click to browse files</p>
                  </div>
                )}
              </div>
              {errors.resume && <p className="text-red-500 text-center text-[10px] font-bold uppercase tracking-wider">{errors.resume}</p>}
              <p className="text-center text-[10px] text-teal-950/30 font-bold uppercase tracking-widest">Supported formats: .pdf, .docx (Max 5MB)</p>
            </div>
          )}

          {apiError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-sm font-medium">{apiError}</p>
            </div>
          )}

          <div className="mt-8 sm:mt-12 flex justify-between items-center">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center space-x-2 px-4 sm:px-8 py-3.5 sm:py-4 text-teal-950 font-bold hover:text-coral transition-colors text-sm sm:text-base">
                <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>
            ) : <div />}
            
            <button 
              disabled={loading}
              onClick={step === 4 ? handleSignup : nextStep}
              className="flex items-center space-x-2 px-6 sm:px-10 py-3.5 sm:py-4 bg-coral text-white rounded-xl sm:rounded-2xl font-bold hover:bg-teal-950 transition-all shadow-xl shadow-coral/20 disabled:opacity-50 text-sm sm:text-base"
            >
              <span>{loading ? 'Processing...' : step === 4 ? 'Complete' : 'Next Step'}</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupCandidate;
