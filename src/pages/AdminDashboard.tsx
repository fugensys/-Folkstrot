import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  Users, 
  Building2, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  MoreVertical,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/supabaseService';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const COLORS = ['#0a2e2e', '#ff7f50', '#ffdab9'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([
    { label: 'Employers', value: '0', icon: Building2, trend: '+0%', color: 'bg-forest-teal' },
    { label: 'Candidates', value: '0', icon: Users, trend: '+0%', color: 'bg-coral' },
    { label: 'Jobs Posted', value: '0', icon: Briefcase, trend: '+0%', color: 'bg-peach' },
    { label: 'Revenue', value: '$0', icon: TrendingUp, trend: '+0%', color: 'bg-emerald-500' }
  ]);

  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);

  const [recentInquiries, setRecentInquiries] = useState([
    { id: 1, name: 'TechFlow Systems', plan: 'Enterprise', msg: 'Interested in scaling our hiring...', date: '1h ago' },
    { id: 2, name: 'NeuralPath AI', plan: 'Premium', msg: 'Looking for AI matching features...', date: '3h ago' }
  ]);

  const [pieData, setPieData] = useState([
    { name: 'Free', value: 400 },
    { name: 'Premium', value: 300 },
    { name: 'Enterprise', value: 100 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, pendingData] = await Promise.all([
          adminService.getStats(),
          adminService.getPendingEmployers()
        ]);

        setStats([
          { label: 'Employers', value: statsData.employers.toLocaleString(), icon: Building2, trend: '+12%', color: 'bg-forest-teal' },
          { label: 'Candidates', value: statsData.candidates.toLocaleString(), icon: Users, trend: '+24%', color: 'bg-coral' },
          { label: 'Jobs Posted', value: statsData.jobs.toLocaleString(), icon: Briefcase, trend: '+8%', color: 'bg-peach' },
          { label: 'Revenue', value: `$${statsData.revenue}k`, icon: TrendingUp, trend: '+15%', color: 'bg-emerald-500' }
        ]);

        setPendingApprovals(pendingData.map(p => ({
          id: p.id,
          name: p.full_name || p.email,
          plan: p.plan || 'Free',
          status: 'Pending',
          logo: (p.full_name || p.email)[0].toUpperCase()
        })));

      } catch (error: any) {
        console.error('Error fetching admin data:', error);
        if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
          console.warn('Database connection is currently unavailable. Using mock data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await adminService.approveEmployer(id);
      setPendingApprovals(prev => prev.filter(item => item.id !== id));
      alert('Company approved successfully!');
    } catch (error: any) {
      console.error('Error approving employer:', error);
      if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
        alert('Database connection is currently unavailable. Please try again later.');
      } else {
        alert('Failed to approve company.');
      }
    }
  };

  const handleReject = async (id: string) => {
    try {
      await adminService.rejectEmployer(id);
      setPendingApprovals(prev => prev.filter(item => item.id !== id));
      alert('Company rejected.');
    } catch (error: any) {
      console.error('Error rejecting employer:', error);
      if (error.message === 'Failed to fetch' || error.message?.includes('fetch')) {
        alert('Database connection is currently unavailable. Please try again later.');
      } else {
        alert('Failed to reject company.');
      }
    }
  };

  const handleProcessAll = () => {
    setPendingApprovals([]);
    alert('All pending approvals processed.');
  };

  const handleReply = (id: number) => {
    navigate('/admin/inquiries');
  };

  const handleViewCompany = (id: string) => {
    navigate('/admin/employers');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-16">
          <div>
            <span className="micro-label text-coral mb-4 block">System Authority</span>
            <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              Command <br />
              <span className="text-coral italic font-serif lowercase">Center</span>
            </h1>
          </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={handleLogout}
                className="w-12 h-12 bg-white border border-teal-900/5 rounded-2xl flex items-center justify-center text-teal-950/40 hover:text-coral hover:shadow-lg transition-all"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
              <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/30" size={18} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-12 pr-6 py-4 bg-white border border-teal-900/5 rounded-2xl outline-none focus:ring-2 ring-coral/20 transition-all w-80 text-sm font-bold"
              />
            </div>
            <div className="w-16 h-16 bg-forest-teal rounded-[24px] flex items-center justify-center text-peach">
              <ShieldCheck size={32} />
            </div>
          </div>
        </header>

        {/* Stats Grid - Technical Style */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm group hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.color)}>
                  <stat.icon className="text-white" size={20} />
                </div>
                <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">{stat.trend}</span>
              </div>
              <p className="text-4xl font-black tracking-tighter text-teal-950 mb-1">{stat.value}</p>
              <p className="micro-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          {/* Main Table - Technical Data Grid */}
          <div className="lg:col-span-8 bg-white rounded-[60px] border border-teal-900/5 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-teal-900/5 flex justify-between items-end">
              <div>
                <span className="micro-label text-coral mb-2 block">Verification Queue</span>
                <h3 className="text-3xl font-black tracking-tighter text-teal-950 uppercase">Pending Approvals</h3>
              </div>
              <button 
                onClick={handleProcessAll}
                className="text-[10px] font-black uppercase tracking-widest text-coral hover:underline"
              >
                Process All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cream/30">
                    <th className="px-10 py-6 micro-label text-teal-950/40">Company</th>
                    <th className="px-10 py-6 micro-label text-teal-950/40">Tier</th>
                    <th className="px-10 py-6 micro-label text-teal-950/40">Status</th>
                    <th className="px-10 py-6 micro-label text-teal-950/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-900/5">
                  {pendingApprovals.map((company, i) => (
                    <tr key={i} className="hover:bg-forest-teal group transition-all">
                      <td className="px-10 py-8">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-lg group-hover:bg-peach transition-colors">
                            {company.logo}
                          </div>
                          <span className="text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-white transition-colors">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={cn(
                          "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                          company.plan === 'Enterprise' ? 'bg-coral/10 text-coral group-hover:bg-coral group-hover:text-white' : 'bg-forest-teal/10 text-forest-teal group-hover:bg-white/10 group-hover:text-white'
                        )}>
                          {company.plan}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="flex items-center text-amber-500 text-[10px] font-black uppercase tracking-widest group-hover:text-peach transition-colors">
                          <Clock size={12} className="mr-2" /> {company.status}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewCompany(company.id)}
                            className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach transition-all"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => handleApprove(company.id)}
                            className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button 
                            onClick={() => handleReject(company.id)}
                            className="p-3 bg-rose-500/10 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                          >
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Distribution Chart - Clean Utility Style */}
          <div className="lg:col-span-4 bg-white p-10 rounded-[60px] border border-teal-900/5 shadow-sm">
            <h3 className="micro-label text-teal-950 mb-12 block">Market Share</h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#022c22', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px' }}
                    itemStyle={{ color: '#ffdab9', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-6 mt-12">
              {pieData.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-teal-950">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inquiries Table - Technical Data Grid */}
        <div className="bg-white rounded-[60px] border border-teal-900/5 shadow-sm overflow-hidden mb-12">
          <div className="p-10 border-b border-teal-900/5 flex justify-between items-end">
            <div>
              <span className="micro-label text-coral mb-2 block">Support Tickets</span>
              <h3 className="text-3xl font-black tracking-tighter text-teal-950 uppercase">Upgrade Inquiries</h3>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-coral hover:underline">View All Messages</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-cream/30">
                  <th className="px-10 py-6 micro-label text-teal-950/40">Employer</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Request</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Message</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Date</th>
                  <th className="px-10 py-6 micro-label text-teal-950/40">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-900/5">
                {recentInquiries.map((inquiry, i) => (
                  <tr key={i} className="hover:bg-forest-teal group transition-all">
                    <td className="px-10 py-8 text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-white transition-colors">{inquiry.name}</td>
                    <td className="px-10 py-8">
                      <span className="px-4 py-1.5 bg-coral/10 text-coral rounded-full text-[9px] font-black uppercase tracking-widest group-hover:bg-coral group-hover:text-white transition-all">
                        {inquiry.plan}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-xs font-medium text-teal-950/60 group-hover:text-white/60 transition-colors">{inquiry.msg}</td>
                    <td className="px-10 py-8 data-value text-[9px] opacity-40 group-hover:text-peach transition-colors">{inquiry.date}</td>
                    <td className="px-10 py-8">
                      <button 
                        onClick={() => handleReply(inquiry.id)}
                        className="flex items-center space-x-2 text-forest-teal font-black text-[10px] uppercase tracking-widest group-hover:text-peach transition-colors hover:underline"
                      >
                        <MessageSquare size={14} /> <span>Reply</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Engine Status - Immersive Style */}
        <div className="bg-forest-teal p-16 rounded-[80px] text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-3 bg-peach rounded-full animate-ping" />
                <span className="micro-label text-peach opacity-100">Neural Engine v4.2</span>
              </div>
              <h3 className="text-5xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Processing <br />
                <span className="text-peach italic font-serif lowercase">at</span> <br />
                Scale
              </h3>
              <p className="text-white/60 mb-12 leading-relaxed max-w-md text-lg">
                Our proprietary algorithm is currently processing 1,200+ matches per hour with a 94% accuracy rate across the global B2B network.
              </p>
              <div className="flex space-x-6">
                <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 group-hover:scale-105 transition-transform">
                  <p className="text-peach text-5xl font-black tracking-tighter mb-1">94%</p>
                  <p className="micro-label opacity-60">Accuracy</p>
                </div>
                <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 group-hover:scale-105 transition-transform">
                  <p className="text-coral text-5xl font-black tracking-tighter mb-1">1.2k</p>
                  <p className="micro-label opacity-60">Matches/hr</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 bg-coral/20 rounded-full blur-[80px] animate-pulse" />
                <div className="absolute inset-0 border-8 border-peach/10 rounded-full animate-spin-slow" />
                <div className="absolute inset-8 border-4 border-coral/20 rounded-full animate-reverse-spin" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-8xl font-black text-peach tracking-tighter">AI</span>
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase mt-4 opacity-40">Operational</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-coral/10 rounded-full blur-[150px] -mr-64 -mt-64" />
        </div>
      </main>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminDashboard;
