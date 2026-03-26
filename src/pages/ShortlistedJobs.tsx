import React from 'react';
import { motion } from 'motion/react';
import { Sidebar, MobileNav } from '../components/Navigation';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Trash2, 
  ChevronRight,
  Search,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../components/Navigation';
import { useShortlist } from '../context/ShortlistContext';
import { Link } from 'react-router-dom';

const ShortlistedJobs = () => {
  const { shortlistedJobs, toggleShortlist } = useShortlist();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredJobs = shortlistedJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="candidate" />
      <MobileNav role="candidate" />
      
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
        <div className="max-w-5xl mx-auto p-6 lg:p-12">
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-coral/10 rounded-full mb-4">
                <Sparkles size={14} className="text-coral" />
                <span className="text-[10px] font-black uppercase tracking-widest text-coral">Saved Opportunities</span>
              </div>
              <h1 className="text-5xl font-black text-teal-950 tracking-tighter leading-none uppercase">
                Shortlisted <br />
                <span className="text-coral italic font-serif lowercase">Jobs</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
                <input 
                  type="text" 
                  placeholder="Search saved jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white border border-teal-900/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all shadow-sm"
                />
              </div>
            </div>
          </header>

          {filteredJobs.length > 0 ? (
            <div className="grid gap-4">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm hover:shadow-2xl hover:shadow-teal-900/5 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-forest-teal rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-teal-900/20 flex-shrink-0">
                        {job.company[0]}
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl font-black text-teal-950 group-hover:text-coral transition-colors truncate uppercase tracking-tight">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 bg-peach/30 text-forest-teal text-[10px] font-black uppercase tracking-widest rounded-full whitespace-nowrap">
                            {job.type}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-teal-950/50 text-xs font-bold uppercase tracking-wider">
                          <span className="flex items-center">
                            <Briefcase size={14} className="mr-1.5 text-coral" /> {job.company}
                          </span>
                          <span className="flex items-center">
                            <MapPin size={14} className="mr-1.5 text-coral" /> {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign size={14} className="mr-1.5 text-coral" /> {job.salary}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-teal-950/5">
                      <button 
                        onClick={() => toggleShortlist(job)}
                        className="p-4 text-teal-950/30 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group/trash"
                        title="Remove from shortlist"
                      >
                        <Trash2 size={20} className="group-hover/trash:scale-110 transition-transform" />
                      </button>
                      <Link 
                        to={`/jobs/${job.id}`}
                        className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-8 py-4 bg-teal-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-coral transition-all shadow-xl shadow-teal-950/10 hover:-translate-y-1"
                      >
                        <span>Apply Now</span>
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[48px] p-16 md:p-24 text-center border border-dashed border-teal-900/20 shadow-inner">
              <div className="w-24 h-24 bg-cream rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-3">
                <Briefcase size={40} className="text-teal-950/20" />
              </div>
              <h3 className="text-3xl font-black text-teal-950 uppercase tracking-tight mb-4">No saved jobs yet</h3>
              <p className="text-teal-950/50 max-w-sm mx-auto mb-10 font-medium leading-relaxed">
                Explore thousands of opportunities and save the ones that match your career goals.
              </p>
              <Link 
                to="/jobs"
                className="inline-flex items-center space-x-3 px-10 py-5 bg-teal-950 text-white rounded-full font-black uppercase tracking-widest hover:bg-coral transition-all shadow-2xl shadow-teal-950/20"
              >
                <span>Browse All Jobs</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          )}

          {/* AI Recommendation Section */}
          <section className="mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-3xl font-black text-teal-950 uppercase tracking-tight">Recommended <span className="text-coral italic font-serif lowercase">for you</span></h2>
                <p className="text-teal-950/40 text-sm font-bold uppercase tracking-widest mt-1">Based on your saved preferences</p>
              </div>
              <button className="text-coral font-black text-xs uppercase tracking-widest hover:underline flex items-center">
                View All <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-forest-teal p-10 rounded-[48px] text-white relative overflow-hidden group cursor-pointer shadow-2xl shadow-teal-900/20"
              >
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 text-peach text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    <Sparkles size={14} />
                    <span>99% Match Score</span>
                  </div>
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tight leading-none">Principal <br />UX Designer</h3>
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest mb-8">Quantum Leap • Remote • $190k - $220k</p>
                  <button className="w-full sm:w-auto px-8 py-4 bg-peach text-forest-teal rounded-2xl text-xs font-black uppercase tracking-widest group-hover:bg-white transition-all shadow-lg shadow-black/10">
                    Quick Apply
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-coral/20 rounded-full blur-3xl -mr-24 -mt-24 group-hover:bg-coral/40 transition-all duration-700" />
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm group cursor-pointer hover:border-coral/20 transition-all hover:shadow-2xl hover:shadow-teal-900/5"
              >
                <div className="flex items-center space-x-2 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  <Sparkles size={14} />
                  <span>95% Match Score</span>
                </div>
                <h3 className="text-3xl font-black text-teal-950 mb-2 uppercase tracking-tight leading-none">Senior Design <br />Systems Lead</h3>
                <p className="text-teal-950/40 text-sm font-bold uppercase tracking-widest mb-8">NeuralPath AI • Hybrid • $160k - $190k</p>
                <button className="w-full sm:w-auto px-8 py-4 bg-cream text-teal-950 rounded-2xl text-xs font-black uppercase tracking-widest group-hover:bg-peach/20 transition-all border border-teal-950/5">
                  View Details
                </button>
              </motion.div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ShortlistedJobs;
