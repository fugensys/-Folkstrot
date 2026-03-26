import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Lock, 
  Database, 
  Cpu, 
  Users,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Save
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [settings, setSettings] = useState({
    siteName: 'Folkstrot',
    supportEmail: 'support@folkstrot.com',
    maintenanceMode: false,
    twoFactor: true,
    ipWhitelisting: false,
    sessionTimeout: true,
    // Global Alerts
    emailNotifications: true,
    pushNotifications: true,
    alertFrequency: 'realtime',
    // B2B Network
    publicDirectory: true,
    apiAccess: false,
    partnerIntegrations: true,
    // Neural Engine
    aiResumeParsing: true,
    aiJobMatching: true,
    aiChatbotSupport: true,
    modelSelection: 'gemini-pro'
  });

  const tabs = [
    { id: 'general', label: 'General Config', icon: Settings },
    { id: 'security', label: 'System Security', icon: Shield },
    { id: 'notifications', label: 'Global Alerts', icon: Bell },
    { id: 'network', label: 'B2B Network', icon: Globe },
    { id: 'ai', label: 'Neural Engine', icon: Cpu },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <BackButton />
        <header className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-950/5 rounded-2xl flex items-center justify-center text-teal-950">
                <Settings size={24} />
              </div>
              <span className="micro-label text-teal-950/40">System Configuration</span>
            </div>
            {showSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-2"
              >
                <CheckCircle2 size={14} />
                <span>Saved Successfully</span>
              </motion.div>
            )}
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none mt-4">
            Global <br />
            <span className="text-coral italic font-serif lowercase">Settings</span>
          </h1>
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
            <div className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm min-h-[500px]">
              {activeTab === 'general' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black text-teal-950 uppercase tracking-tight mb-2">General Configuration</h3>
                    <p className="text-sm text-teal-950/40 font-medium">Manage core platform parameters and branding.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="micro-label text-teal-950/40">Platform Name</label>
                      <input 
                        type="text" 
                        value={settings.siteName}
                        onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                        className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="micro-label text-teal-950/40">Support Email</label>
                      <input 
                        type="email" 
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                        className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="micro-label text-teal-950/40">Maintenance Mode</label>
                      <div className="flex items-center justify-between p-6 bg-cream rounded-3xl">
                        <div>
                          <p className="font-bold text-teal-950">Enable Maintenance Mode</p>
                          <p className="text-xs text-teal-950/40 font-medium">Display a maintenance page to all users except admins.</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting('maintenanceMode')}
                          className={cn(
                            "w-14 h-8 rounded-full relative transition-all",
                            settings.maintenanceMode ? "bg-coral" : "bg-teal-950/10"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all",
                            settings.maintenanceMode ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black text-teal-950 uppercase tracking-tight mb-2">System Security</h3>
                    <p className="text-sm text-teal-950/40 font-medium">Configure authentication protocols and access controls.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { id: 'twoFactor', title: 'Two-Factor Authentication', desc: 'Require 2FA for all admin and employer accounts.' },
                      { id: 'ipWhitelisting', title: 'IP Whitelisting', desc: 'Restrict admin access to specific IP ranges.' },
                      { id: 'sessionTimeout', title: 'Session Timeout', desc: 'Automatically log out inactive users after 30 minutes.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-cream rounded-3xl">
                        <div>
                          <p className="font-bold text-teal-950">{item.title}</p>
                          <p className="text-xs text-teal-950/40 font-medium">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting(item.id as keyof typeof settings)}
                          className={cn(
                            "w-14 h-8 rounded-full relative transition-all",
                            settings[item.id as keyof typeof settings] ? "bg-emerald-500" : "bg-teal-950/10"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all",
                            settings[item.id as keyof typeof settings] ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black text-teal-950 uppercase tracking-tight mb-2">Global Alerts</h3>
                    <p className="text-sm text-teal-950/40 font-medium">Manage how the system communicates critical updates.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { id: 'emailNotifications', title: 'Email Notifications', desc: 'Send system alerts and reports via email.' },
                      { id: 'pushNotifications', title: 'Push Notifications', desc: 'Enable browser-based real-time push alerts.' },
                      { id: 'maintenanceAlerts', title: 'Maintenance Alerts', desc: 'Notify admins of upcoming system maintenance windows.' },
                      { id: 'registrationAlerts', title: 'Registration Alerts', desc: 'Alert admins when a new employer or partner joins.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-cream rounded-3xl">
                        <div>
                          <p className="font-bold text-teal-950">{item.title}</p>
                          <p className="text-xs text-teal-950/40 font-medium">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting(item.id as keyof typeof settings)}
                          className={cn(
                            "w-14 h-8 rounded-full relative transition-all",
                            settings[item.id as keyof typeof settings] ? "bg-coral" : "bg-teal-950/10"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all",
                            settings[item.id as keyof typeof settings] ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    ))}

                    <div className="space-y-2">
                      <label className="micro-label text-teal-950/40">Alert Frequency</label>
                      <select 
                        value={settings.alertFrequency}
                        onChange={(e) => setSettings({ ...settings, alertFrequency: e.target.value })}
                        className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-black uppercase tracking-widest text-teal-950 outline-none focus:ring-2 ring-coral/20 appearance-none cursor-pointer"
                      >
                        <option value="realtime">Real-time</option>
                        <option value="daily">Daily Digest</option>
                        <option value="weekly">Weekly Report</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'network' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black text-teal-950 uppercase tracking-tight mb-2">B2B Network</h3>
                    <p className="text-sm text-teal-950/40 font-medium">Configure ecosystem connectivity and data sharing.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { id: 'publicDirectory', title: 'Public Directory', desc: 'Allow employer profiles to be discoverable by search engines.' },
                      { id: 'apiAccess', title: 'API Access', desc: 'Enable external API endpoints for partner integrations.' },
                      { id: 'partnerIntegrations', title: 'Partner Ecosystem', desc: 'Allow verified partners to post jobs directly.' },
                      { id: 'crossPlatformSharing', title: 'Cross-Platform Sharing', desc: 'Sync job postings across affiliated B2B networks.' },
                      { id: 'verifiedPartnerBadge', title: 'Verified Partner Badge', desc: 'Display verification status on partner profiles.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-cream rounded-3xl">
                        <div>
                          <p className="font-bold text-teal-950">{item.title}</p>
                          <p className="text-xs text-teal-950/40 font-medium">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting(item.id as keyof typeof settings)}
                          className={cn(
                            "w-14 h-8 rounded-full relative transition-all",
                            settings[item.id as keyof typeof settings] ? "bg-teal-950" : "bg-teal-950/10"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all",
                            settings[item.id as keyof typeof settings] ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-10">
                  <div>
                    <h3 className="text-2xl font-black text-teal-950 uppercase tracking-tight mb-2">Neural Engine</h3>
                    <p className="text-sm text-teal-950/40 font-medium">Manage AI-driven features and model configurations.</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { id: 'aiResumeParsing', title: 'AI Resume Parsing', desc: 'Automatically extract data from candidate resumes.' },
                      { id: 'aiJobMatching', title: 'Smart Job Matching', desc: 'Use ML to match candidates with relevant job postings.' },
                      { id: 'aiChatbotSupport', title: 'AI Support Assistant', desc: 'Enable AI-powered chatbot for candidate inquiries.' },
                      { id: 'aiSentimentAnalysis', title: 'Sentiment Analysis', desc: 'Analyze candidate feedback and employer reviews.' },
                      { id: 'aiPredictiveHiring', title: 'Predictive Hiring', desc: 'Forecast hiring needs based on historical data.' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-6 bg-cream rounded-3xl">
                        <div>
                          <p className="font-bold text-teal-950">{item.title}</p>
                          <p className="text-xs text-teal-950/40 font-medium">{item.desc}</p>
                        </div>
                        <button 
                          onClick={() => toggleSetting(item.id as keyof typeof settings)}
                          className={cn(
                            "w-14 h-8 rounded-full relative transition-all",
                            settings[item.id as keyof typeof settings] ? "bg-coral" : "bg-teal-950/10"
                          )}
                        >
                          <div className={cn(
                            "absolute top-1 w-6 h-6 bg-white rounded-full shadow-sm transition-all",
                            settings[item.id as keyof typeof settings] ? "left-7" : "left-1"
                          )} />
                        </button>
                      </div>
                    ))}

                    <div className="space-y-2">
                      <label className="micro-label text-teal-950/40">Primary AI Model</label>
                      <select 
                        value={settings.modelSelection}
                        onChange={(e) => setSettings({ ...settings, modelSelection: e.target.value })}
                        className="w-full px-6 py-4 bg-cream border-none rounded-2xl text-sm font-black uppercase tracking-widest text-teal-950 outline-none focus:ring-2 ring-coral/20 appearance-none cursor-pointer"
                      >
                        <option value="gemini-pro">Gemini 1.5 Pro (High Accuracy)</option>
                        <option value="gemini-flash">Gemini 1.5 Flash (Low Latency)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-12 pt-10 border-t border-teal-900/5 flex justify-end">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-10 py-4 bg-coral text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all shadow-xl shadow-coral/20 disabled:opacity-50 flex items-center space-x-2"
                >
                  {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>{isSaving ? 'Applying...' : 'Apply Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminSettings;
