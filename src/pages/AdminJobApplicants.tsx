import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  Star, 
  ChevronLeft,
  MoreVertical,
  CheckCircle2,
  Clock,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const AdminJobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Alex Rivera', role: 'Senior Designer', status: 'Shortlisted', score: '98%', applied: '2h ago', email: 'alex@rivera.design' },
    { id: 2, name: 'Jordan Smith', role: 'Product Manager', status: 'Interviewing', score: '85%', applied: '4h ago', email: 'jordan@smith.com' },
    { id: 3, name: 'Elena Kostic', role: 'Frontend Dev', status: 'Scheduled', score: '92%', applied: '6h ago', email: 'elena@kostic.io' },
    { id: 4, name: 'Marcus Chen', role: 'UX Researcher', status: 'Applied', score: '78%', applied: '1d ago', email: 'marcus@chen.ux' },
    { id: 5, name: 'Sarah Jenkins', role: 'Product Designer', status: 'Hired', score: '95%', applied: '3d ago', email: 'sarah@jenkins.com' },
  ]);

  const statuses = ['Applied', 'Shortlisted', 'Interviewing', 'Scheduled', 'Hired', 'Rejected'];

  const handleStatusChange = (id: number, newStatus: string) => {
    setApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const handleChat = (id: number) => {
    navigate('/admin/messages');
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    alert('Exporting applicants for Job #' + jobId + ' to CSV...');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <BackButton />
        <header className="mb-12">
          <div className="flex justify-between items-end">
            <div>
              <span className="micro-label text-coral mb-4 block">Applicant Tracking</span>
              <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
                Talent <br />
                <span className="text-coral italic font-serif lowercase">Pipeline</span>
              </h1>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-xs font-black uppercase tracking-widest text-teal-950 hover:bg-peach/20 transition-all"
            >
              <Download size={16} />
              <span>Export Applicants</span>
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
              <option value="all">All Stages</option>
              {statuses.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[48px] border border-teal-900/5 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream/30">
                  <th className="px-10 py-6 micro-label text-teal-950/40">Candidate</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Match Score</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Applied</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Tracking Status</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-900/5">
                {filteredApplicants.map((app) => (
                  <tr key={app.id} className="hover:bg-forest-teal group transition-all">
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-lg group-hover:bg-peach transition-colors">
                          {app.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-white transition-colors">{app.name}</p>
                          <p className="text-[10px] font-bold text-teal-950/40 group-hover:text-white/40 uppercase tracking-widest">{app.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 h-1.5 bg-teal-900/5 rounded-full overflow-hidden group-hover:bg-white/10 transition-colors">
                          <div className="h-full bg-peach" style={{ width: app.score }} />
                        </div>
                        <span className="data-value text-[10px] text-teal-950 group-hover:text-peach transition-colors">{app.score}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <p className="data-value text-[10px] opacity-40 group-hover:text-peach transition-colors">{app.applied}</p>
                    </td>
                    <td className="px-10 py-8">
                      <select 
                        value={app.status.toLowerCase()}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="px-4 py-2 bg-cream border-none rounded-xl text-[9px] font-black uppercase tracking-widest text-teal-950 outline-none focus:ring-2 ring-coral/20 appearance-none cursor-pointer group-hover:bg-white/10 group-hover:text-white"
                      >
                        {statuses.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleChat(app.id)}
                          className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach transition-all" 
                          title="Chat with Applicant"
                        >
                          <MessageSquare size={16} />
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
      </main>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminJobApplicants;
