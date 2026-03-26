import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, ArrowRight, Sparkles, Heart, Loader2, AlertCircle } from 'lucide-react';
import { FEATURED_JOBS } from '../constants';
import { useShortlist } from '../context/ShortlistContext';
import { Link } from 'react-router-dom';
import { cn } from '../components/Navigation';
import { jobService, Job } from '../services/supabaseService';

const JobListings = () => {
  const { toggleShortlist, isShortlisted } = useShortlist();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobService.getAllJobs();
        setJobs(data);
      } catch (err: any) {
        console.error('Error fetching jobs:', err);
        let errorMessage = 'Failed to load jobs. Falling back to featured listings.';
        if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
          errorMessage = 'Database connection is currently unavailable. Please try again later.';
        }
        setError(errorMessage);
        // Fallback to mock data if Supabase table is not ready
        setJobs(FEATURED_JOBS.map(j => ({
          ...j,
          description: 'Mock description',
          created_at: new Date().toISOString(),
          employer_id: 'mock-id'
        })) as Job[]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <main className="pt-32 pb-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
          <div>
            <span className="micro-label text-coral mb-2 sm:mb-4 block">Market Opportunities</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-teal-950 uppercase leading-[0.9]">
              Active <br />
              Openings
            </h1>
          </div>
          <div className="flex-1 max-w-2xl w-full">
            <div className="bg-white p-3 sm:p-2 rounded-2xl sm:rounded-3xl shadow-xl border border-teal-900/5 flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 py-3 border-b sm:border-b-0 sm:border-r border-teal-900/10">
                <Search className="text-teal-900/40 mr-3 shrink-0" size={18} />
                <input 
                  type="text" 
                  placeholder="Position or Keyword"
                  className="w-full bg-transparent outline-none text-teal-950 font-bold placeholder:text-teal-900/30 text-xs sm:text-sm uppercase tracking-wider"
                />
              </div>
              <div className="flex-1 flex items-center px-4 py-3">
                <MapPin className="text-teal-900/40 mr-3 shrink-0" size={18} />
                <input 
                  type="text" 
                  placeholder="Location"
                  className="w-full bg-transparent outline-none text-teal-950 font-bold placeholder:text-teal-900/30 text-xs sm:text-sm uppercase tracking-wider"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex-1 bg-cream text-teal-950 px-4 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] border border-teal-900/10 hover:bg-teal-900/5 transition-all"
                >
                  Filters
                </button>
                <button className="flex-1 sm:flex-none bg-forest-teal text-peach px-6 sm:px-8 py-4 sm:py-3 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-teal-950 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-cream p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-teal-950">Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="text-teal-950/40 hover:text-teal-950">
                  <AlertCircle size={24} className="rotate-45" />
                </button>
              </div>
              
              <div className="space-y-12">
                <div>
                  <span className="micro-label text-teal-950/40 mb-4 block">Employment Type</span>
                  {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
                    <label key={type} className="flex items-center space-x-3 mb-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border-2 border-teal-900/20 group-hover:border-coral transition-colors flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-coral rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-teal-950/60 group-hover:text-teal-950 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
                
                <div className="h-px bg-teal-900/10" />
                
                <div>
                  <span className="micro-label text-teal-950/40 mb-4 block">Experience Level</span>
                  {['Entry', 'Mid-Level', 'Senior', 'Executive'].map((level) => (
                    <label key={level} className="flex items-center space-x-3 mb-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border-2 border-teal-900/20 group-hover:border-coral transition-colors flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-coral rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-teal-950/60 group-hover:text-teal-950 transition-colors">{level}</span>
                    </label>
                  ))}
                </div>

                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full py-5 bg-forest-teal text-peach rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-forest-teal/20"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {error && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center space-x-3 text-amber-700">
            <AlertCircle size={20} className="shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Filters Sidebar - Hardware Style */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="col-header mb-6 block opacity-100 text-teal-950">Job Parameters</h3>
                <div className="space-y-6">
                  <div>
                    <span className="micro-label text-teal-950/40 mb-4 block">Employment Type</span>
                    {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
                      <label key={type} className="flex items-center space-x-3 mb-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border-2 border-teal-900/20 group-hover:border-coral transition-colors flex items-center justify-center">
                          <div className="w-2 h-2 bg-coral rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-teal-950/60 group-hover:text-teal-950 transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                  <div className="h-px bg-teal-900/10" />
                  <div>
                    <span className="micro-label text-teal-950/40 mb-4 block">Experience Level</span>
                    {['Entry', 'Mid-Level', 'Senior', 'Executive'].map((level) => (
                      <label key={level} className="flex items-center space-x-3 mb-3 cursor-pointer group">
                        <div className="w-4 h-4 rounded border-2 border-teal-900/20 group-hover:border-coral transition-colors flex items-center justify-center">
                          <div className="w-2 h-2 bg-coral rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-teal-950/60 group-hover:text-teal-950 transition-colors">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-forest-teal p-8 rounded-[40px] text-peach">
                <Sparkles className="mb-4" />
                <h4 className="text-xl font-black uppercase tracking-tighter mb-2">AI Match</h4>
                <p className="text-peach/60 text-sm leading-relaxed mb-6">Let our neural network find the perfect role for your specific skill set.</p>
                <button className="w-full py-4 bg-peach text-forest-teal rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-colors">
                  Enable Matching
                </button>
              </div>
            </div>
          </aside>

          {/* Job List - Technical Data Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="animate-spin text-coral" size={48} />
                <p className="text-teal-950/40 font-bold uppercase tracking-widest text-sm">Accessing Neural Database...</p>
              </div>
            ) : (
              <div className="space-y-px border-t border-teal-900/10">
                {jobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="data-row flex flex-col lg:flex-row lg:items-center py-6 sm:py-8 lg:py-12 px-4 lg:px-6 group"
                  >
                    <div className="flex-1 mb-6 lg:mb-0">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="px-2 py-0.5 border border-current rounded text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-60">
                          {job.type}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest opacity-40">
                          Ref: FT-{job.id.slice(0, 5)}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-4xl font-black tracking-tighter uppercase leading-none mb-2 group-hover:text-peach transition-colors">
                        {job.title}
                      </h3>
                      <p className="font-serif italic text-sm sm:text-base text-teal-950/40 group-hover:text-peach/60">
                        {job.company}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 lg:w-[450px]">
                      <div>
                        <span className="col-header mb-1 lg:mb-2 block group-hover:text-peach/40 text-[9px] lg:text-[11px]">Location</span>
                        <p className="data-value text-[10px] sm:text-sm uppercase">{job.location}</p>
                      </div>
                      <div>
                        <span className="col-header mb-1 lg:mb-2 block group-hover:text-peach/40 text-[9px] lg:text-[11px]">Compensation</span>
                        <p className="data-value text-[10px] sm:text-sm">{job.salary}</p>
                      </div>
                      <div className="flex items-center justify-end space-x-3 sm:space-x-4 col-span-2 lg:col-span-1 mt-4 lg:mt-0">
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            toggleShortlist(job as any);
                          }}
                          className={cn(
                            "w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all",
                            isShortlisted(job.id) 
                              ? "bg-coral border-coral text-white" 
                              : "border-current group-hover:border-peach group-hover:text-peach"
                          )}
                        >
                          <Heart size={18} className="sm:w-5 sm:h-5" fill={isShortlisted(job.id) ? "currentColor" : "none"} />
                        </button>
                        <Link 
                          to={`/jobs/${job.id}`}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-peach group-hover:text-forest-teal transition-all"
                        >
                          <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!loading && jobs.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button className="px-12 py-5 border-2 border-teal-950 text-teal-950 rounded-full text-xs font-black uppercase tracking-widest hover:bg-teal-950 hover:text-peach transition-all">
                  Load More Opportunities
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobListings;
