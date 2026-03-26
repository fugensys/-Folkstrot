import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  Briefcase, 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight, 
  Plus,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../components/Navigation';
import { BackButton } from '../components/BackButton';

const MOCK_JOBS = [
  {
    id: '1',
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote',
    status: 'Active',
    applicants: 48,
    postedDate: 'Mar 10, 2026',
    type: 'Full-time'
  },
  {
    id: '2',
    title: 'Lead Frontend Engineer',
    department: 'Engineering',
    location: 'London, UK',
    status: 'Active',
    applicants: 32,
    postedDate: 'Mar 12, 2026',
    type: 'Full-time'
  },
  {
    id: '3',
    title: 'UX Researcher',
    department: 'Design',
    location: 'Hybrid',
    status: 'Draft',
    applicants: 0,
    postedDate: 'Mar 14, 2026',
    type: 'Contract'
  },
  {
    id: '4',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    status: 'Closed',
    applicants: 156,
    postedDate: 'Feb 20, 2026',
    type: 'Full-time'
  }
];

const JobManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-emerald-600 bg-emerald-50';
      case 'Draft': return 'text-teal-950/40 bg-teal-950/5';
      case 'Closed': return 'text-rose-600 bg-rose-50';
      default: return 'text-teal-950 bg-cream';
    }
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="employer" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <BackButton />
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-teal-950 tracking-tighter mb-2">
              Job <span className="text-coral">Management</span>
            </h1>
            <p className="text-teal-950/60 font-medium">
              Create, edit, and manage your active job postings.
            </p>
          </div>

          <button 
            onClick={() => navigate('/employer/post-job')}
            className="px-8 py-4 bg-forest-teal text-white rounded-2xl font-bold flex items-center shadow-lg shadow-teal-900/20 hover:bg-teal-900 transition-all"
          >
            <Plus size={20} className="mr-2" /> Post New Job
          </button>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
            <input 
              type="text" 
              placeholder="Search jobs by title or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-cream border-none rounded-xl text-sm focus:ring-2 ring-coral/20 outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={18} className="text-teal-950/30 mr-2" />
            {['All', 'Active', 'Draft', 'Closed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                  statusFilter === status 
                    ? "bg-forest-teal text-white" 
                    : "text-teal-950/40 hover:text-teal-950 hover:bg-cream"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="grid gap-4">
          {filteredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-peach/20 rounded-2xl flex items-center justify-center text-coral">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-teal-950">{job.title}</h3>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                        getStatusColor(job.status)
                      )}>
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-teal-950/40 font-medium">
                      <span>{job.department}</span>
                      <span className="w-1 h-1 bg-teal-950/10 rounded-full" />
                      <span>{job.location}</span>
                      <span className="w-1 h-1 bg-teal-950/10 rounded-full" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 lg:gap-12">
                  <div className="text-center">
                    <p className="text-2xl font-black text-teal-950">{job.applicants}</p>
                    <p className="text-[10px] font-black text-teal-950/30 uppercase tracking-widest">Applicants</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-bold text-teal-950">{job.postedDate}</p>
                    <p className="text-[10px] font-black text-teal-950/30 uppercase tracking-widest">Posted On</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => navigate(`/employer/jobs/${job.id}/applicants`)}
                      className="px-6 py-3 bg-cream text-teal-950 rounded-xl font-bold text-sm hover:bg-peach/20 transition-all flex items-center"
                    >
                      <Users size={16} className="mr-2" /> View Applicants
                    </button>
                    <button className="p-3 text-teal-950/20 hover:text-teal-950 transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[48px] border border-dashed border-teal-900/10 mt-8">
            <p className="text-teal-950/40 font-bold">No jobs found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default JobManagement;
