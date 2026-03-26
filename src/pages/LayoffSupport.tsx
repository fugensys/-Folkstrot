import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  HeartHandshake, 
  Upload, 
  Download, 
  FileText, 
  Search, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { FEATURED_JOBS } from '../constants';
import { cn } from '../components/Navigation';
import { Link } from 'react-router-dom';
import { BackButton } from '../components/BackButton';

const LayoffSupport = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    // Simulate processing time
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      // Mock matching logic: pick 3 random jobs from FEATURED_JOBS
      const shuffled = [...FEATURED_JOBS].sort(() => 0.5 - Math.random());
      setMatchedJobs(shuffled.slice(0, 3));
    }, 2000);
  };

  const downloadSample = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Employee Name,Current Role,Primary Skills,Years of Experience,Preferred Location\n"
      + "John Smith,Senior Frontend Dev,\"React, TypeScript, Tailwind\",6,Remote\n"
      + "Jane Doe,Product Designer,\"Figma, UI/UX, Prototyping\",4,\"London, UK\"";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "layoff_support_sample.csv");
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
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center text-coral">
              <HeartHandshake size={24} />
            </div>
            <span className="micro-label text-coral">Corporate Responsibility</span>
          </div>
          <h1 className="text-5xl font-black text-teal-950 tracking-tighter mb-4">
            Layoff <span className="text-coral">Support</span> Portal
          </h1>
          <p className="text-teal-950/60 font-medium max-w-2xl">
            We help you support your departing team members by matching their skills with active opportunities across our network. Upload your talent list to begin the matching process.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Upload Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-teal-950">Talent Matching</h2>
                <button 
                  onClick={downloadSample}
                  className="flex items-center text-xs font-black uppercase tracking-widest text-coral hover:underline"
                >
                  <Download size={14} className="mr-2" /> Download Sample Template
                </button>
              </div>

              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-[40px] p-16 flex flex-col items-center justify-center text-center transition-all cursor-pointer",
                  isDragging ? "border-coral bg-coral/5 scale-[0.98]" : "border-teal-900/10 hover:border-coral/40 hover:bg-cream",
                  uploadComplete ? "bg-emerald-50 border-emerald-200" : ""
                )}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={() => simulateUpload()}
                  accept=".csv,.xlsx"
                />
                
                <AnimatePresence mode="wait">
                  {isUploading ? (
                    <motion.div 
                      key="uploading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 border-4 border-coral border-t-transparent rounded-full animate-spin mb-6" />
                      <p className="text-lg font-bold text-teal-950">Analyzing Talent DNA...</p>
                      <p className="text-sm text-teal-950/40">Running neural matching algorithms</p>
                    </motion.div>
                  ) : uploadComplete ? (
                    <motion.div 
                      key="complete"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                        <CheckCircle2 size={40} />
                      </div>
                      <p className="text-2xl font-black text-teal-950 uppercase tracking-tighter">Analysis Complete</p>
                      <p className="text-teal-950/60 font-medium mt-2">We found matches for 42 team members</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadComplete(false);
                          setMatchedJobs([]);
                        }}
                        className="mt-6 text-xs font-black uppercase tracking-widest text-teal-950/40 hover:text-coral transition-colors"
                      >
                        Upload New List
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-20 h-20 bg-cream rounded-[32px] flex items-center justify-center text-teal-950/20 mb-6 group-hover:text-coral transition-colors">
                        <Upload size={40} />
                      </div>
                      <p className="text-xl font-bold text-teal-950 mb-2">Drop your talent list here</p>
                      <p className="text-teal-950/40 text-sm font-medium">Support CSV or Excel formats (.csv, .xlsx)</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { icon: Sparkles, label: 'AI Matching', desc: 'Neural skill analysis' },
                  { icon: Globe, label: 'Global Network', desc: '12k+ Active roles' },
                  { icon: Shield, label: 'Private', desc: 'Secure data handling' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-teal-950/40 mx-auto mb-3">
                      <item.icon size={18} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-950 mb-1">{item.label}</p>
                    <p className="text-[9px] text-teal-950/40 font-bold uppercase">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-forest-teal p-12 rounded-[48px] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-black tracking-tighter uppercase mb-6">Why use Layoff Support?</h3>
                <ul className="space-y-6">
                  {[
                    "Protect your employer brand by providing meaningful outplacement.",
                    "Leverage our network to find immediate roles for departing talent.",
                    "Automated skill matching reduces manual HR workload.",
                    "Direct connection to hiring managers at top B2B companies."
                  ].map((text, i) => (
                    <li key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 bg-peach text-forest-teal rounded-full flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 size={14} />
                      </div>
                      <p className="text-white/80 font-medium">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-coral/10 rounded-full blur-[80px] -mr-32 -mt-32" />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-6">
              <div className="flex justify-between items-end mb-4">
                <h2 className="micro-label text-teal-950/40">Suggested Opportunities</h2>
                {matchedJobs.length > 0 && (
                  <span className="text-[10px] font-black text-coral uppercase tracking-widest">{matchedJobs.length} Matches Found</span>
                )}
              </div>

              <AnimatePresence mode="popLayout">
                {matchedJobs.length > 0 ? (
                  matchedJobs.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm hover:shadow-xl transition-all group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-forest-teal rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                            {job.company[0]}
                          </div>
                          <div>
                            <h4 className="font-black text-teal-950 uppercase tracking-tighter leading-none mb-1">{job.title}</h4>
                            <p className="text-[10px] font-bold text-teal-950/40 uppercase tracking-widest">{job.company}</p>
                          </div>
                        </div>
                        <div className="px-3 py-1 bg-peach/20 text-coral rounded-full text-[9px] font-black uppercase tracking-widest">
                          98% Match
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-[10px] font-black text-teal-950/40 uppercase tracking-widest">
                          <span>{job.location}</span>
                          <span className="w-1 h-1 bg-teal-950/10 rounded-full" />
                          <span>{job.salary}</span>
                        </div>
                        <Link to={`/jobs/${job.id}`} className="w-10 h-10 rounded-full border border-teal-950/10 flex items-center justify-center group-hover:bg-forest-teal group-hover:text-peach transition-all">
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white/40 border-2 border-dashed border-teal-900/5 rounded-[48px] p-20 text-center">
                    <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center text-teal-950/10 mx-auto mb-6">
                      <Search size={32} />
                    </div>
                    <p className="text-sm font-bold text-teal-950/30 uppercase tracking-widest">Upload a list to see <br />suggested matches</p>
                  </div>
                )}
              </AnimatePresence>

              {matchedJobs.length > 0 && (
                <button className="w-full py-6 bg-coral text-white rounded-[32px] font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all shadow-2xl shadow-coral/20">
                  Notify Affected Team Members
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Globe = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const Shield = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default LayoffSupport;
