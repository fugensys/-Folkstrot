import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar, MobileNav } from '../components/Navigation';
import { Briefcase, CheckCircle2, Clock, Star, TrendingUp, Users, LogOut, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { jobService, Job, applicationService } from '../services/supabaseService';

const data = [
  { name: 'Mon', apps: 12 },
  { name: 'Tue', apps: 19 },
  { name: 'Wed', apps: 15 },
  { name: 'Thu', apps: 22 },
  { name: 'Fri', apps: 30 },
  { name: 'Sat', apps: 10 },
  { name: 'Sun', apps: 8 },
];

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployerData = async () => {
      if (!user?.id) return;
      try {
        setLoading(true);
        const employerJobs = await jobService.getJobsByEmployerId(user.id);
        setJobs(employerJobs);

        // Fetch applications for all jobs
        const allAppsPromises = employerJobs.map(job => 
          applicationService.getApplicationsByJobId(job.id)
        );
        const appsResults = await Promise.all(allAppsPromises);
        const flatApps = appsResults.flat();
        setApplications(flatApps);
      } catch (err: any) {
        console.error('Error fetching employer data:', err);
        if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
          console.warn('Database connection is currently unavailable. Using mock data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [user?.id]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F8F9FA] items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-forest-teal animate-spin mx-auto mb-4" />
          <p className="text-teal-950/60 font-bold tracking-widest uppercase text-xs">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Roles', value: jobs.length.toString(), icon: Briefcase, color: 'text-forest-teal' },
    { label: 'Total Applicants', value: applications.length.toString(), icon: Users, color: 'text-coral' },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'interviewing').length.toString(), icon: Star, color: 'text-peach' },
    { label: 'Hired', value: applications.filter(a => a.status === 'hired').length.toString(), icon: CheckCircle2, color: 'text-emerald-500' }
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="employer" />
      <MobileNav role="employer" />
      
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto pb-32 lg:pb-12">
        <BackButton />
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-16 gap-6">
          <div>
            <span className="micro-label text-coral mb-2 sm:mb-4 block">Employer Console</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              {user?.full_name || user?.email?.split('@')[0] || 'TechFlow'} <br />
              <span className="text-coral italic font-serif lowercase">Systems</span>
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
            <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-950/40 mb-0.5 sm:mb-1">Account Tier</p>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-teal-950">Enterprise Verified</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block h-10 w-px bg-teal-950/10 mx-2" />
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white border border-teal-900/5 rounded-2xl flex items-center justify-center text-teal-950/40 hover:text-coral hover:shadow-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
            <button 
              onClick={() => navigate('/employer/post-job')}
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-forest-teal text-peach rounded-full font-black uppercase tracking-widest text-[10px] sm:text-xs hover:bg-teal-950 transition-all flex items-center justify-center shadow-xl shadow-teal-900/20"
            >
              Post New Role <Briefcase size={16} className="ml-2" />
            </button>
          </div>
        </header>

        {/* Stats Grid - Technical Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border border-teal-900/5 shadow-sm group hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-cream", stat.color)}>
                  <stat.icon size={18} />
                </div>
                <TrendingUp size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-2xl sm:text-4xl font-black tracking-tighter text-teal-950 mb-1">{stat.value}</p>
              <p className="micro-label text-[9px] sm:text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Chart - Clean Utility Style */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-[40px] sm:rounded-[60px] border border-teal-900/5 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-4">
              <div>
                <span className="micro-label text-coral mb-1 sm:mb-2 block">Performance Metrics</span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-teal-950 uppercase">Application Trends</h3>
              </div>
              <div className="flex space-x-2">
                {['7D', '30D', '90D'].map(period => (
                  <button key={period} className={cn(
                    "px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all",
                    period === '7D' ? "bg-forest-teal text-peach" : "bg-cream text-teal-950/40 hover:bg-peach/20"
                  )}>
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[250px] sm:h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff7f50" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ff7f50" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#064e3b10" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#022c22', opacity: 0.4, fontSize: 10, fontWeight: 900 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#022c22', opacity: 0.4, fontSize: 10, fontWeight: 900 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#022c22', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px' }}
                    itemStyle={{ color: '#ffdab9', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                    cursor={{ stroke: '#ff7f50', strokeWidth: 2 }}
                  />
                  <Area type="monotone" dataKey="apps" stroke="#ff7f50" strokeWidth={4} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity - Data Grid Style */}
          <div className="lg:col-span-4 bg-white p-8 sm:p-10 rounded-[40px] sm:rounded-[60px] border border-teal-900/5 shadow-sm">
            <h3 className="micro-label text-teal-950 mb-6 sm:mb-8 block">New Talent</h3>
            <div className="space-y-6 sm:space-y-8">
              {applications.length === 0 ? (
                <p className="text-teal-950/40 font-bold text-xs">No applications yet.</p>
              ) : (
                applications.slice(0, 4).map((app, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-base sm:text-lg group-hover:bg-peach transition-colors overflow-hidden shrink-0">
                        {app.profiles.avatar_url ? (
                          <img src={app.profiles.avatar_url} alt={app.profiles.full_name} className="w-full h-full object-cover" />
                        ) : (
                          app.profiles.full_name[0]
                        )}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-coral transition-colors">{app.profiles.full_name}</p>
                        <p className="text-[9px] sm:text-[10px] text-teal-950/40 font-bold uppercase tracking-widest">{app.profiles.headline || 'Candidate'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-coral mb-0.5 sm:mb-1">
                        <Star size={8} fill="currentColor" />
                        <span className="text-[9px] sm:text-[10px] font-black ml-1">5.0</span>
                      </div>
                      <p className="data-value text-[8px] sm:text-[9px] opacity-40">{new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button className="w-full mt-8 sm:mt-10 py-3 sm:py-4 bg-cream text-teal-950 rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-peach/20 transition-all">
              View All Pipeline
            </button>
          </div>
        </div>

        {/* Hiring Pipeline - Immersive Style */}
        <div className="bg-forest-teal p-8 sm:p-12 rounded-[40px] sm:rounded-[60px] text-white shadow-2xl relative overflow-hidden mb-8 sm:mb-12 group">
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-16 gap-6">
              <div>
                <span className="micro-label text-peach mb-1 sm:mb-2 block">Active Pipeline</span>
                <h3 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase leading-none">
                  {jobs[0]?.title || 'Senior Product Designer'}
                </h3>
              </div>
              <div className="flex space-x-3 sm:space-x-4">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/10 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                  {applications.filter(a => a.job_id === jobs[0]?.id).length} Total
                </div>
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-peach text-forest-teal rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                  {applications.filter(a => a.job_id === jobs[0]?.id && a.status === 'interviewing').length} Shortlisted
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Applied', count: applications.filter(a => a.job_id === jobs[0]?.id && a.status === 'pending').length, color: 'bg-white/5' },
                { label: 'Screening', count: applications.filter(a => a.job_id === jobs[0]?.id && a.status === 'screening').length, color: 'bg-white/10' },
                { label: 'Interview', count: applications.filter(a => a.job_id === jobs[0]?.id && a.status === 'interviewing').length, color: 'bg-white/15' },
                { label: 'Offer', count: applications.filter(a => a.job_id === jobs[0]?.id && a.status === 'hired').length, color: 'bg-peach text-forest-teal' }
              ].map((stage, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn("p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] flex flex-col items-center text-center group-hover:scale-105 transition-transform", stage.color)}
                >
                  <span className="text-3xl sm:text-5xl font-black tracking-tighter mb-1 sm:mb-2">{stage.count}</span>
                  <span className="micro-label opacity-60 text-[9px] sm:text-[10px]">{stage.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-coral/10 rounded-full blur-[100px] sm:blur-[120px] -mr-24 sm:-mr-32 -mt-24 sm:-mt-32" />
        </div>

        {/* Jobs Table - Technical Data Grid */}
        <div className="bg-white rounded-[40px] sm:rounded-[60px] border border-teal-900/5 shadow-sm overflow-hidden mb-8 sm:mb-12">
          <div className="p-8 sm:p-10 border-b border-teal-900/5 flex justify-between items-end">
            <div>
              <span className="micro-label text-coral mb-1 sm:mb-2 block">Job Management</span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-teal-950 uppercase">Active Listings</h3>
            </div>
            <button 
              onClick={() => navigate('/employer/post-job')}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-forest-teal text-peach rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-teal-950 transition-all"
            >
              Post New
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="bg-cream/30">
                  <th className="px-6 sm:px-10 py-4 sm:py-6 micro-label text-teal-950/40">Role</th>
                  <th className="px-6 sm:px-10 py-4 sm:py-6 micro-label text-teal-950/40">Location</th>
                  <th className="px-6 sm:px-10 py-4 sm:py-6 micro-label text-teal-950/40">Type</th>
                  <th className="px-6 sm:px-10 py-4 sm:py-6 micro-label text-teal-950/40">Salary</th>
                  <th className="px-6 sm:px-10 py-4 sm:py-6 micro-label text-teal-950/40">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-teal-900/5">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-forest-teal group transition-all">
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black text-base sm:text-lg group-hover:bg-peach transition-colors shrink-0">{job.title[0]}</div>
                        <span className="text-xs sm:text-sm font-black text-teal-950 uppercase tracking-tight group-hover:text-white transition-colors">{job.title}</span>
                      </div>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <span className="data-value text-[9px] sm:text-[10px] text-teal-950 group-hover:text-peach transition-colors">{job.location}</span>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-forest-teal/10 text-forest-teal rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest group-hover:bg-white/10 group-hover:text-white transition-all">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <span className="data-value text-[9px] sm:text-[10px] text-teal-950 group-hover:text-peach transition-colors">{job.salary}</span>
                    </td>
                    <td className="px-6 sm:px-10 py-6 sm:py-8">
                      <button 
                        onClick={() => navigate(`/jobs/${job.id}`)}
                        className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-coral group-hover:text-peach transition-colors hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 sm:px-10 py-10 sm:py-12 text-center text-teal-950/40 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
                      No active job listings found.
                    </td>
                  </tr>
                )}
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

export default EmployerDashboard;
