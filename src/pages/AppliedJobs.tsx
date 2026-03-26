import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sidebar, MobileNav } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Timer,
  MessageSquare,
  FileSearch,
  Search,
  Filter
} from 'lucide-react';
import { cn } from '../components/Navigation';

const APPLIED_JOBS = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'Nexus Corp',
    location: 'San Francisco, CA',
    appliedDate: 'Mar 12, 2026',
    status: 'Interviewing',
    statusColor: 'text-blue-600 bg-blue-50',
    progress: 60,
    nextStep: 'Technical Interview on Mar 18',
    logo: 'N'
  },
  {
    id: '2',
    title: 'Lead Frontend Engineer',
    company: 'Skyline B2B',
    location: 'Remote',
    appliedDate: 'Mar 10, 2026',
    status: 'Pending',
    statusColor: 'text-amber-600 bg-amber-50',
    progress: 20,
    nextStep: 'Resume Screening',
    logo: 'S'
  },
  {
    id: '3',
    title: 'UX Researcher',
    company: 'Vortex Inc',
    location: 'New York, NY',
    appliedDate: 'Mar 05, 2026',
    status: 'Offered',
    statusColor: 'text-emerald-600 bg-emerald-50',
    progress: 100,
    nextStep: 'Review Offer Letter',
    logo: 'V'
  },
  {
    id: '4',
    title: 'Product Manager',
    company: 'Global Tech',
    location: 'Austin, TX',
    appliedDate: 'Feb 28, 2026',
    status: 'Rejected',
    statusColor: 'text-rose-600 bg-rose-50',
    progress: 100,
    nextStep: 'Application Closed',
    logo: 'G'
  }
];

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredJobs = APPLIED_JOBS.filter(job => {
    const matchesFilter = filter === 'All' || job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="candidate" />
      <MobileNav role="candidate" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <BackButton />
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-teal-950 tracking-tighter mb-2">
              My <span className="text-coral">Applications</span>
            </h1>
            <p className="text-teal-950/60 font-medium">
              Track your progress and manage your active job applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
              <input 
                type="text" 
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-teal-900/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all w-64 shadow-sm"
              />
            </div>
            
            <div className="flex bg-white p-1 rounded-2xl border border-teal-900/10 shadow-sm">
              {['All', 'Pending', 'Interviewing', 'Offered'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    filter === f 
                      ? "bg-forest-teal text-white shadow-lg shadow-teal-900/20" 
                      : "text-teal-950/40 hover:text-teal-950 hover:bg-teal-950/5"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[32px] border border-teal-900/5 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all overflow-hidden"
              >
                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-forest-teal rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-teal-900/20 shrink-0">
                      {job.logo}
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-xl font-bold text-teal-950">
                          {job.title}
                        </h3>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          job.statusColor
                        )}>
                          {job.status}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-teal-950/50 text-sm font-medium">
                        <span className="flex items-center">
                          <Briefcase size={14} className="mr-1.5 text-coral" /> {job.company}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={14} className="mr-1.5 text-coral" /> {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1.5 text-coral" /> Applied {job.appliedDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-12">
                    <div className="w-full sm:w-48">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black text-teal-950/30 uppercase tracking-widest">Progress</span>
                        <span className="text-xs font-bold text-teal-950">{job.progress}%</span>
                      </div>
                      <div className="h-2 bg-teal-950/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={cn(
                            "h-full rounded-full",
                            job.status === 'Rejected' ? 'bg-rose-500' : 'bg-forest-teal'
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="flex items-center space-x-2 px-6 py-3 bg-forest-teal text-white rounded-2xl font-bold text-sm hover:bg-teal-900 transition-all shadow-lg shadow-teal-900/10"
                      >
                        <span>View Details</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-teal-950/[0.02] px-6 py-4 border-t border-teal-900/5 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {job.status === 'Interviewing' && <Timer size={14} className="text-blue-600" />}
                    {job.status === 'Pending' && <FileSearch size={14} className="text-amber-600" />}
                    {job.status === 'Offered' && <CheckCircle2 size={14} className="text-emerald-600" />}
                    {job.status === 'Rejected' && <AlertCircle size={14} className="text-rose-600" />}
                    <span className="text-xs font-bold text-teal-950/70">
                      Next Step: <span className="text-teal-950">{job.nextStep}</span>
                    </span>
                  </div>
                  
                  <button className="text-[10px] font-black text-teal-950/30 uppercase tracking-widest hover:text-coral transition-colors">
                    Withdraw Application
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-[48px] p-20 text-center border border-dashed border-teal-900/20">
              <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
                <FileSearch size={32} className="text-teal-950/20" />
              </div>
              <h3 className="text-2xl font-bold text-teal-950 mb-2">No applications found</h3>
              <p className="text-teal-950/50 max-w-md mx-auto mb-8">
                You haven't applied to any jobs that match your current filters. Start your career journey today!
              </p>
              <button className="px-8 py-4 bg-forest-teal text-white rounded-full font-bold hover:bg-teal-900 transition-all">
                Browse Jobs
              </button>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
              <Timer size={24} />
            </div>
            <div className="text-3xl font-black text-teal-950 mb-1">12</div>
            <div className="text-sm font-bold text-teal-950/40 uppercase tracking-widest">Active Applications</div>
          </div>
          
          <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle2 size={24} />
            </div>
            <div className="text-3xl font-black text-teal-950 mb-1">3</div>
            <div className="text-sm font-bold text-teal-950/40 uppercase tracking-widest">Interviews Scheduled</div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
            <div className="w-12 h-12 bg-peach/30 rounded-2xl flex items-center justify-center text-forest-teal mb-4">
              <MessageSquare size={24} />
            </div>
            <div className="text-3xl font-black text-teal-950 mb-1">5</div>
            <div className="text-sm font-bold text-teal-950/40 uppercase tracking-widest">New Messages</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppliedJobs;
