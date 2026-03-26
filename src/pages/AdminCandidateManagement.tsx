import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  User, 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  Ban, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  Mail,
  Briefcase,
  MapPin,
  X,
  Trash2,
  Calendar,
  Award,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/supabaseService';

const AdminCandidateManagement = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const data = await adminService.getAllCandidates();
        setCandidates(data.map(p => ({
          id: p.id,
          name: p.full_name || p.email,
          role: p.headline || 'N/A',
          status: p.status === 'active' ? 'Active' : 'Blocked',
          email: p.email,
          location: p.location || 'N/A',
          experience: p.experience_years ? `${p.experience_years} years` : 'N/A',
          joined: new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          bio: p.bio || 'No bio provided.',
          skills: p.skills || []
        })));
      } catch (error: any) {
        console.error('Error fetching candidates:', error);
        if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
          console.warn('Database connection is currently unavailable. Using mock data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const filteredCandidates = candidates.filter(can => {
    const matchesSearch = can.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         can.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || can.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const toggleBlockStatus = async (id: string) => {
    const candidate = candidates.find(c => c.id === id);
    if (!candidate) return;

    try {
      if (candidate.status === 'Blocked') {
        await adminService.approveEmployer(id); // Using same function for profiles
      } else {
        await adminService.rejectEmployer(id); // Using same function for profiles
      }
      
      setCandidates(prev => prev.map(can => {
        if (can.id === id) {
          return { ...can, status: can.status === 'Blocked' ? 'Active' : 'Blocked' };
        }
        return can;
      }));
    } catch (error: any) {
      console.error('Error toggling block status:', error);
      let errorMessage = 'Failed to update candidate status.';
      if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
        errorMessage = 'Database connection is currently unavailable. Please try again later.';
      }
      alert(errorMessage);
    }
  };

  const handleDeleteCandidate = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this candidate? This action cannot be undone.')) return;
    
    try {
      await adminService.deleteCandidate(id);
      setCandidates(prev => prev.filter(can => can.id !== id));
      setSelectedCandidate(null);
    } catch (error: any) {
      console.error('Error deleting candidate:', error);
      let errorMessage = 'Failed to delete candidate.';
      if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
        errorMessage = 'Database connection is currently unavailable. Please try again later.';
      }
      alert(errorMessage);
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Email,Role,Status,Joined\n"
      + filteredCandidates.map(e => `${e.name},${e.email},${e.role},${e.status},${e.joined}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates_database.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="micro-label text-coral mb-4 block">Management</span>
            <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              Candidate <br />
              <span className="text-coral italic font-serif lowercase">Database</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-xs font-black uppercase tracking-widest text-teal-950 hover:bg-peach/20 transition-all"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-950/20" size={20} />
            <input 
              type="text" 
              placeholder="Search by candidate name or email..." 
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
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[48px] border border-teal-900/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream/30">
                  <th className="px-10 py-6 micro-label text-teal-950/40">Candidate Details</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Role & Experience</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Joined Date</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Status</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-900/5">
                {filteredCandidates.map((can) => (
                  <tr key={can.id} className="hover:bg-forest-teal group transition-all">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-xl group-hover:bg-peach transition-colors">
                          {can.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-white transition-colors">{can.name}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-[10px] font-bold text-teal-950/40 group-hover:text-white/40 flex items-center">
                              <Mail size={10} className="mr-1" /> {can.email}
                            </span>
                            <span className="text-[10px] font-bold text-teal-950/40 group-hover:text-white/40 flex items-center">
                              <MapPin size={10} className="mr-1" /> {can.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="text-xs font-bold text-teal-950 group-hover:text-white transition-colors">{can.role}</p>
                      <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-widest mt-1 group-hover:text-peach transition-colors">{can.experience} Exp</p>
                    </td>
                    <td className="px-10 py-8">
                      <p className="data-value text-xs text-teal-950 group-hover:text-white transition-colors">{can.joined}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                        can.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' : 
                        'bg-rose-500/10 text-rose-600 group-hover:bg-rose-500 group-hover:text-white'
                      )}>
                        {can.status}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedCandidate(can)}
                          className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach transition-all" 
                          title="View Profile"
                        >
                          <ExternalLink size={16} />
                        </button>
                        {can.status !== 'Blocked' ? (
                          <button 
                            onClick={() => toggleBlockStatus(can.id)}
                            className="p-3 bg-rose-500/10 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all" 
                            title="Block Candidate"
                          >
                            <Ban size={16} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => toggleBlockStatus(can.id)}
                            className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all" 
                            title="Unblock Candidate"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDeleteCandidate(can.id)}
                          className="p-3 bg-rose-500/10 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                          title="Delete Candidate"
                        >
                          <Trash2 size={16} />
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

        {/* View Profile Modal */}
        <AnimatePresence>
          {selectedCandidate && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCandidate(null)}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-cream w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setSelectedCandidate(null)}
                  className="absolute top-8 right-8 p-3 bg-white text-teal-950 rounded-2xl shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <X size={24} />
                </button>

                <div className="p-12">
                  <div className="flex items-center space-x-8 mb-10">
                    <div className="w-24 h-24 bg-forest-teal rounded-[32px] flex items-center justify-center text-white text-4xl font-black shadow-xl">
                      {selectedCandidate.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center space-x-4 mb-2">
                        <h2 className="text-4xl font-black text-teal-950 tracking-tighter uppercase">{selectedCandidate.name}</h2>
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest",
                          selectedCandidate.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                        )}>
                          {selectedCandidate.status}
                        </span>
                      </div>
                      <p className="text-xl text-teal-950/60 font-medium">{selectedCandidate.role} • {selectedCandidate.experience} Experience</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-10">
                    <div className="p-6 bg-white rounded-3xl border border-teal-900/5">
                      <p className="micro-label text-coral mb-2">Contact Information</p>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm font-bold text-teal-950">
                          <Mail size={16} className="mr-3 text-teal-950/20" /> {selectedCandidate.email}
                        </div>
                        <div className="flex items-center text-sm font-bold text-teal-950">
                          <MapPin size={16} className="mr-3 text-teal-950/20" /> {selectedCandidate.location}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white rounded-3xl border border-teal-900/5">
                      <p className="micro-label text-coral mb-2">Platform Details</p>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm font-bold text-teal-950">
                          <Calendar size={16} className="mr-3 text-teal-950/20" /> Joined {selectedCandidate.joined}
                        </div>
                        <div className="flex items-center text-sm font-bold text-teal-950">
                          <Star size={16} className="mr-3 text-teal-950/20" /> Verified Talent
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="micro-label text-coral mb-4">Candidate Bio</p>
                    <p className="text-teal-950/60 leading-relaxed font-medium">
                      {selectedCandidate.bio}
                    </p>
                  </div>

                  <div className="mb-10">
                    <p className="micro-label text-coral mb-4">Top Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill: string) => (
                        <span key={skill} className="px-4 py-2 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest text-teal-950 border border-teal-900/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => toggleBlockStatus(selectedCandidate.id)}
                      className={cn(
                        "flex-1 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center",
                        selectedCandidate.status === 'Blocked' 
                          ? "bg-emerald-500 text-white hover:bg-emerald-600" 
                          : "bg-rose-500 text-white hover:bg-rose-600"
                      )}
                    >
                      {selectedCandidate.status === 'Blocked' ? (
                        <><CheckCircle2 size={18} className="mr-2" /> Unblock Account</>
                      ) : (
                        <><Ban size={18} className="mr-2" /> Block Account</>
                      )}
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminCandidateManagement;
