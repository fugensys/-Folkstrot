import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  Settings, 
  User, 
  Building2, 
  Bell, 
  Shield, 
  Users, 
  Globe, 
  Mail, 
  Lock,
  Camera,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  LogOut,
  X
} from 'lucide-react';
import { cn } from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';

const EmployerSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    newApplicants: true,
    messages: true,
    marketing: false,
    security: true
  });

  const [teamMembers, setTeamMembers] = useState([
    { name: 'Sarah Jenkins', email: 'sarah@techflow.com', role: 'Admin', avatar: 'SJ' },
    { name: 'Marcus Chen', email: 'marcus@techflow.com', role: 'Recruiter', avatar: 'MC' },
    { name: 'Elena Rodriguez', email: 'elena@techflow.com', role: 'Recruiter', avatar: 'ER' },
  ]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Recruiter');

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: ''
  });
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordData.current || !passwordData.new) return;
    
    setPasswordStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setPasswordStatus('success');
      setPasswordData({ current: '', new: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setPasswordStatus('idle'), 3000);
    }, 1500);
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    const name = inviteEmail.split('@')[0];
    const avatar = name.substring(0, 2).toUpperCase();
    
    setTeamMembers([...teamMembers, {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: inviteEmail,
      role: inviteRole,
      avatar
    }]);
    
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  const removeMember = (email: string) => {
    setTeamMembers(teamMembers.filter(m => m.email !== email));
  };

  const tabs = [
    { id: 'profile', label: 'Company Profile', icon: Building2 },
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'team', label: 'Team Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="employer" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <BackButton />
        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-teal-950/5 rounded-2xl flex items-center justify-center text-teal-950">
              <Settings size={24} />
            </div>
            <span className="micro-label text-teal-950/40">Configuration</span>
          </div>
          <h1 className="text-5xl font-black text-teal-950 tracking-tighter mb-4">
            Employer <span className="text-coral">Settings</span>
          </h1>
          <p className="text-teal-950/60 font-medium max-w-2xl">
            Configure your company profile, manage your recruitment team, and set your account preferences.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Navigation Tabs */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group",
                  activeTab === tab.id 
                    ? "bg-white text-teal-950 shadow-sm border border-teal-900/5" 
                    : "text-teal-950/40 hover:text-teal-950 hover:bg-white/50"
                )}
              >
                <div className="flex items-center space-x-4">
                  <tab.icon size={18} className={cn(
                    "transition-transform group-hover:scale-110",
                    activeTab === tab.id ? "text-coral" : "text-teal-950/20"
                  )} />
                  <span className="text-xs font-black uppercase tracking-widest">{tab.label}</span>
                </div>
                {activeTab === tab.id && <ChevronRight size={14} className="text-coral" />}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm"
              >
                {activeTab === 'profile' && (
                  <div className="space-y-10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Company Name</label>
                        <input type="text" defaultValue="TechFlow Systems" className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Industry</label>
                        <select className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none appearance-none">
                          <option>Software Development</option>
                          <option>Fintech</option>
                          <option>Healthcare</option>
                          <option>E-commerce</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="micro-label text-teal-950/40">Company Description</label>
                        <textarea rows={4} className="w-full p-6 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none resize-none" defaultValue="Building the next generation of B2B infrastructure for global enterprises." />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Website URL</label>
                        <div className="relative">
                          <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-950/20" size={16} />
                          <input type="url" defaultValue="https://techflow.com" className="w-full pl-14 pr-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Company Size</label>
                        <select defaultValue="201-500 employees" className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none appearance-none">
                          <option>1-10 employees</option>
                          <option>11-50 employees</option>
                          <option>51-200 employees</option>
                          <option>201-500 employees</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'account' && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-bold text-teal-950 mb-1">Account Settings</h3>
                      <p className="text-sm text-teal-950/40 font-medium">Manage your personal account details and session.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Full Name</label>
                        <input type="text" defaultValue="Sarah Jenkins" className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Email Address</label>
                        <input type="email" defaultValue="sarah@techflow.com" className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" />
                      </div>
                    </div>

                    <div className="pt-8 border-t border-teal-900/5">
                      <div className="p-8 bg-coral/5 rounded-[32px] border border-coral/10 flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-coral shadow-sm">
                            <LogOut size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-teal-950">Logout</p>
                            <p className="text-xs text-teal-950/40 font-medium">Safely sign out of your employer account.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => navigate('/login')}
                          className="px-8 py-4 bg-coral text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-950 transition-all shadow-lg shadow-coral/20"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'team' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-teal-950 mb-1">Team Members</h3>
                        <p className="text-sm text-teal-950/40 font-medium">Manage who has access to your recruitment dashboard.</p>
                      </div>
                      <button 
                        onClick={() => setIsInviteModalOpen(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-forest-teal text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-950 transition-all"
                      >
                        <Plus size={14} />
                        <span>Invite Member</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {teamMembers.map((member, i) => (
                        <div key={i} className="p-6 bg-cream rounded-3xl flex items-center justify-between group">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-teal-950 shadow-sm">
                              {member.avatar}
                            </div>
                            <div>
                              <p className="font-bold text-teal-950">{member.name}</p>
                              <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-widest">{member.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <span className="px-3 py-1 bg-white text-teal-950/60 rounded-full text-[10px] font-black uppercase tracking-widest border border-teal-900/5">
                              {member.role}
                            </span>
                            <button 
                              onClick={() => removeMember(member.email)}
                              className="text-teal-950/20 hover:text-coral transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-teal-950 mb-1">Notification Preferences</h3>
                      <p className="text-sm text-teal-950/40 font-medium">Choose how and when you want to be notified.</p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { id: 'newApplicants', title: 'New Applicants', desc: 'Get notified when a candidate applies to your job postings.' },
                        { id: 'messages', title: 'Direct Messages', desc: 'Receive alerts for new messages from candidates.' },
                        { id: 'security', title: 'Security Alerts', desc: 'Notifications about new logins and account changes.' },
                        { id: 'marketing', title: 'Marketing & Tips', desc: 'Occasional emails about new features and hiring tips.' },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-6 bg-cream rounded-3xl">
                          <div className="max-w-md">
                            <p className="font-bold text-teal-950">{item.title}</p>
                            <p className="text-xs text-teal-950/40 font-medium">{item.desc}</p>
                          </div>
                          <button 
                            onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                            className={cn(
                              "w-14 h-8 rounded-full transition-all relative",
                              notifications[item.id as keyof typeof notifications] ? "bg-emerald-500" : "bg-teal-950/10"
                            )}
                          >
                            <motion.div 
                              animate={{ x: notifications[item.id as keyof typeof notifications] ? 26 : 4 }}
                              className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-2xl font-bold text-teal-950 mb-1">Security & Access</h3>
                      <p className="text-sm text-teal-950/40 font-medium">Protect your account and manage login credentials.</p>
                    </div>

                    <div className="space-y-8">
                      <form onSubmit={handleUpdatePassword} className="space-y-6">
                        <h4 className="micro-label text-teal-950/40">Change Password</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">Current Password</label>
                            <input 
                              type="password" 
                              required
                              value={passwordData.current}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                              placeholder="••••••••" 
                              className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">New Password</label>
                            <input 
                              type="password" 
                              required
                              value={passwordData.new}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                              placeholder="••••••••" 
                              className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button 
                            type="submit"
                            disabled={passwordStatus === 'loading'}
                            className={cn(
                              "px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all",
                              passwordStatus === 'success' 
                                ? "bg-emerald-500 text-white" 
                                : "bg-teal-950 text-white hover:bg-coral"
                            )}
                          >
                            {passwordStatus === 'loading' ? 'Updating...' : 
                             passwordStatus === 'success' ? 'Password Updated!' : 'Update Password'}
                          </button>
                          {passwordStatus === 'success' && (
                            <motion.span 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-emerald-600 text-[10px] font-black uppercase tracking-widest"
                            >
                              Security settings updated successfully
                            </motion.span>
                          )}
                        </div>
                      </form>

                      <div className="pt-8 border-t border-teal-900/5">
                        <div className="flex items-center justify-between p-8 bg-cream rounded-[32px]">
                          <div className="flex items-center space-x-6">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-coral shadow-sm">
                              <Lock size={24} />
                            </div>
                            <div>
                              <p className="font-bold text-teal-950">Two-Factor Authentication</p>
                              <p className="text-xs text-teal-950/40 font-medium">Add an extra layer of security to your account.</p>
                            </div>
                          </div>
                          <button className="px-6 py-3 bg-white text-teal-950 rounded-xl text-[10px] font-black uppercase tracking-widest border border-teal-900/5 hover:bg-forest-teal hover:text-white transition-all">
                            Enable 2FA
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="mt-12 pt-10 border-t border-teal-900/5 flex justify-end space-x-4">
                  <button className="px-8 py-4 text-teal-950/40 font-black uppercase tracking-widest text-xs hover:text-teal-950 transition-colors">
                    Discard Changes
                  </button>
                  <button className="px-10 py-4 bg-coral text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all shadow-xl shadow-coral/20">
                    Save Configuration
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Invite Member Modal */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInviteModalOpen(false)}
              className="absolute inset-0 bg-teal-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-[40px] p-10 shadow-2xl border border-teal-900/5"
            >
              <button 
                onClick={() => setIsInviteModalOpen(false)}
                className="absolute top-6 right-6 text-teal-950/20 hover:text-teal-950 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <div className="w-16 h-16 bg-coral/10 rounded-2xl flex items-center justify-center text-coral mb-6">
                  <Plus size={32} />
                </div>
                <h2 className="text-3xl font-bold text-teal-950 tracking-tight mb-2">Invite Member</h2>
                <p className="text-sm text-teal-950/40 font-medium">Add a new recruiter or admin to your team.</p>
              </div>

              <form onSubmit={handleInvite} className="space-y-6">
                <div className="space-y-2">
                  <label className="micro-label text-teal-950/40">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                    <input 
                      type="email" 
                      required
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@company.com"
                      className="w-full pl-14 pr-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="micro-label text-teal-950/40">Role</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Recruiter', 'Admin'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setInviteRole(role)}
                        className={cn(
                          "py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2",
                          inviteRole === role 
                            ? "bg-coral border-coral text-white shadow-lg shadow-coral/20" 
                            : "bg-cream border-transparent text-teal-950/40 hover:border-teal-950/10"
                        )}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full py-5 bg-teal-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-coral transition-all shadow-xl shadow-teal-950/20"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployerSettings;
