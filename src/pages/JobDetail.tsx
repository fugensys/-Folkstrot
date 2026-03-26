import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Briefcase, Clock, DollarSign, Share2, ArrowLeft, CheckCircle2, Heart, Loader2, X, CheckCircle } from 'lucide-react';
import { FEATURED_JOBS } from '../constants';
import { useShortlist } from '../context/ShortlistContext';
import { cn } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { jobService, Job, applicationService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const { toggleShortlist, isShortlisted } = useShortlist();

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await jobService.getJobById(id);
        setJob(data);
      } catch (err: any) {
        console.error('Error fetching job:', err);
        let errorMessage = 'Job not found or failed to load.';
        if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
          errorMessage = 'Database connection is currently unavailable. Please try again later.';
        }
        
        // Fallback to mock data if ID matches one of the mock jobs
        const mockJob = FEATURED_JOBS.find(j => j.id === id);
        if (mockJob) {
          setJob(mockJob as any);
        } else {
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'candidate') {
      setApplyError('Only candidates can apply for jobs.');
      return;
    }

    try {
      setApplying(true);
      setApplyError(null);
      await applicationService.applyForJob(user.id, id!);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: any) {
      console.error('Error applying for job:', err);
      let errorMessage = err.message || 'Failed to submit application. You might have already applied.';
      if (errorMessage === 'Failed to fetch' || errorMessage.includes('fetch')) {
        errorMessage = 'Database connection is currently unavailable. Please try again later.';
      }
      setApplyError(errorMessage);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 bg-cream min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-forest-teal animate-spin" />
          <div className="absolute inset-0 bg-forest-teal/10 blur-xl rounded-full animate-pulse" />
        </div>
        <p className="mt-4 text-teal-950/60 font-bold tracking-widest uppercase text-xs">Accessing Neural Database...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="pt-32 pb-24 bg-cream min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-black text-teal-950 mb-4">Job Not Found</h2>
        <p className="text-teal-950/60 mb-8 text-center max-w-md">
          The job listing you're looking for might have been removed or is no longer available.
        </p>
        <Link 
          to="/jobs" 
          className="px-8 py-4 bg-forest-teal text-white rounded-2xl font-bold hover:bg-forest-teal/90 transition-all"
        >
          Back to Job Listings
        </Link>
      </div>
    );
  }

  const formattedDate = job.created_at 
    ? new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <main className="pt-24 sm:pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-12">
            <header className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-teal-900/5 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-forest-teal rounded-2xl sm:rounded-3xl flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shrink-0">
                    {job.company[0]}
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-black text-teal-950 tracking-tighter mb-1 sm:mb-2">{job.title}</h1>
                    <p className="text-sm sm:text-xl text-teal-950/60 font-medium">{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="flex space-x-2 sm:space-x-3">
                  <button 
                    onClick={() => toggleShortlist(job as any)}
                    className={cn(
                      "p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all",
                      isShortlisted(job.id) ? "bg-coral text-white" : "bg-cream text-teal-950 hover:bg-peach/20"
                    )}
                  >
                    <Heart size={20} className="sm:w-6 sm:h-6" fill={isShortlisted(job.id) ? "currentColor" : "none"} />
                  </button>
                  <button className="p-3 sm:p-4 bg-cream text-teal-950 rounded-xl sm:rounded-2xl hover:bg-peach/20 transition-all"><Share2 size={20} className="sm:w-6 sm:h-6" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-teal-900/5">
                {[
                  { icon: Briefcase, label: 'Job Type', value: job.type },
                  { icon: MapPin, label: 'Location', value: job.location },
                  { icon: DollarSign, label: 'Salary', value: job.salary },
                  { icon: Clock, label: 'Posted', value: formattedDate }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center text-teal-950/40 font-black text-[9px] sm:text-xs uppercase tracking-widest mb-1">
                      <item.icon size={12} className="mr-1.5 sm:mr-2" /> {item.label}
                    </div>
                    <p className="font-bold text-teal-950 text-xs sm:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </header>

            <div className="bg-white p-6 sm:p-10 rounded-[32px] sm:rounded-[48px] border border-teal-900/5 shadow-sm space-y-8 lg:space-y-10">
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-teal-950 mb-4 sm:mb-6">Job Description</h2>
                <p className="text-teal-950/60 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                  {job.description}
                </p>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-teal-950 mb-4 sm:mb-6">Requirements</h2>
                <ul className="space-y-3 sm:space-y-4">
                  {[
                    "Relevant experience in the field",
                    "Strong portfolio or track record",
                    "Excellent communication and collaboration skills",
                    "Ability to work in a fast-paced environment",
                    "Passion for innovation and technology"
                  ].map((req, i) => (
                    <li key={i} className="flex items-start text-teal-950/70 font-medium text-sm sm:text-base">
                      <CheckCircle2 size={18} className="text-emerald-500 mr-3 sm:mr-4 shrink-0 mt-1 sm:w-5 sm:h-5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-teal-950 mb-4 sm:mb-6">Benefits</h2>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    "Competitive compensation",
                    "Remote-friendly work culture",
                    "Health and wellness benefits",
                    "Professional growth opportunities",
                    "Dynamic and inclusive team"
                  ].map((benefit, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-cream rounded-xl sm:rounded-2xl flex items-center text-teal-950 font-bold text-sm sm:text-base">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-coral rounded-full mr-3 sm:mr-4" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-forest-teal p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] text-white shadow-2xl lg:sticky lg:top-32">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Apply for this position</h3>
              <p className="text-white/60 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Join {job.company} and help us build the future of innovation.
              </p>
              
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center space-x-3"
                  >
                    <CheckCircle className="text-emerald-400 shrink-0" size={20} />
                    <p className="text-sm font-bold text-emerald-400">Application submitted successfully!</p>
                  </motion.div>
                )}

                {applyError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-coral/20 border border-coral/30 rounded-2xl flex items-center space-x-3"
                  >
                    <X className="text-coral shrink-0" size={20} />
                    <p className="text-sm font-bold text-coral">{applyError}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <button 
                  onClick={handleApply}
                  disabled={applying || showSuccess}
                  className={cn(
                    "w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-xl flex items-center justify-center space-x-2",
                    showSuccess 
                      ? "bg-emerald-500 text-white shadow-emerald-500/20 cursor-default" 
                      : "bg-coral text-white hover:bg-coral/90 shadow-coral/20 disabled:opacity-50"
                  )}
                >
                  {applying ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle size={18} />
                      <span>Applied</span>
                    </>
                  ) : (
                    <span>Apply Now</span>
                  )}
                </button>
                <button 
                  onClick={() => toggleShortlist(job as any)}
                  className={cn(
                    "w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all border",
                    isShortlisted(job.id)
                      ? "bg-coral text-white border-coral"
                      : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                  )}
                >
                  {isShortlisted(job.id) ? 'Saved' : 'Save Job'}
                </button>
              </div>
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center">
                <p className="text-white/40 text-[10px] sm:text-sm font-medium">Application deadline: Rolling basis</p>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-teal-900/5 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-teal-950 mb-4 sm:mb-6">About the Company</h3>
              <div className="flex items-center space-x-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-forest-teal rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {job.company[0]}
                </div>
                <div>
                  <h4 className="font-bold text-teal-950 text-sm sm:text-base">{job.company}</h4>
                  <p className="text-[9px] sm:text-xs text-teal-950/40 font-black uppercase tracking-widest">Industry Leader</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-teal-950/60 leading-relaxed mb-4 sm:mb-6">
                {job.company} is a leading provider of innovative solutions in their industry.
              </p>
              <Link to="/employers" className="text-coral font-bold text-xs sm:text-sm hover:underline">View Company Profile</Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default JobDetail;
