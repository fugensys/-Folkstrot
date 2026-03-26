import React from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
import { Search, MapPin, Briefcase, Star, CheckCircle2, ArrowRight, Sparkles, Globe, Shield, Zap, Building2, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FEATURED_JOBS, CATEGORIES } from '../constants';

const Home = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1920",
      title: "AI Powered",
      subtitle: "Talent hiring",
      description: "Folkstrot uses advanced neural matching to connect elite B2B professionals with their next defining roles."
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1920",
      title: "Neural",
      subtitle: "Matching",
      description: "Our proprietary algorithm ensures cultural and technical alignment between talent and companies."
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1920",
      title: "Elite",
      subtitle: "B2B Network",
      description: "Join the top 3% of B2B professionals and get matched with high-growth companies globally."
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white overflow-hidden">
      {/* Hero Section - LeapScholar Style */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-coral/10 rounded-full mb-8">
                <Sparkles size={16} className="text-coral" />
                <span className="text-[10px] font-black uppercase tracking-widest text-coral">AI-Powered Talent Network</span>
              </div>
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.1] tracking-tight font-black text-teal-950 mb-8">
                AI Powered <br />
                <span className="text-coral">Talent hiring</span>
              </h1>
              <p className="text-xl text-teal-950/60 font-medium leading-relaxed mb-10 max-w-xl">
                Folkstrot uses advanced neural matching to connect elite B2B professionals with their next defining roles. Join the top 3% of talent today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/jobs" className="px-10 py-5 bg-teal-950 text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-coral transition-all shadow-2xl shadow-teal-950/20 hover:scale-105 active:scale-95 text-center">
                  Explore Jobs
                </Link>
                <Link to="/employers" className="px-10 py-5 border-2 border-teal-950 text-teal-950 rounded-full text-sm font-black uppercase tracking-widest hover:bg-teal-950 hover:text-white transition-all hover:scale-105 active:scale-95 text-center">
                  Hire Talent
                </Link>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=folkstrot-${i}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} className="fill-coral text-coral" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-teal-950/60 uppercase tracking-widest">Trusted by 10k+ Professionals</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" 
                  alt="Professional IT Team" 
                  className="w-full aspect-[4/5] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-1/4 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-teal-950/5"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-teal-950">Match Found</p>
                    <p className="text-[10px] font-bold text-teal-950/40">98% Compatibility</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-8 bottom-1/4 z-20 bg-teal-950 p-6 rounded-3xl shadow-2xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-coral rounded-2xl flex items-center justify-center text-white">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white">New Offer</p>
                    <p className="text-[10px] font-bold text-white/40">$140k - $180k</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-coral/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-950/5 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section - Brutalist Marquee */}
      <section className="py-12 bg-white border-y-2 border-teal-950 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee group">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-16 px-8">
              {['Quantum', 'Nexus', 'Skyline', 'Vortex', 'Aether', 'Zenith'].map((brand) => (
                <span key={brand} className="text-4xl font-black tracking-tighter text-teal-950 uppercase opacity-20 hover:opacity-100 transition-opacity cursor-default">
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Features Bento Grid - Hardware/Specialist Tool Aesthetic */}
      <section className="py-20 sm:py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="micro-label text-coral mb-4 block">Engineered for Success</span>
              <h2 className="text-4xl sm:text-7xl font-black tracking-tighter text-teal-950 uppercase leading-[0.85]">
                The Talent <br />
                <span className="text-coral italic font-serif lowercase">Operating</span> System
              </h2>
            </div>
            <div className="lg:w-1/3">
              <p className="text-teal-950/60 font-medium leading-relaxed text-sm sm:text-base">
                We've rebuilt the hiring process from the ground up, focusing on data precision and human connection.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:h-[800px]">
            {/* Main Feature */}
            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="lg:col-span-8 bg-forest-teal rounded-[40px] sm:rounded-[60px] p-8 sm:p-16 text-white relative overflow-hidden group flex flex-col justify-between min-h-[400px] lg:min-h-0"
            >
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-peach/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-peach mb-6 sm:mb-10 border border-peach/20">
                  <Zap size={24} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase mb-4 sm:mb-6 leading-none">Neural <br />Matching Engine</h3>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                  Our proprietary algorithm analyzes over 200 data points to ensure cultural and technical alignment between talent and companies.
                </p>
              </div>
              
              {/* Hardware-style UI elements */}
              <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 flex space-x-4 opacity-40">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-dashed border-white/20 flex items-center justify-center animate-spin-slow">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-white/10" />
                </div>
                <div className="hidden sm:flex flex-col justify-center space-y-2">
                  <div className="h-1 w-24 bg-peach/20 rounded-full overflow-hidden">
                    <motion.div animate={{ x: [-100, 100] }} transition={{ duration: 3, repeat: Infinity }} className="h-full w-1/2 bg-peach" />
                  </div>
                  <div className="h-1 w-16 bg-peach/20 rounded-full overflow-hidden">
                    <motion.div animate={{ x: [100, -100] }} transition={{ duration: 2, repeat: Infinity }} className="h-full w-1/2 bg-coral" />
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(255,127,80,0.1),transparent_60%)]" />
            </motion.div>

            {/* Side Features */}
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="bg-coral rounded-[40px] sm:rounded-[60px] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden min-h-[250px] lg:min-h-0"
              >
                <Shield size={32} className="relative z-10 sm:w-10 sm:h-10" />
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase mb-3 sm:mb-4">Vetted <br />Network</h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                    Only the top 3% of B2B professionals are admitted to our exclusive talent network.
                  </p>
                </div>
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="bg-white rounded-[40px] sm:rounded-[60px] p-8 sm:p-12 border-2 border-teal-950 flex flex-col justify-between group min-h-[250px] lg:min-h-0"
              >
                <Globe size={32} className="text-forest-teal group-hover:rotate-12 transition-transform sm:w-10 sm:h-10" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tighter text-teal-950 uppercase mb-3 sm:mb-4">Global <br />Reach</h3>
                  <p className="text-teal-950/50 text-xs sm:text-sm leading-relaxed">
                    Connect with high-growth companies across North America, Europe, and Asia.
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Immersive Testimonials - Atmospheric/Cinematic Style */}
      <section className="py-24 sm:py-40 bg-forest-teal relative overflow-hidden">
        {/* Deep Atmospheric Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-coral/20 rounded-full blur-[100px] sm:blur-[160px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-peach/10 rounded-full blur-[80px] sm:blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 sm:mb-32">
            <span className="micro-label text-peach mb-6 block">Success Stories</span>
            <h2 className="text-[clamp(2.5rem,10vw,8rem)] font-black tracking-tighter text-white uppercase leading-[0.8] mb-8">
              Human <br />
              <span className="text-peach italic font-serif lowercase">at the</span> <br />
              Center
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16">
            {[
              {
                name: "Sarah Jenkins",
                role: "VP of Product, Quantum",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
                quote: "Folkstrot transformed our hiring pipeline. We found our lead designer in 48 hours, and the cultural fit was immediate."
              },
              {
                name: "David Chen",
                role: "Senior Engineer, Nexus",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
                quote: "The neural matching is scary accurate. I've never felt more aligned with a company's mission and technical stack."
              }
            ].map((testimonial, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-dark p-8 sm:p-16 rounded-[40px] sm:rounded-[80px] flex flex-col gap-8 sm:gap-12 group"
              >
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-[20px] sm:rounded-[32px] overflow-hidden shadow-2xl group-hover:rotate-6 transition-transform">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-peach font-black text-xl sm:text-2xl uppercase tracking-tight">{testimonial.name}</p>
                    <p className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em]">{testimonial.role}</p>
                  </div>
                </div>
                <div className="relative">
                  <span className="text-peach text-6xl sm:text-8xl font-serif italic absolute -top-8 sm:-top-12 -left-4 sm:-left-8 opacity-20">"</span>
                  <p className="text-white/90 text-lg sm:text-2xl font-medium italic leading-relaxed relative z-10">
                    {testimonial.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs - Technical Data Grid Redesign */}
      <section className="py-24 sm:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-24 gap-8">
            <div>
              <span className="micro-label text-coral mb-4 block">Curated Opportunities</span>
              <h2 className="text-4xl sm:text-7xl font-black tracking-tighter text-teal-950 uppercase leading-[0.85]">Market <br />Openings</h2>
            </div>
            <Link to="/jobs" className="group flex items-center space-x-4 sm:space-x-6 bg-cream px-6 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border border-teal-950/5 hover:bg-teal-950 transition-all">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-teal-950 group-hover:text-peach transition-colors">View All Jobs</span>
              <ArrowRight size={18} className="text-coral group-hover:translate-x-2 transition-transform sm:w-5 sm:h-5" />
            </Link>
          </div>

          <div className="border-t-2 border-teal-950">
            {FEATURED_JOBS.slice(0, 5).map((job) => (
              <Link 
                key={job.id} 
                to={`/jobs/${job.id}`}
                className="flex flex-col sm:grid sm:grid-cols-12 items-start sm:items-center py-8 sm:py-12 px-4 sm:px-8 border-b border-teal-950/10 hover:bg-forest-teal hover:text-white transition-all group relative overflow-hidden"
              >
                <div className="sm:col-span-5 mb-6 sm:mb-0">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-coral mb-1 sm:mb-2 block group-hover:text-peach transition-colors">Position</span>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tighter uppercase leading-none mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-teal-950/5 rounded-md flex items-center justify-center text-teal-950 group-hover:bg-white/10 group-hover:text-peach">
                      <Building2 size={10} className="sm:w-3 sm:h-3" />
                    </div>
                    <p className="font-serif italic text-sm sm:text-base text-teal-950/60 group-hover:text-white/60">{job.company}</p>
                  </div>
                </div>
                
                <div className="sm:col-span-3 mb-4 sm:mb-0">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-teal-950/30 mb-1 sm:mb-2 block group-hover:text-white/30">Location</span>
                  <div className="flex items-center space-x-2">
                    <MapPin size={12} className="text-coral sm:w-3.5 sm:h-3.5" />
                    <p className="font-mono text-xs sm:text-sm uppercase tracking-tight">{job.location}</p>
                  </div>
                </div>

                <div className="sm:col-span-3 mb-6 sm:mb-0">
                  <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-teal-950/30 mb-1 sm:mb-2 block group-hover:text-white/30">Compensation</span>
                  <p className="font-mono text-xs sm:text-sm font-bold">{job.salary}</p>
                </div>

                <div className="sm:col-span-1 flex justify-end w-full sm:w-auto">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-2 border-teal-950 flex items-center justify-center group-hover:border-peach group-hover:bg-peach group-hover:text-forest-teal transition-all">
                    <ArrowRight size={20} className="sm:w-6 sm:h-6" />
                  </div>
                </div>

                {/* Hover Accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-coral scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Bold Split Layout */}
      <section className="min-h-[80vh] flex flex-col lg:flex-row">
        <div className="flex-1 bg-coral p-12 sm:p-20 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] sm:text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter text-white uppercase leading-[0.85] mb-8 sm:mb-12">
              Join the <br />
              <span className="text-peach italic font-serif lowercase">definitive</span> <br />
              Network
            </h2>
            <div className="relative group inline-block">
              <button className="inline-flex items-center space-x-4 sm:space-x-6 px-8 sm:px-12 py-6 sm:py-8 bg-forest-teal text-peach rounded-full text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-teal-950 transition-all shadow-2xl hover:scale-105 active:scale-95">
                <span>Sign Up</span>
                <Menu size={18} className="sm:w-5 sm:h-5" />
              </button>
              
              {/* Dropdown */}
              <div className="absolute bottom-full left-0 mb-4 w-56 sm:w-64 bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl border border-teal-950/5 py-3 sm:py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-bottom-left scale-95 group-hover:scale-100 z-50">
                <Link 
                  to="/signup-candidate" 
                  className="flex items-center space-x-3 sm:space-x-4 px-6 sm:px-8 py-3 sm:py-4 text-teal-950 hover:bg-coral/10 transition-colors"
                >
                  <User size={18} className="text-coral sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">As Candidate</span>
                </Link>
                <Link 
                  to="/signup-employer" 
                  className="flex items-center space-x-3 sm:space-x-4 px-6 sm:px-8 py-3 sm:py-4 text-teal-950 hover:bg-coral/10 transition-colors"
                >
                  <Building2 size={18} className="text-coral sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-widest">As Employer</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="flex-1 bg-forest-teal p-12 sm:p-20 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] sm:text-[clamp(3rem,8vw,8rem)] font-black tracking-tighter text-white uppercase leading-[0.85] mb-8 sm:mb-12">
              Hire <br />
              <span className="text-coral italic font-serif lowercase">with</span> <br />
              Precision
            </h2>
            <Link to="/employers" className="inline-flex items-center space-x-4 sm:space-x-6 px-8 sm:px-12 py-6 sm:py-8 border-2 border-peach text-peach rounded-full text-xs sm:text-sm font-black uppercase tracking-widest hover:bg-peach hover:text-forest-teal transition-all hover:scale-105 active:scale-95">
              <span>Hire Talent</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
        </div>
      </section>
    </main>
  );
};

export default Home;
