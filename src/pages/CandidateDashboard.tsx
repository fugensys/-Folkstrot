import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar, MobileNav } from '../components/Navigation';
import { Briefcase, Clock, Star, Search, Sparkles, FileText, ChevronRight, X, Loader2, CheckCircle2, Heart, ArrowRight, LogOut } from 'lucide-react';
import { generateResumeContent } from '../services/geminiService';
import { useShortlist } from '../context/ShortlistContext';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { applicationService } from '../services/supabaseService';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

const CandidateDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { shortlistedJobs } = useShortlist();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resumeData, setResumeData] = useState<{ summary: string; highlights: string[] } | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) return;
      try {
        const data = await applicationService.getApplicationsByCandidateId(user.id);
        setApplications(data);
      } catch (error: any) {
        console.error('Error fetching applications:', error);
        if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
          // You could set a specific error state here if you want to show a banner
          console.warn('Database connection is currently unavailable. Using mock data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const data = await generateResumeContent(['React', 'TypeScript', 'UI/UX'], '6 years of B2B SaaS experience');
    setResumeData(data);
    setIsGenerating(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="candidate" />
      <MobileNav role="candidate" />
      
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto pb-32 lg:pb-12">
        <BackButton />
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-16 gap-6">
          <div>
            <span className="micro-label text-coral mb-2 sm:mb-4 block">Candidate Portal</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              Welcome, <br />
              {user?.full_name || 'Talent'}
            </h1>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogout}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-teal-900/5 rounded-2xl flex items-center justify-center text-teal-950/40 hover:text-coral hover:shadow-lg transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-950/40 mb-0.5 sm:mb-1">Network Status</p>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-teal-950">Active Talent</span>
                </div>
              </div>
            </div>
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-forest-teal rounded-[18px] sm:rounded-[24px] flex items-center justify-center text-peach font-black text-lg sm:text-xl shadow-xl shadow-teal-900/20 overflow-hidden">
              {user?.avatar_url ? (
                <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                user?.full_name ? getInitials(user.full_name) : 'T'
              )}
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8 lg:space-y-12">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {[
                { label: 'Applications', value: applications.length.toString().padStart(2, '0'), icon: Briefcase, color: 'bg-forest-teal' },
                { label: 'Shortlisted', value: shortlistedJobs.length.toString().padStart(2, '0'), icon: Heart, color: 'bg-coral' },
                { label: 'Interviews', value: applications.filter(a => a.status === 'interviewing').length.toString().padStart(2, '0'), icon: Clock, color: 'bg-peach' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 sm:p-8 rounded-[24px] sm:rounded-[40px] border border-teal-900/5 shadow-sm hover:shadow-xl transition-all group">
                  <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-white group-hover:scale-110 transition-transform", stat.color)}>
                    <stat.icon size={18} />
                  </div>
                  <p className="text-3xl sm:text-4xl font-black tracking-tighter text-teal-950 mb-1">{stat.value}</p>
                  <p className="micro-label">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* AI Resume Builder Promo - Editorial Style */}
            <div className="bg-forest-teal p-8 sm:p-12 rounded-[40px] sm:rounded-[60px] text-white relative overflow-hidden shadow-2xl group">
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                  <Sparkles className="text-peach" />
                  <span className="micro-label text-peach opacity-100">Neural Matching Engine</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-4 sm:mb-6">
                  Optimize <br />
                  <span className="text-peach italic font-serif lowercase">for</span> <br />
                  Impact
                </h2>
                <p className="text-white/60 mb-8 sm:mb-10 max-w-md text-base sm:text-lg leading-relaxed">
                  Our AI analyzes your professional DNA against thousands of B2B benchmarks to ensure you're seen by the right leaders.
                </p>
                <button 
                  onClick={() => setIsBuilderOpen(true)}
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-peach text-forest-teal rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-white transition-all flex items-center justify-center group-hover:scale-105"
                >
                  Launch Resume Builder <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
              <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-coral/10 rounded-full blur-[80px] sm:blur-[100px] -mr-16 sm:-mr-32 -mt-16 sm:-mt-32" />
              <div className="absolute bottom-0 right-12 opacity-10 group-hover:opacity-20 transition-opacity hidden sm:block">
                <Sparkles size={300} />
              </div>
            </div>

            {/* Recent Activity - Data Grid Style */}
            <div>
              <div className="flex justify-between items-end mb-6 sm:mb-8">
                <div>
                  <span className="micro-label text-coral mb-1 sm:mb-2 block">Application History</span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-teal-950 uppercase">Recent Activity</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-teal-950/40 hover:text-coral transition-colors">View Archive</button>
              </div>
              <div className="space-y-px border-t border-teal-900/10">
                {applications.length === 0 ? (
                  <div className="py-12 text-center bg-white rounded-3xl">
                    <p className="text-teal-950/40 font-bold">No recent applications found.</p>
                  </div>
                ) : (
                  applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="data-row flex flex-col sm:flex-row sm:items-center py-6 sm:py-8 px-4 group bg-white hover:bg-forest-teal gap-4 sm:gap-0">
                      <div className="flex items-center flex-1">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-lg sm:text-xl group-hover:bg-peach transition-colors shrink-0">
                          {app.jobs.company[0]}
                        </div>
                        <div className="ml-4 sm:ml-6">
                          <h4 className="text-lg sm:text-xl font-black tracking-tighter uppercase group-hover:text-peach transition-colors">{app.jobs.title}</h4>
                          <p className="font-serif italic text-sm sm:text-base text-teal-950/40 group-hover:text-peach/60">{app.jobs.company}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex sm:flex-col justify-between items-center sm:items-end">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors",
                          app.status === 'pending' ? 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' :
                          app.status === 'interviewing' ? 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' :
                          'bg-teal-950/10 text-teal-950 group-hover:bg-white/10 group-hover:text-white'
                        )}>
                          {app.status}
                        </span>
                        <p className="data-value text-[9px] sm:text-[10px] group-hover:text-peach/40">
                          Applied {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Specialist Tool Style */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-12">
            <div className="bg-white p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] border border-teal-900/5 shadow-sm">
              <h3 className="micro-label text-teal-950 mb-6 sm:mb-8 block">Network Insights</h3>
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">Profile Strength</span>
                    <span className="text-xl sm:text-2xl font-black tracking-tighter text-teal-950">84%</span>
                  </div>
                  <div className="h-2 bg-teal-900/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '84%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-coral"
                    />
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">Trending Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {['Product Strategy', 'SaaS', 'B2B Sales', 'Neural Networks', 'GTM'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-cream border border-teal-900/5 rounded-full text-[9px] sm:text-[10px] font-bold text-teal-950 uppercase tracking-widest">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 sm:p-6 bg-forest-teal rounded-2xl sm:rounded-3xl text-peach">
                  <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-peach rounded-full animate-ping" />
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Live Market Data</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed">
                    Companies in <span className="text-white font-bold">Enterprise SaaS</span> are currently hiring 24% faster than last month.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-coral p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] text-white shadow-xl shadow-coral/20">
              <h4 className="text-xl sm:text-2xl font-black tracking-tighter uppercase mb-3 sm:mb-4">Refer & Earn</h4>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">Invite top-tier talent to the network and earn rewards when they get hired.</p>
              <button className="w-full py-3 sm:py-4 bg-white text-coral rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-teal-950 hover:text-peach transition-all">
                Get Invite Link
              </button>
            </div>
          </div>
        </div>

        {/* AI Resume Builder Modal */}
        <AnimatePresence>
          {isBuilderOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsBuilderOpen(false)}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[32px] sm:rounded-[48px] shadow-2xl overflow-hidden"
              >
                <div className="p-6 sm:p-10">
                  <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="text-coral" />
                      <h2 className="text-xl sm:text-2xl font-bold text-teal-950">AI Resume Builder</h2>
                    </div>
                    <button onClick={() => setIsBuilderOpen(false)} className="p-2 hover:bg-cream rounded-xl transition-colors">
                      <X size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </div>

                  {!resumeData ? (
                    <div className="space-y-6 sm:space-y-8">
                      <p className="text-sm sm:text-base text-teal-950/60">Our AI will generate a tailored summary and highlights based on your profile.</p>
                      <button 
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-3.5 sm:py-4 bg-forest-teal text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-teal-900 transition-all flex items-center justify-center disabled:opacity-50"
                      >
                        {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
                        {isGenerating ? 'Analyzing Profile...' : 'Generate Content'}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 sm:space-y-8">
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-[10px] sm:text-sm font-bold text-teal-950/40 uppercase tracking-widest">Professional Summary</h3>
                        <div className="p-4 sm:p-6 bg-cream rounded-2xl border border-teal-900/5 text-sm sm:text-base text-teal-950 leading-relaxed">
                          {resumeData.summary}
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-[10px] sm:text-sm font-bold text-teal-950/40 uppercase tracking-widest">Key Highlights</h3>
                        <div className="space-y-2 sm:space-y-3">
                          {resumeData.highlights.map((h, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 sm:p-4 bg-cream rounded-2xl border border-teal-900/5">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px]" />
                              <span className="text-xs sm:text-sm text-teal-950 font-medium">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button className="flex-1 py-3.5 sm:py-4 bg-forest-teal text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-teal-900 transition-all">
                          Apply to Profile
                        </button>
                        <button onClick={() => setResumeData(null)} className="px-6 sm:px-8 py-3.5 sm:py-4 bg-cream text-teal-950 rounded-2xl font-bold text-sm sm:text-base hover:bg-peach/20 transition-all">
                          Regenerate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default CandidateDashboard;
