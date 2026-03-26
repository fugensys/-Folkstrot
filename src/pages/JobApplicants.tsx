import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  MoreVertical, 
  Star,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  User,
  ExternalLink,
  X,
  MapPin,
  Mail,
  Globe,
  Award,
  Briefcase
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../components/Navigation';
import { BackButton } from '../components/BackButton';

const MOCK_APPLICANTS = [
  {
    id: 'can1',
    name: 'Hannah Panizares',
    role: 'Senior Product Designer',
    experience: '8 years',
    location: 'Cebu, Philippines',
    status: 'Interviewed',
    appliedDate: 'Mar 12, 2026',
    score: 98,
    avatar: 'H',
    email: 'hannah.p@example.com',
    bio: 'Experienced Product Designer with a focus on B2B SaaS and design systems. Passionate about creating intuitive user experiences.',
    skills: ['Figma', 'React', 'Design Systems', 'UX Research'],
    education: 'BS in Information Technology, Cebu Institute of Technology'
  },
  {
    id: 'can2',
    name: 'John Doe',
    role: 'Senior Product Designer',
    experience: '6 years',
    location: 'London, UK',
    status: 'Shortlisted',
    appliedDate: 'Mar 13, 2026',
    score: 85,
    avatar: 'J',
    email: 'john.doe@example.com',
    bio: 'Product Designer specializing in mobile apps and consumer-facing platforms. 6 years of experience in agile environments.',
    skills: ['Sketch', 'Adobe XD', 'Prototyping', 'User Testing'],
    education: 'BA in Graphic Design, University of the Arts London'
  },
  {
    id: 'can3',
    name: 'Jane Smith',
    role: 'Senior Product Designer',
    experience: '10 years',
    location: 'San Francisco, CA',
    status: 'Scheduled',
    appliedDate: 'Mar 14, 2026',
    score: 92,
    avatar: 'S',
    email: 'jane.smith@example.com',
    bio: 'Design leader with a decade of experience building and scaling design teams in high-growth startups.',
    skills: ['Leadership', 'Strategy', 'Product Design', 'Figma'],
    education: 'MFA in Interaction Design, California College of the Arts'
  },
  {
    id: 'can4',
    name: 'Marcus Chen',
    role: 'Senior Product Designer',
    experience: '5 years',
    location: 'Singapore',
    status: 'Applied',
    appliedDate: 'Mar 15, 2026',
    score: 78,
    avatar: 'M',
    email: 'marcus.c@example.com',
    bio: 'UI/UX Designer with a strong background in visual design and motion graphics. Always looking for new challenges.',
    skills: ['After Effects', 'Figma', 'UI Design', 'Illustration'],
    education: 'BFA in Digital Media, National University of Singapore'
  },
  {
    id: 'can5',
    name: 'Elena Kostic',
    role: 'Senior Product Designer',
    experience: '7 years',
    location: 'Berlin, Germany',
    status: 'Hired',
    appliedDate: 'Mar 10, 2026',
    score: 95,
    avatar: 'E',
    email: 'elena.k@example.com',
    bio: 'Full-stack designer who loves to code. 7 years of experience bridging the gap between design and engineering.',
    skills: ['React', 'CSS', 'Figma', 'Product Strategy'],
    education: 'BS in Computer Science, University of Belgrade'
  }
];

const STATUS_OPTIONS = ['All', 'Applied', 'Shortlisted', 'Scheduled', 'Interviewed', 'Hired', 'Rejected'];

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const filteredApplicants = MOCK_APPLICANTS.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired': return 'text-emerald-600 bg-emerald-50';
      case 'Shortlisted': return 'text-coral bg-coral/5';
      case 'Scheduled': return 'text-blue-600 bg-blue-50';
      case 'Interviewed': return 'text-purple-600 bg-purple-50';
      case 'Rejected': return 'text-rose-600 bg-rose-50';
      default: return 'text-teal-950/40 bg-teal-950/5';
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Experience,Location,Status,Applied Date,Score\n"
      + filteredApplicants.map(e => `${e.name},${e.experience},${e.location},${e.status},${e.appliedDate},${e.score}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `applicants_job_${jobId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="employer" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <BackButton />
        <header className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-teal-950 tracking-tighter mb-2">
                Senior Product <span className="text-coral">Designer</span>
              </h1>
              <p className="text-teal-950/60 font-medium">
                Reviewing {filteredApplicants.length} applicants for this position.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={handleExport}
                className="px-6 py-3 bg-white text-teal-950 border border-teal-900/5 rounded-2xl font-bold text-sm flex items-center hover:bg-cream transition-all"
              >
                <Download size={18} className="mr-2" /> Export CSV
              </button>
              <button className="px-6 py-3 bg-forest-teal text-white rounded-2xl font-bold text-sm flex items-center hover:bg-teal-900 transition-all shadow-lg shadow-teal-900/20">
                <Filter size={18} className="mr-2" /> Advanced Filter
              </button>
            </div>
          </div>
        </header>

        {/* Search & Status Tabs */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
            <input 
              type="text" 
              placeholder="Search applicants by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-teal-900/5 rounded-xl text-sm focus:ring-2 ring-coral/20 outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap",
                  statusFilter === status 
                    ? "bg-forest-teal text-white" 
                    : "text-teal-950/40 hover:text-teal-950 hover:bg-white"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Applicants Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredApplicants.map((app, i) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-2xl group-hover:bg-peach transition-colors">
                      {app.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-bold text-teal-950">{app.name}</h3>
                        <div className="flex items-center text-coral">
                          <Star size={12} fill="currentColor" />
                          <span className="text-xs font-black ml-1">{app.score}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-teal-950/40 font-bold uppercase tracking-widest">
                        <span className="flex items-center"><User size={12} className="mr-1" /> {app.experience}</span>
                        <span className="w-1 h-1 bg-teal-950/10 rounded-full" />
                        <span className="flex items-center"><Clock size={12} className="mr-1" /> Applied {app.appliedDate}</span>
                        <span className="w-1 h-1 bg-teal-950/10 rounded-full" />
                        <span>{app.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                    <div className="flex flex-col items-end">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-2",
                        getStatusColor(app.status)
                      )}>
                        {app.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 text-teal-950/20 hover:text-emerald-500 transition-colors" title="Hire">
                          <CheckCircle2 size={20} />
                        </button>
                        <button className="p-2 text-teal-950/20 hover:text-rose-500 transition-colors" title="Reject">
                          <XCircle size={20} />
                        </button>
                        <button className="p-2 text-teal-950/20 hover:text-blue-500 transition-colors" title="Schedule Interview">
                          <Calendar size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => navigate('/employer/messages')}
                        className="px-6 py-3 bg-cream text-teal-950 rounded-xl font-bold text-sm hover:bg-peach/20 transition-all flex items-center"
                      >
                        <MessageSquare size={16} className="mr-2" /> Chat
                      </button>
                      <button 
                        onClick={() => setSelectedApplicant(app)}
                        className="px-6 py-3 bg-forest-teal text-white rounded-xl font-bold text-sm hover:bg-teal-900 transition-all flex items-center"
                      >
                        Profile <ExternalLink size={16} className="ml-2" />
                      </button>
                      <button className="p-3 text-teal-950/20 hover:text-teal-950 transition-colors">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredApplicants.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[48px] border border-dashed border-teal-900/10 mt-8">
            <p className="text-teal-950/40 font-bold">No applicants found matching your criteria.</p>
          </div>
        )}

        {/* Profile Modal */}
        <AnimatePresence>
          {selectedApplicant && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedApplicant(null)}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-cream w-full max-w-4xl max-h-[90vh] rounded-[48px] shadow-2xl overflow-hidden flex flex-col"
              >
                <button 
                  onClick={() => setSelectedApplicant(null)}
                  className="absolute top-8 right-8 p-3 bg-white text-teal-950 rounded-2xl shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <X size={24} />
                </button>

                <div className="overflow-y-auto p-12">
                  <div className="flex flex-col md:flex-row gap-10 mb-12">
                    <div className="w-32 h-32 bg-forest-teal rounded-[32px] flex items-center justify-center text-white text-5xl font-black shadow-xl">
                      {selectedApplicant.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="text-4xl font-black text-teal-950 tracking-tighter">{selectedApplicant.name}</h2>
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          getStatusColor(selectedApplicant.status)
                        )}>
                          {selectedApplicant.status}
                        </span>
                      </div>
                      <p className="text-xl text-teal-950/60 font-medium mb-6">{selectedApplicant.role}</p>
                      
                      <div className="flex flex-wrap gap-6 text-teal-950/40 font-bold text-xs uppercase tracking-widest">
                        <div className="flex items-center"><MapPin size={16} className="mr-2 text-coral" /> {selectedApplicant.location}</div>
                        <div className="flex items-center"><Mail size={16} className="mr-2 text-coral" /> {selectedApplicant.email}</div>
                        <div className="flex items-center"><User size={16} className="mr-2 text-coral" /> {selectedApplicant.experience} Exp</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-black text-teal-950 uppercase tracking-widest mb-4 flex items-center">
                          <Award size={20} className="mr-2 text-coral" /> About Candidate
                        </h3>
                        <p className="text-teal-950/60 leading-relaxed">
                          {selectedApplicant.bio}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-teal-950 uppercase tracking-widest mb-4 flex items-center">
                          <Briefcase size={20} className="mr-2 text-coral" /> Education
                        </h3>
                        <p className="text-teal-950/60 leading-relaxed">
                          {selectedApplicant.education}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-black text-teal-950 uppercase tracking-widest mb-4 flex items-center">
                          <Star size={20} className="mr-2 text-coral" /> Top Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedApplicant.skills.map((skill: string) => (
                            <span key={skill} className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-teal-950 border border-teal-900/5">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 bg-forest-teal rounded-[32px] text-white">
                        <h3 className="text-lg font-bold mb-4">AI Matching Score</h3>
                        <div className="flex items-center gap-6">
                          <div className="text-5xl font-black text-peach">{selectedApplicant.score}%</div>
                          <p className="text-sm text-white/60 leading-relaxed">
                            High compatibility based on technical skills and industry experience.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 pt-12 border-t border-teal-900/5 flex justify-end gap-4">
                    <button 
                      onClick={() => navigate('/employer/messages')}
                      className="px-10 py-4 bg-white text-teal-950 rounded-2xl font-bold hover:bg-peach/20 transition-all flex items-center"
                    >
                      <MessageSquare size={20} className="mr-2" /> Start Chat
                    </button>
                    <button className="px-10 py-4 bg-forest-teal text-white rounded-2xl font-bold hover:bg-teal-900 transition-all shadow-xl shadow-teal-900/20">
                      Activate Profile
                    </button>
                    <button className="px-10 py-4 bg-coral text-white rounded-2xl font-bold hover:bg-teal-950 transition-all shadow-xl shadow-coral/20">
                      Schedule Interview
                    </button>
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

export default JobApplicants;
