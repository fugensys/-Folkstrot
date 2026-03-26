import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  ShieldCheck, 
  Building2, 
  FileText, 
  Globe, 
  Mail, 
  Phone, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import { cn } from '../components/Navigation';

const CompanyVerification = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="employer" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <span className="micro-label text-emerald-600">Trust & Safety</span>
          </div>
          <h1 className="text-5xl font-black text-teal-950 tracking-tighter mb-4">
            Company <span className="text-emerald-600">Verification</span>
          </h1>
          <p className="text-teal-950/60 font-medium max-w-2xl">
            Verify your business to build trust with candidates, increase job visibility, and unlock premium hiring tools.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Form Section */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-16 rounded-[48px] border border-teal-900/5 shadow-sm text-center"
                >
                  <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                    <Clock size={48} />
                  </div>
                  <h2 className="text-3xl font-black text-teal-950 uppercase tracking-tighter mb-4">Verification Pending</h2>
                  <p className="text-teal-950/60 font-medium max-w-md mx-auto mb-8">
                    Our compliance team is currently reviewing your documents. This process typically takes 24-48 business hours.
                  </p>
                  <div className="p-6 bg-cream rounded-3xl inline-block">
                    <p className="text-xs font-black uppercase tracking-widest text-teal-950/40">Reference ID: VER-90210-X</p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  {/* Progress Bar */}
                  <div className="flex justify-between mb-4 px-2">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex flex-col items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all mb-2",
                          step >= s ? "bg-emerald-500 text-white" : "bg-teal-950/5 text-teal-950/20"
                        )}>
                          {s}
                        </div>
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          step >= s ? "text-teal-950" : "text-teal-950/20"
                        )}>
                          {s === 1 ? 'Business Info' : s === 2 ? 'Documents' : 'Verification'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm">
                    {step === 1 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        <h3 className="text-2xl font-bold text-teal-950 mb-8">Legal Business Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="micro-label text-teal-950/40">Legal Company Name</label>
                            <div className="relative">
                              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                              <input type="text" placeholder="e.g. TechFlow Systems Inc." className="w-full pl-12 pr-4 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-emerald-500/20 outline-none" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="micro-label text-teal-950/40">Registration Number (EIN/VAT)</label>
                            <div className="relative">
                              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                              <input type="text" placeholder="XX-XXXXXXX" className="w-full pl-12 pr-4 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-emerald-500/20 outline-none" />
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="micro-label text-teal-950/40">Business Website</label>
                            <div className="relative">
                              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                              <input type="url" placeholder="https://www.company.com" className="w-full pl-12 pr-4 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-emerald-500/20 outline-none" />
                            </div>
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <label className="micro-label text-teal-950/40">Headquarters Address</label>
                            <textarea placeholder="Full legal address..." rows={3} className="w-full p-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-emerald-500/20 outline-none resize-none" />
                          </div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full py-5 bg-forest-teal text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all flex items-center justify-center"
                        >
                          Continue to Documents <ArrowRight size={16} className="ml-2" />
                        </button>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <h3 className="text-2xl font-bold text-teal-950 mb-2">Document Upload</h3>
                        <p className="text-sm text-teal-950/40 font-medium mb-8">Please upload official government-issued business documents.</p>
                        
                        <div className="space-y-6">
                          {[
                            { label: 'Business License', desc: 'Official registration certificate' },
                            { label: 'Tax Identification', desc: 'VAT/EIN confirmation letter' }
                          ].map((doc, i) => (
                            <div key={i} className="p-6 border-2 border-dashed border-teal-950/5 rounded-3xl flex items-center justify-between hover:border-emerald-500/20 transition-all cursor-pointer group">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-teal-950/20 group-hover:text-emerald-500 transition-colors">
                                  <Upload size={24} />
                                </div>
                                <div>
                                  <p className="font-bold text-teal-950">{doc.label}</p>
                                  <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-widest">{doc.desc}</p>
                                </div>
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Upload</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <button 
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 py-5 bg-cream text-teal-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950/5 transition-all"
                          >
                            Back
                          </button>
                          <button 
                            type="button"
                            onClick={() => setStep(3)}
                            className="flex-[2] py-5 bg-forest-teal text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all flex items-center justify-center"
                          >
                            Continue to Verification <ArrowRight size={16} className="ml-2" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                      >
                        <h3 className="text-2xl font-bold text-teal-950 mb-8">Final Verification</h3>
                        
                        <div className="space-y-4">
                          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-sm">
                                <Mail size={18} />
                              </div>
                              <div>
                                <p className="text-xs font-black text-teal-950/40 uppercase tracking-widest">Work Email</p>
                                <p className="font-bold text-teal-950">hr@techflow.com</p>
                              </div>
                            </div>
                            <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-emerald-600">
                              <CheckCircle2 size={14} className="mr-1" /> Verified
                            </span>
                          </div>

                          <div className="p-6 bg-cream rounded-3xl border border-teal-900/5 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-teal-950/20 shadow-sm">
                                <Phone size={18} />
                              </div>
                              <div>
                                <p className="text-xs font-black text-teal-950/40 uppercase tracking-widest">Phone Number</p>
                                <p className="font-bold text-teal-950">+1 (555) 012-3456</p>
                              </div>
                            </div>
                            <button type="button" className="text-[10px] font-black uppercase tracking-widest text-coral hover:underline">Verify Now</button>
                          </div>
                        </div>

                        <div className="p-6 bg-teal-950/5 rounded-3xl flex items-start space-x-4">
                          <AlertCircle className="text-teal-950/40 shrink-0" size={20} />
                          <p className="text-xs text-teal-950/60 leading-relaxed font-medium">
                            By submitting this application, you confirm that the information provided is accurate and that you are an authorized representative of the company.
                          </p>
                        </div>

                        <div className="flex gap-4">
                          <button 
                            type="button"
                            onClick={() => setStep(2)}
                            className="flex-1 py-5 bg-cream text-teal-950 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950/5 transition-all"
                          >
                            Back
                          </button>
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-[2] py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all flex items-center justify-center shadow-xl shadow-emerald-500/20 disabled:opacity-50"
                          >
                            {isSubmitting ? 'Processing...' : 'Submit for Review'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
              <h3 className="text-xl font-bold text-teal-950 mb-6">Verification Benefits</h3>
              <div className="space-y-6">
                {[
                  { icon: CheckCircle2, title: 'Trust Badge', desc: 'Display a verified badge on your profile and jobs.' },
                  { icon: Sparkles, title: 'Higher Visibility', desc: 'Your job postings appear higher in search results.' },
                  { icon: Users, title: 'Premium Talent', desc: 'Access to top-tier candidates who prioritize verified employers.' },
                  { icon: ShieldCheck, title: 'Secure Hiring', desc: 'Unlock advanced security and collaboration tools.' }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                      <benefit.icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-teal-950">{benefit.title}</p>
                      <p className="text-xs text-teal-950/60 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-forest-teal p-8 rounded-[40px] text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Info size={20} className="text-peach" />
                <h4 className="font-bold">Need Assistance?</h4>
              </div>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                If you have trouble uploading documents or need to verify a complex business structure, our support team is ready to help.
              </p>
              <button className="w-full py-4 bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                Contact Verification Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Users = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default CompanyVerification;
