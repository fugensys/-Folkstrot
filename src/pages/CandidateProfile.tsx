import React from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  Mail, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Download, 
  Edit3, 
  Plus,
  CheckCircle2,
  Award
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BackButton } from '../components/BackButton';

const skillsData = [
  { subject: 'UI Design', A: 120, fullMark: 150 },
  { subject: 'React', A: 98, fullMark: 150 },
  { subject: 'TypeScript', A: 86, fullMark: 150 },
  { subject: 'Product', A: 99, fullMark: 150 },
  { subject: 'UX Research', A: 85, fullMark: 150 },
  { subject: 'Node.js', A: 65, fullMark: 150 },
];

const CandidateProfile = () => {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="candidate" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <BackButton />
          {/* Profile Header */}
          <header className="bg-white rounded-[48px] p-12 border border-teal-900/5 shadow-sm mb-12 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="relative">
                <div className="w-40 h-40 bg-forest-teal rounded-[40px] flex items-center justify-center text-white text-6xl font-black shadow-2xl">
                  AR
                </div>
                <button className="absolute -bottom-2 -right-2 p-3 bg-coral text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                  <Edit3 size={20} />
                </button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-4xl font-black text-teal-950 tracking-tighter">Alex Rivera</h1>
                  <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest flex items-center self-center md:self-auto">
                    <CheckCircle2 size={14} className="mr-2" /> Open to Work
                  </span>
                </div>
                <p className="text-xl text-teal-950/60 font-medium mb-6">Senior Product Designer & Frontend Enthusiast</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-teal-950/40 font-bold text-sm uppercase tracking-widest">
                  <div className="flex items-center"><MapPin size={16} className="mr-2" /> London, UK</div>
                  <div className="flex items-center"><Mail size={16} className="mr-2" /> alex.rivera@design.com</div>
                  <div className="flex items-center"><Globe size={16} className="mr-2" /> alexrivera.design</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button className="px-8 py-3 bg-forest-teal text-white rounded-xl font-bold hover:bg-teal-900 transition-all flex items-center justify-center">
                  <Download size={18} className="mr-2" /> Resume
                </button>
                <div className="flex gap-2">
                  <button className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach/20 transition-all flex-1 flex justify-center"><Linkedin size={20} /></button>
                  <button className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach/20 transition-all flex-1 flex justify-center"><Github size={20} /></button>
                </div>
              </div>
            </div>
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-peach/10 rounded-full blur-3xl -mr-32 -mt-32" />
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Skills & Data */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
                <h3 className="text-xl font-bold text-teal-950 mb-8">Skills Matrix</h3>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                      <PolarGrid stroke="#064e3b10" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#022c22', opacity: 0.4, fontSize: 10, fontWeight: 700 }} />
                      <Radar
                        name="Alex"
                        dataKey="A"
                        stroke="#ff7f50"
                        fill="#ff7f50"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-forest-teal p-8 rounded-[40px] text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6">Certifications</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Google UX Design Professional', issuer: 'Coursera', date: '2023' },
                    { name: 'Advanced React Patterns', issuer: 'Frontend Masters', date: '2022' }
                  ].map((cert, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="p-2 bg-white/10 rounded-xl">
                        <Award className="text-peach" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{cert.name}</p>
                        <p className="text-xs text-white/40 mt-1">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 bg-white/10 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                  Add Certification
                </button>
              </div>
            </div>

            {/* Right Column - Experience & About */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[40px] border border-teal-900/5 shadow-sm">
                <h3 className="text-2xl font-bold text-teal-950 mb-6">About Me</h3>
                <p className="text-teal-950/60 leading-relaxed text-lg">
                  Passionate Product Designer with over 6 years of experience in building scalable B2B SaaS products. 
                  I bridge the gap between complex technical requirements and intuitive user experiences. 
                  Expert in React, TypeScript, and Figma.
                </p>
              </div>

              <div className="bg-white p-10 rounded-[40px] border border-teal-900/5 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold text-teal-950">Experience</h3>
                  <button className="p-2 bg-cream text-teal-950 rounded-xl hover:bg-peach/20 transition-all">
                    <Plus size={20} />
                  </button>
                </div>
                
                <div className="space-y-10 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-teal-900/5" />
                  
                  {[
                    { 
                      role: 'Senior Product Designer', 
                      company: 'TechFlow Systems', 
                      period: '2021 - Present',
                      desc: 'Leading the design system team and overseeing the UX for the core enterprise dashboard.'
                    },
                    { 
                      role: 'UI/UX Designer', 
                      company: 'CreativePulse', 
                      period: '2018 - 2021',
                      desc: 'Designed and launched 12+ mobile and web applications for B2B clients.'
                    }
                  ].map((exp, i) => (
                    <div key={i} className="relative pl-16">
                      <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-coral border-4 border-white shadow-sm" />
                      <h4 className="text-xl font-bold text-teal-950">{exp.role}</h4>
                      <p className="text-coral font-bold text-sm mb-3">{exp.company} • {exp.period}</p>
                      <p className="text-teal-950/60 leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateProfile;
