import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sidebar, MobileNav } from '../components/Navigation';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Shield, 
  Eye, 
  Briefcase, 
  DollarSign, 
  Globe,
  Save,
  CheckCircle2,
  Camera,
  Plus,
  X,
  ChevronRight
} from 'lucide-react';
import { BackButton } from '../components/BackButton';

const CandidateSettings = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Personal Info', icon: User },
    { id: 'preferences', label: 'Job Preferences', icon: Briefcase },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="candidate" />
      <MobileNav role="candidate" />
      
      <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-8">
          <BackButton />
        </div>
        {/* Full-width Sticky Header Container */}
        <header className="sticky top-0 z-40 bg-cream border-b border-teal-950/5">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-12 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-coral/10 rounded-full mb-4">
                <Shield size={14} className="text-coral" />
                <span className="text-[10px] font-black uppercase tracking-widest text-coral">Account Security</span>
              </div>
              <h1 className="text-5xl font-black text-teal-950 tracking-tighter leading-none uppercase">
                Account <br />
                <span className="text-coral italic font-serif lowercase">Settings</span>
              </h1>
            </div>

            <button 
              onClick={handleSave}
              className="w-full sm:w-auto px-10 py-5 bg-teal-950 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-coral transition-all flex items-center justify-center shadow-2xl shadow-teal-950/20 hover:-translate-y-1 active:scale-95 min-w-[220px]"
            >
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.div 
                    key="saved"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <CheckCircle2 size={18} className="mr-2" />
                    <span>Saved Successfully</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="save"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <Save size={18} className="mr-2" />
                    <span>Save All Changes</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Tabs Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border-2 ${
                      activeTab === tab.id 
                        ? 'bg-teal-950 text-white border-teal-950 shadow-xl shadow-teal-950/20' 
                        : 'bg-white text-teal-950/40 border-transparent hover:border-teal-950/10 hover:text-teal-950'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-white p-8 md:p-12 rounded-[48px] border border-teal-900/5 shadow-sm"
                >
                  {activeTab === 'profile' && (
                    <div className="space-y-10">
                      <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-8 mb-10">
                        <div className="relative group cursor-pointer">
                          <div className="w-32 h-32 bg-peach rounded-[40px] flex items-center justify-center text-forest-teal text-4xl font-black shadow-xl shadow-peach/20 rotate-3 group-hover:rotate-0 transition-all duration-500 overflow-hidden">
                            <span className="group-hover:opacity-0 transition-opacity">AR</span>
                            <div className="absolute inset-0 bg-teal-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                              <Camera size={24} className="mb-1" />
                              <span className="text-[8px] font-black uppercase tracking-widest">Update</span>
                            </div>
                          </div>
                          <button className="absolute -bottom-2 -right-2 p-3 bg-teal-950 text-white rounded-2xl shadow-2xl hover:bg-coral transition-colors z-10">
                            <User size={20} />
                          </button>
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-3xl font-black text-teal-950 uppercase tracking-tight">Alex Rivera</h3>
                          <p className="text-teal-950/40 font-bold uppercase tracking-widest text-xs mt-1 flex items-center justify-center sm:justify-start">
                            Senior Product Designer <span className="mx-2 text-coral opacity-40">•</span> London, UK
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {[
                          { label: 'Full Name', icon: User, value: 'Alex Rivera', type: 'text' },
                          { label: 'Email Address', icon: Mail, value: 'alex.rivera@design.com', type: 'email' },
                          { label: 'Phone Number', icon: Phone, value: '+44 7700 900077', type: 'tel' },
                          { label: 'Location', icon: MapPin, value: 'London, United Kingdom', type: 'text' }
                        ].map((field) => (
                          <div key={field.label} className="space-y-3 group/input">
                            <label className="text-[10px] font-black text-teal-950/40 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-coral transition-colors">
                              {field.label}
                            </label>
                            <div className="relative">
                              <field.icon className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-950/20 group-focus-within/input:text-coral transition-colors" size={18} />
                              <input 
                                type={field.type} 
                                defaultValue={field.value} 
                                className="w-full pl-14 pr-6 py-5 bg-cream/30 border border-teal-950/5 rounded-3xl outline-none focus:ring-4 ring-coral/10 focus:bg-white focus:border-coral/20 font-bold text-teal-950 transition-all" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'preferences' && (
                    <div className="space-y-12">
                      <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <h4 className="text-xs font-black text-teal-950 uppercase tracking-widest flex items-center">
                            <Globe size={16} className="mr-3 text-coral" /> Work <span className="text-coral italic font-serif lowercase ml-1">preference</span>
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            {['Remote', 'On-site', 'Hybrid', 'Any'].map((type) => (
                              <button 
                                key={type}
                                className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${
                                  type === 'Hybrid' 
                                    ? 'bg-teal-950 text-white border-teal-950 shadow-lg shadow-teal-950/20' 
                                    : 'bg-cream/50 text-teal-950/40 border-transparent hover:border-teal-950/10 hover:text-teal-950'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h4 className="text-xs font-black text-teal-950 uppercase tracking-widest flex items-center">
                            <DollarSign size={16} className="mr-3 text-coral" /> Expected <span className="text-coral italic font-serif lowercase ml-1">salary</span>
                          </h4>
                          <div className="flex items-center space-x-4">
                            <div className="relative flex-1 group/input">
                              <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-950/20 group-focus-within/input:text-coral transition-colors" size={18} />
                              <input type="text" defaultValue="120,000" className="w-full pl-12 pr-6 py-5 bg-cream/50 border border-teal-950/5 rounded-3xl outline-none focus:ring-4 ring-coral/10 focus:bg-white focus:border-coral/20 font-bold text-teal-950 transition-all" />
                            </div>
                            <span className="font-black text-teal-950/40 text-xs uppercase tracking-widest">USD</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 pt-10 border-t border-teal-950/5">
                        <h4 className="text-xs font-black text-teal-950 uppercase tracking-widest">Target <span className="text-coral italic font-serif lowercase ml-1">industries</span></h4>
                        <div className="flex flex-wrap gap-3">
                          {['FinTech', 'HealthTech', 'EdTech', 'MarTech', 'Cybersecurity', 'DevTools'].map((tag) => (
                            <span key={tag} className="group flex items-center px-6 py-3 bg-peach/10 text-coral rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer hover:bg-coral hover:text-white transition-all">
                              {tag}
                              <X size={12} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                          ))}
                          <button className="flex items-center px-6 py-3 border-2 border-dashed border-teal-950/10 text-teal-950/40 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-coral hover:text-coral transition-all">
                            <Plus size={14} className="mr-2" /> Add Industry
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="space-y-4">
                      <div className="mb-6">
                        <h4 className="text-xs font-black text-teal-950 uppercase tracking-widest mb-1">Email <span className="text-coral italic font-serif lowercase ml-1">notifications</span></h4>
                        <p className="text-teal-950/40 text-[10px] font-bold uppercase tracking-widest">Manage how we contact you</p>
                      </div>
                      {[
                        { title: 'Job Alerts', desc: 'Get notified when new B2B roles match your skills', enabled: true },
                        { title: 'Application Updates', desc: 'Receive status changes for your active applications', enabled: true },
                        { title: 'Direct Messages', desc: 'Allow employers to message you directly', enabled: false },
                        { title: 'Marketing Emails', desc: 'Tips on B2B hiring and platform updates', enabled: false }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-8 bg-cream/30 rounded-[32px] border border-teal-950/5 hover:bg-white hover:shadow-xl hover:shadow-teal-950/5 transition-all group cursor-pointer">
                          <div className="pr-4">
                            <h4 className="font-black text-teal-950 uppercase tracking-tight group-hover:text-coral transition-colors">{item.title}</h4>
                            <p className="text-xs text-teal-950/40 font-bold uppercase tracking-widest mt-1">{item.desc}</p>
                          </div>
                          <button className={`w-14 h-8 rounded-full relative transition-all flex-shrink-0 ${item.enabled ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-teal-950/10'}`}>
                            <motion.div 
                              animate={{ x: item.enabled ? 24 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="absolute top-1.5 left-1.5 w-5 h-5 bg-white rounded-full shadow-sm" 
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-12">
                      <div className="space-y-8">
                        <div className="space-y-3 group/input">
                          <label className="text-[10px] font-black text-teal-950/40 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-coral transition-colors">Current Password</label>
                          <input type="password" placeholder="••••••••" className="w-full px-6 py-5 bg-cream/50 border border-teal-950/5 rounded-3xl outline-none focus:ring-4 ring-coral/10 focus:bg-white focus:border-coral/20 font-bold transition-all" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3 group/input">
                            <label className="text-[10px] font-black text-teal-950/40 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-coral transition-colors">New Password</label>
                            <input type="password" placeholder="Enter new password" className="w-full px-6 py-5 bg-cream/50 border border-teal-950/5 rounded-3xl outline-none focus:ring-4 ring-coral/10 focus:bg-white focus:border-coral/20 font-bold transition-all" />
                          </div>
                          <div className="space-y-3 group/input">
                            <label className="text-[10px] font-black text-teal-950/40 uppercase tracking-[0.2em] ml-1 group-focus-within/input:text-coral transition-colors">Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password" className="w-full px-6 py-5 bg-cream/50 border border-teal-950/5 rounded-3xl outline-none focus:ring-4 ring-coral/10 focus:bg-white focus:border-coral/20 font-bold transition-all" />
                          </div>
                        </div>
                      </div>

                      <div className="pt-12 border-t border-teal-950/5">
                        <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-rose-50 rounded-[32px] border border-rose-100 gap-6 group cursor-pointer hover:bg-rose-100/50 transition-colors">
                          <div className="text-center sm:text-left">
                            <h4 className="font-black text-rose-600 uppercase tracking-tight">Delete Account</h4>
                            <p className="text-xs text-rose-600/60 font-bold uppercase tracking-widest mt-1">Permanently remove your profile and data</p>
                          </div>
                          <button className="w-full sm:w-auto px-8 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-rose-700 transition-all shadow-xl shadow-rose-600/20 flex items-center justify-center">
                            Deactivate <ChevronRight size={14} className="ml-2" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateSettings;
