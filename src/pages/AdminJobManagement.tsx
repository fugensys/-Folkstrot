import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  CheckCircle2, 
  XCircle,
  Users,
  Building2,
  MapPin,
  Clock,
  Eye,
  X,
  Calendar,
  DollarSign,
  Globe,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminJobManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Senior Product Designer', company: 'TechFlow Systems', location: 'Remote', type: 'Full-time', status: 'Active', applicants: 128, posted: '2d ago', description: 'We are looking for a senior product designer to lead our design team and help us build the next generation of cloud-based enterprise solutions.', salary: '$120k - $160k', requirements: ['8+ years experience', 'Figma expert', 'Design systems'] },
    { id: 2, title: 'Frontend Engineer', company: 'NeuralPath AI', location: 'San Francisco', type: 'Contract', status: 'Active', applicants: 45, posted: '5h ago', description: 'Join our team of AI researchers and engineers to build high-performance frontend applications for healthcare.', salary: '$80 - $120 / hr', requirements: ['React', 'TypeScript', 'Tailwind'] },
    { id: 3, title: 'B2B Sales Lead', company: 'Skyline B2B', location: 'New York', type: 'Full-time', status: 'Paused', applicants: 82, posted: '1w ago', description: 'Drive growth and expand our market presence in the logistics and supply chain management sector.', salary: '$100k + Commission', requirements: ['Sales strategy', 'CRM', 'B2B experience'] },
    { id: 4, title: 'DevOps Architect', company: 'Nexus Corp', location: 'Remote', type: 'Full-time', status: 'Closed', applicants: 15, posted: '2w ago', description: 'Design and implement scalable infrastructure for our enterprise-grade cybersecurity platform.', salary: '$150k - $200k', requirements: ['AWS', 'Kubernetes', 'CI/CD'] },
    { id: 5, title: 'Product Manager', company: 'Quantum Leap', location: 'London', type: 'Full-time', status: 'Active', applicants: 210, posted: '3d ago', description: 'Lead the product strategy for our cross-border payments platform using blockchain technology.', salary: '£90k - £130k', requirements: ['Product roadmap', 'Agile', 'Fintech background'] },
  ]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const toggleJobStatus = (id: number, newStatus: string) => {
    setJobs(prev => prev.map(job => {
      if (job.id === id) {
        return { ...job, status: newStatus };
      }
      return job;
    }));
    if (selectedJob && selectedJob.id === id) {
      setSelectedJob({ ...selectedJob, status: newStatus });
    }
  };

  const handleDeleteJob = (id: number) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    setSelectedJob(null);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Title,Company,Location,Type,Status,Applicants,Posted\n"
      + filteredJobs.map(j => `${j.title},${j.company},${j.location},${j.type},${j.status},${j.applicants},${j.posted}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_postings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <BackButton />
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="micro-label text-coral mb-4 block">Management</span>
            <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              Job <br />
              <span className="text-coral italic font-serif lowercase">Postings</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-xs font-black uppercase tracking-widest text-teal-950 hover:bg-peach/20 transition-all"
            >
              <Download size={16} />
              <span>Export Jobs</span>
            </button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-950/20" size={20} />
            <input 
              type="text" 
              placeholder="Search by job title or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-teal-950/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">Status:</span>
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 bg-cream border-none rounded-2xl text-sm font-black uppercase tracking-widest text-teal-950 outline-none focus:ring-2 ring-coral/20 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[48px] border border-teal-900/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream/30">
                  <th className="px-10 py-6 micro-label text-teal-950/40">Job Opportunity</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Company</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Applicants</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Status</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-900/5">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-forest-teal group transition-all">
                    <td className="px-10 py-8">
                      <div>
                        <p className="text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-white transition-colors">{job.title}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-[10px] font-bold text-teal-950/40 group-hover:text-white/40 flex items-center">
                            <MapPin size={10} className="mr-1" /> {job.location}
                          </span>
                          <span className="text-[10px] font-bold text-teal-950/40 group-hover:text-white/40 flex items-center">
                            <Clock size={10} className="mr-1" /> {job.posted}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-forest-teal font-black group-hover:bg-peach transition-colors">
                          {job.company[0]}
                        </div>
                        <span className="text-xs font-bold text-teal-950 group-hover:text-white transition-colors">{job.company}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <Link 
                        to={`/admin/jobs/${job.id}/applicants`}
                        className="flex items-center space-x-2 px-4 py-2 bg-cream text-teal-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-peach transition-all group-hover:bg-white/10 group-hover:text-white"
                      >
                        <Users size={14} />
                        <span>{job.applicants} Applicants</span>
                      </Link>
                    </td>
                    <td className="px-10 py-8">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                        job.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' : 
                        job.status === 'Paused' ? 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' :
                        'bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white'
                      )}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedJob(job)}
                          className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach transition-all" 
                          title="View Job"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Job Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedJob(null)}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-cream w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-8 right-8 p-3 bg-white text-teal-950 rounded-2xl shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <X size={24} />
                </button>

                <div className="p-12">
                  <div className="flex items-center space-x-8 mb-10">
                    <div className="w-24 h-24 bg-forest-teal rounded-[32px] flex items-center justify-center text-white text-4xl font-black shadow-xl">
                      {selectedJob.company[0]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-4 mb-2">
                        <h2 className="text-4xl font-black text-teal-950 tracking-tighter uppercase">{selectedJob.title}</h2>
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          selectedJob.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 
                          selectedJob.status === 'Paused' ? 'bg-amber-500/10 text-amber-600' :
                          'bg-rose-500/10 text-rose-600'
                        )}>
                          {selectedJob.status}
                        </span>
                      </div>
                      <p className="text-xl text-teal-950/60 font-medium">{selectedJob.company} • {selectedJob.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="p-6 bg-white rounded-3xl border border-teal-900/5">
                      <p className="micro-label text-coral mb-2">Job Type</p>
                      <div className="flex items-center text-sm font-bold text-teal-950">
                        <Briefcase size={16} className="mr-3 text-teal-950/20" /> {selectedJob.type}
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-teal-900/5">
                      <p className="micro-label text-coral mb-2">Salary Range</p>
                      <div className="flex items-center text-sm font-bold text-teal-950">
                        <DollarSign size={16} className="mr-3 text-teal-950/20" /> {selectedJob.salary}
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-teal-900/5">
                      <p className="micro-label text-coral mb-2">Posted</p>
                      <div className="flex items-center text-sm font-bold text-teal-950">
                        <Clock size={16} className="mr-3 text-teal-950/20" /> {selectedJob.posted}
                      </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="micro-label text-coral mb-4">Job Description</p>
                    <p className="text-teal-950/60 leading-relaxed font-medium">
                      {selectedJob.description}
                    </p>
                  </div>

                  <div className="mb-10">
                    <p className="micro-label text-coral mb-4">Key Requirements</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.requirements.map((req: string) => (
                        <span key={req} className="px-4 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-teal-950 border border-teal-900/5">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link 
                      to={`/admin/jobs/${selectedJob.id}/applicants`}
                      className="flex-1 py-5 bg-forest-teal text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all flex items-center justify-center shadow-xl shadow-teal-900/20"
                    >
                      <Users size={18} className="mr-2" /> View {selectedJob.applicants} Applicants
                    </Link>
                    <div className="flex space-x-2">
                      {selectedJob.status === 'Active' ? (
                        <button 
                          onClick={() => toggleJobStatus(selectedJob.id, 'Paused')}
                          className="px-8 py-5 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-600 transition-all flex items-center justify-center"
                        >
                          <Clock size={18} className="mr-2" /> Pause
                        </button>
                      ) : (
                        <button 
                          onClick={() => toggleJobStatus(selectedJob.id, 'Active')}
                          className="px-8 py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all flex items-center justify-center"
                        >
                          <CheckCircle2 size={18} className="mr-2" /> Activate
                        </button>
                      )}
                      <button 
                        onClick={() => toggleJobStatus(selectedJob.id, 'Closed')}
                        className="px-8 py-5 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-600 transition-all flex items-center justify-center"
                      >
                        <XCircle size={18} className="mr-2" /> Close
                      </button>
                      <button 
                        onClick={() => handleDeleteJob(selectedJob.id)}
                        className="p-5 bg-rose-500/10 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all flex items-center justify-center"
                        title="Delete Job"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminJobManagement;
