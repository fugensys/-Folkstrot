import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Share2, 
  Loader2, 
  Phone, 
  Mail, 
  MapPin, 
  Plus,
  Trash2,
  ChevronRight,
  Play
} from 'lucide-react';
import { generateFullResume } from '../services/geminiService';
import { cn } from '../components/Navigation';
import { BackButton } from '../components/BackButton';

interface ResumeData {
  name: string;
  title: string;
  summary: string;
  qualifications: string[];
  experience: { company: string; role: string; period: string; points: string[] }[];
  education: { school: string; period: string; degree: string }[];
  skills: { name: string; level: number }[];
  clubs: { name: string; role: string; period: string }[];
  contact: { address: string; phone: string; email: string };
}

const DEFAULT_RESUME: ResumeData = {
  name: "HANNAH PANIZARES",
  title: "Environmental Science Researcher",
  summary: "Supporting our ecosystem and reversing the effects of climate change are the reasons I get up in the morning. International cooperation is necessary, but I believe it begins with uncovering new findings and developing exciting technologies through dedication and innovation.",
  qualifications: [
    "Strong academic performance in environmental biology and natural sciences.",
    "Experienced with professional lab settings, experimenting and reporting.",
    "High grasp of biochemistry, ecosystem structures, and energy conservation methods."
  ],
  experience: [
    {
      company: "Lyfe Science Co-op",
      role: "Lab Technician",
      period: "2022",
      points: [
        "Carried out everyday tasks as part of ongoing research study",
        "Reported findings, contributed hypothesis and helped co-author a professional findings report"
      ]
    },
    {
      company: "Geology Point",
      role: "Field Technician",
      period: "2023",
      points: [
        "Tested water samples around the world",
        "Drew conclusions based on highly-controlled experimentation",
        "Presented findings at a Water Stewardship Conference"
      ]
    }
  ],
  education: [
    {
      school: "UNIVERSITY OF WATERLOO",
      period: "2020-2024",
      degree: "Bachelor of Sciences, Environmental Sciences Specialist"
    }
  ],
  skills: [
    { name: "Report Findings", level: 90 },
    { name: "Lab Research", level: 80 },
    { name: "Lab Testing", level: 75 },
    { name: "Presentation", level: 65 },
    { name: "Analysis", level: 85 },
    { name: "Test Proposals", level: 70 },
    { name: "Chemistry", level: 80 },
    { name: "Experimentation", level: 75 }
  ],
  clubs: [
    {
      name: "Dragon Rowing Club",
      role: "Rower",
      period: "2021-2022"
    },
    {
      name: "Writing Help Center",
      role: "Writing Guide",
      period: "2022-2023"
    }
  ],
  contact: {
    address: "8001 Tilda Lane, Monseil, NY",
    phone: "1-905-509-5900",
    email: "afournier@uwaterloo.com"
  }
};

const AIResumeBuilder = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");
  const [resumeData, setResumeData] = React.useState<ResumeData>(DEFAULT_RESUME);
  const [activeEditorSection, setActiveEditorSection] = React.useState<string>("personal");

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    const data = await generateFullResume(prompt);
    if (data) setResumeData(data);
    setIsGenerating(false);
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          // Fix for html2canvas not supporting oklch/oklab colors
          const elements = clonedDoc.getElementsByTagName('*');
          for (let i = 0; i < elements.length; i++) {
            const el = elements[i] as HTMLElement;
            const style = window.getComputedStyle(el);
            
            // Helper to convert oklch/oklab to rgb if found in computed styles
            // Note: This is a simplified fix that replaces problematic color functions
            // with a fallback color or tries to strip them.
            ['color', 'backgroundColor', 'borderColor', 'outlineColor'].forEach(prop => {
              const value = (el.style as any)[prop] || style.getPropertyValue(prop);
              if (value && (value.includes('oklch') || value.includes('oklab'))) {
                // Fallback to a safe color if modern colors are detected
                (el.style as any)[prop] = 'currentColor';
              }
            });
          }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="candidate" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <BackButton />
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-teal-950 tracking-tighter mb-2">
              AI Resume <span className="text-coral">Builder</span>
            </h1>
            <p className="text-teal-950/60 font-medium">
              Generate a professional, high-impact resume in seconds using Gemini AI.
            </p>
          </div>

          <div className="flex space-x-3">
            <button 
              onClick={() => window.print()}
              className="p-3 bg-white border border-teal-900/10 rounded-2xl text-teal-950 hover:bg-teal-50 transition-all"
            >
              <Printer size={20} />
            </button>
            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center space-x-2 px-6 py-3 bg-forest-teal text-white rounded-2xl font-bold text-sm hover:bg-teal-900 transition-all shadow-lg shadow-teal-900/10 disabled:opacity-50"
            >
              {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Controls */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center text-coral">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold text-teal-950">AI Generation</h2>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-teal-950/60 uppercase tracking-widest">
                  What kind of job are you targeting?
                </label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Senior Environmental Researcher with 5 years of experience in water testing and biochemistry..."
                  className="w-full h-32 p-4 bg-cream border border-teal-900/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all resize-none"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className="w-full py-4 bg-coral text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-coral/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-coral/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Generating with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      <span>Generate Resume Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-teal-950">Resume Editor</h3>
                <div className="flex space-x-1 bg-cream p-1 rounded-xl">
                  {['personal', 'experience', 'education', 'skills', 'extra'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveEditorSection(section)}
                      className={cn(
                        "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all",
                        activeEditorSection === section ? "bg-white text-coral shadow-sm" : "text-teal-950/40 hover:text-teal-950"
                      )}
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {activeEditorSection === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value={resumeData.name}
                          onChange={(e) => setResumeData({...resumeData, name: e.target.value})}
                          className="w-full p-3 bg-cream border border-teal-900/10 rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-2">Job Title</label>
                        <input 
                          type="text" 
                          value={resumeData.title}
                          onChange={(e) => setResumeData({...resumeData, title: e.target.value})}
                          className="w-full p-3 bg-cream border border-teal-900/10 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-2">Summary</label>
                      <textarea 
                        value={resumeData.summary}
                        onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
                        className="w-full h-24 p-3 bg-cream border border-teal-900/10 rounded-xl text-sm resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-2">Phone</label>
                        <input 
                          type="text" 
                          value={resumeData.contact.phone}
                          onChange={(e) => setResumeData({...resumeData, contact: {...resumeData.contact, phone: e.target.value}})}
                          className="w-full p-3 bg-cream border border-teal-900/10 rounded-xl text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-2">Email</label>
                        <input 
                          type="text" 
                          value={resumeData.contact.email}
                          onChange={(e) => setResumeData({...resumeData, contact: {...resumeData.contact, email: e.target.value}})}
                          className="w-full p-3 bg-cream border border-teal-900/10 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeEditorSection === 'experience' && (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 bg-cream rounded-2xl border border-teal-900/5 relative group">
                        <button 
                          onClick={() => {
                            const newExp = [...resumeData.experience];
                            newExp.splice(idx, 1);
                            setResumeData({...resumeData, experience: newExp});
                          }}
                          className="absolute top-2 right-2 p-1.5 text-teal-950/20 hover:text-coral opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <input 
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[idx].company = e.target.value;
                              setResumeData({...resumeData, experience: newExp});
                            }}
                            className="p-2 bg-white border border-teal-900/10 rounded-lg text-xs font-bold"
                          />
                          <input 
                            placeholder="Period"
                            value={exp.period}
                            onChange={(e) => {
                              const newExp = [...resumeData.experience];
                              newExp[idx].period = e.target.value;
                              setResumeData({...resumeData, experience: newExp});
                            }}
                            className="p-2 bg-white border border-teal-900/10 rounded-lg text-xs"
                          />
                        </div>
                        <input 
                          placeholder="Role"
                          value={exp.role}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience];
                            newExp[idx].role = e.target.value;
                            setResumeData({...resumeData, experience: newExp});
                          }}
                          className="w-full p-2 bg-white border border-teal-900/10 rounded-lg text-xs mb-3"
                        />
                        <div className="space-y-2">
                          {exp.points.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-center space-x-2">
                              <input 
                                value={point}
                                onChange={(e) => {
                                  const newExp = [...resumeData.experience];
                                  newExp[idx].points[pIdx] = e.target.value;
                                  setResumeData({...resumeData, experience: newExp});
                                }}
                                className="flex-1 p-2 bg-white border border-teal-900/10 rounded-lg text-[10px]"
                              />
                              <button 
                                onClick={() => {
                                  const newExp = [...resumeData.experience];
                                  newExp[idx].points.splice(pIdx, 1);
                                  setResumeData({...resumeData, experience: newExp});
                                }}
                                className="text-teal-950/20 hover:text-coral"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                          <button 
                            onClick={() => {
                              const newExp = [...resumeData.experience];
                              newExp[idx].points.push("");
                              setResumeData({...resumeData, experience: newExp});
                            }}
                            className="text-[10px] font-bold text-coral flex items-center space-x-1"
                          >
                            <Plus size={12} />
                            <span>Add Point</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => setResumeData({
                        ...resumeData, 
                        experience: [...resumeData.experience, { company: "", role: "", period: "", points: [""] }]
                      })}
                      className="w-full py-3 border-2 border-dashed border-teal-900/10 rounded-2xl text-teal-950/40 hover:text-coral hover:border-coral/20 transition-all font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <Plus size={14} />
                      <span>Add Experience</span>
                    </button>
                  </div>
                )}

                {activeEditorSection === 'education' && (
                  <div className="space-y-6">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="p-4 bg-cream rounded-2xl border border-teal-900/5 relative group">
                        <button 
                          onClick={() => {
                            const newEdu = [...resumeData.education];
                            newEdu.splice(idx, 1);
                            setResumeData({...resumeData, education: newEdu});
                          }}
                          className="absolute top-2 right-2 p-1.5 text-teal-950/20 hover:text-coral opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                        <input 
                          placeholder="School"
                          value={edu.school}
                          onChange={(e) => {
                            const newEdu = [...resumeData.education];
                            newEdu[idx].school = e.target.value;
                            setResumeData({...resumeData, education: newEdu});
                          }}
                          className="w-full p-2 bg-white border border-teal-900/10 rounded-lg text-xs font-bold mb-3"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[idx].degree = e.target.value;
                              setResumeData({...resumeData, education: newEdu});
                            }}
                            className="p-2 bg-white border border-teal-900/10 rounded-lg text-xs"
                          />
                          <input 
                            placeholder="Period"
                            value={edu.period}
                            onChange={(e) => {
                              const newEdu = [...resumeData.education];
                              newEdu[idx].period = e.target.value;
                              setResumeData({...resumeData, education: newEdu});
                            }}
                            className="p-2 bg-white border border-teal-900/10 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => setResumeData({
                        ...resumeData, 
                        education: [...resumeData.education, { school: "", period: "", degree: "" }]
                      })}
                      className="w-full py-3 border-2 border-dashed border-teal-900/10 rounded-2xl text-teal-950/40 hover:text-coral hover:border-coral/20 transition-all font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <Plus size={14} />
                      <span>Add Education</span>
                    </button>
                  </div>
                )}

                {activeEditorSection === 'skills' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {resumeData.skills.map((skill, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <input 
                            value={skill.name}
                            onChange={(e) => {
                              const newSkills = [...resumeData.skills];
                              newSkills[idx].name = e.target.value;
                              setResumeData({...resumeData, skills: newSkills});
                            }}
                            className="flex-1 p-2 bg-cream border border-teal-900/10 rounded-lg text-[10px] font-bold"
                          />
                          <input 
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => {
                              const newSkills = [...resumeData.skills];
                              newSkills[idx].level = parseInt(e.target.value) || 0;
                              setResumeData({...resumeData, skills: newSkills});
                            }}
                            className="w-12 p-2 bg-cream border border-teal-900/10 rounded-lg text-[10px]"
                          />
                          <button 
                            onClick={() => {
                              const newSkills = [...resumeData.skills];
                              newSkills.splice(idx, 1);
                              setResumeData({...resumeData, skills: newSkills});
                            }}
                            className="text-teal-950/20 hover:text-coral"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setResumeData({
                        ...resumeData, 
                        skills: [...resumeData.skills, { name: "New Skill", level: 80 }]
                      })}
                      className="w-full py-3 border-2 border-dashed border-teal-900/10 rounded-2xl text-teal-950/40 hover:text-coral hover:border-coral/20 transition-all font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <Plus size={14} />
                      <span>Add Skill</span>
                    </button>
                  </div>
                )}

                {activeEditorSection === 'extra' && (
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-4">Qualifications</h4>
                      <div className="space-y-2">
                        {resumeData.qualifications.map((q, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input 
                              value={q}
                              onChange={(e) => {
                                const newQuals = [...resumeData.qualifications];
                                newQuals[idx] = e.target.value;
                                setResumeData({...resumeData, qualifications: newQuals});
                              }}
                              className="flex-1 p-2 bg-cream border border-teal-900/10 rounded-lg text-[10px]"
                            />
                            <button 
                              onClick={() => {
                                const newQuals = [...resumeData.qualifications];
                                newQuals.splice(idx, 1);
                                setResumeData({...resumeData, qualifications: newQuals});
                              }}
                              className="text-teal-950/20 hover:text-coral"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => setResumeData({
                            ...resumeData, 
                            qualifications: [...resumeData.qualifications, "New qualification..."]
                          })}
                          className="text-[10px] font-bold text-coral flex items-center space-x-1"
                        >
                          <Plus size={12} />
                          <span>Add Qualification</span>
                        </button>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-[10px] font-bold text-teal-950/40 uppercase tracking-widest mb-4">Clubs & Associations</h4>
                      <div className="space-y-4">
                        {resumeData.clubs.map((club, idx) => (
                          <div key={idx} className="p-4 bg-cream rounded-2xl border border-teal-900/5 relative group">
                            <button 
                              onClick={() => {
                                const newClubs = [...resumeData.clubs];
                                newClubs.splice(idx, 1);
                                setResumeData({...resumeData, clubs: newClubs});
                              }}
                              className="absolute top-2 right-2 p-1.5 text-teal-950/20 hover:text-coral opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                            <input 
                              placeholder="Club Name"
                              value={club.name}
                              onChange={(e) => {
                                const newClubs = [...resumeData.clubs];
                                newClubs[idx].name = e.target.value;
                                setResumeData({...resumeData, clubs: newClubs});
                              }}
                              className="w-full p-2 bg-white border border-teal-900/10 rounded-lg text-xs font-bold mb-2"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input 
                                placeholder="Role"
                                value={club.role}
                                onChange={(e) => {
                                  const newClubs = [...resumeData.clubs];
                                  newClubs[idx].role = e.target.value;
                                  setResumeData({...resumeData, clubs: newClubs});
                                }}
                                className="p-2 bg-white border border-teal-900/10 rounded-lg text-[10px]"
                              />
                              <input 
                                placeholder="Period"
                                value={club.period}
                                onChange={(e) => {
                                  const newClubs = [...resumeData.clubs];
                                  newClubs[idx].period = e.target.value;
                                  setResumeData({...resumeData, clubs: newClubs});
                                }}
                                className="p-2 bg-white border border-teal-900/10 rounded-lg text-[10px]"
                              />
                            </div>
                          </div>
                        ))}
                        <button 
                          onClick={() => setResumeData({
                            ...resumeData, 
                            clubs: [...resumeData.clubs, { name: "", role: "", period: "" }]
                          })}
                          className="w-full py-3 border-2 border-dashed border-teal-900/10 rounded-2xl text-teal-950/40 hover:text-coral hover:border-coral/20 transition-all font-bold text-xs flex items-center justify-center space-x-2"
                        >
                          <Plus size={14} />
                          <span>Add Club</span>
                        </button>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Preview (Matching the image) */}
          <div className="relative">
            <div 
              ref={resumeRef}
              className="sticky top-8 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-teal-900/10 max-w-[800px] mx-auto aspect-[1/1.414] print:shadow-none print:rounded-none"
            >
              <div className="flex h-full">
                {/* Left Column (Yellow) */}
                <div className="w-[35%] bg-[#F5B041] p-8 flex flex-col">
                  <div className="mb-8">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-[rgba(255,255,255,0.2)] shadow-xl">
                      <img 
                        src="https://picsum.photos/seed/hannah/400/400" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-[#1A1A1A] leading-tight mb-2 tracking-tighter">
                      {resumeData.name}
                    </h2>
                    <p className="text-[#1A1A1A] opacity-70 text-sm font-bold uppercase tracking-widest leading-tight">
                      {resumeData.title}
                    </p>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-[0.2em] mb-4 border-b border-[rgba(26,26,26,0.2)] pb-2">Summary</h3>
                      <p className="text-[#1A1A1A] opacity-80 text-[11px] leading-relaxed font-medium">
                        {resumeData.summary}
                      </p>
                    </section>

                    <section>
                      <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-[0.2em] mb-4 border-b border-[rgba(26,26,26,0.2)] pb-2">Qualifications</h3>
                      <ul className="space-y-3">
                        {resumeData.qualifications.map((q, i) => (
                          <li key={i} className="text-[#1A1A1A] opacity-80 text-[11px] leading-relaxed font-medium">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-sm font-black text-[#1A1A1A] uppercase tracking-[0.2em] mb-4 border-b border-[rgba(26,26,26,0.2)] pb-2">Clubs & Associations</h3>
                      <div className="space-y-4">
                        {resumeData.clubs.map((club, i) => (
                          <div key={i}>
                            <h4 className="text-[12px] font-black text-[#1A1A1A]">{club.name}</h4>
                            <p className="text-[10px] text-[#1A1A1A] opacity-70 font-bold">{club.role}</p>
                            <p className="text-[10px] text-[#1A1A1A] opacity-70 font-bold">{club.period}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>

                {/* Right Column (Dark) */}
                <div className="w-[65%] bg-[#2D2D2D] p-10 text-white flex flex-col relative">
                  {/* Dotted Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                  
                  <div className="relative z-10">
                    {/* Contact Info */}
                    <div className="space-y-4 mb-12">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border border-[#F5B041] flex items-center justify-center text-[#F5B041]">
                        <Play size={16} className="rotate-90" />
                      </div>
                      <span className="text-xs font-medium text-white opacity-80">{resumeData.contact.address}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border border-[#F5B041] flex items-center justify-center text-[#F5B041]">
                        <Phone size={16} />
                      </div>
                      <span className="text-xs font-medium text-white opacity-80">{resumeData.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border border-[#F5B041] flex items-center justify-center text-[#F5B041]">
                        <Mail size={16} />
                      </div>
                      <span className="text-xs font-medium text-white opacity-80">{resumeData.contact.email}</span>
                    </div>
                  </div>

                  <div className="space-y-12">
                    <section>
                      <h3 className="text-lg font-black text-[#F5B041] uppercase tracking-[0.15em] mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2">Education</h3>
                      {resumeData.education.map((edu, i) => (
                        <div key={i} className="mb-4">
                          <h4 className="text-sm font-black text-white mb-1">{edu.school}</h4>
                          <p className="text-xs font-bold text-white opacity-60 mb-1">{edu.period}</p>
                          <p className="text-xs italic text-white opacity-80">{edu.degree}</p>
                        </div>
                      ))}
                    </section>

                    <section>
                      <h3 className="text-lg font-black text-[#F5B041] uppercase tracking-[0.15em] mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2">Co-op Placement Experience</h3>
                      <div className="space-y-8">
                        {resumeData.experience.map((exp, i) => (
                          <div key={i}>
                            <h4 className="text-sm font-black text-white mb-1">{exp.company}</h4>
                            <p className="text-xs font-bold text-white opacity-60 mb-3 italic">{exp.period} {exp.role}</p>
                            <ul className="space-y-2 list-disc pl-4">
                              {exp.points.map((p, j) => (
                                <li key={j} className="text-[11px] text-white opacity-70 leading-relaxed">{p}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-black text-[#F5B041] uppercase tracking-[0.15em] mb-6 border-b border-[rgba(255,255,255,0.1)] pb-2">Skills & Expertise</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {resumeData.skills.map((skill, i) => (
                          <div key={i} className={cn("flex items-center justify-between", i >= 4 ? "flex-row-reverse" : "")}>
                            <span className="text-[10px] font-bold text-white opacity-80 w-24">{skill.name}</span>
                            <div className="flex-1 h-2 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden mx-2">
                              <div 
                                className="h-full bg-[#F5B041]" 
                                style={{ width: `${skill.level}%` }} 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIResumeBuilder;
