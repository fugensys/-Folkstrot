import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Zap, Globe, ShieldCheck, Heart } from 'lucide-react';

const About = () => {
  return (
    <main className="pt-16 sm:pt-20">
      {/* Hero */}
      <section className="bg-cream py-12 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-teal-950 tracking-tighter leading-[0.9] mb-6 sm:mb-8"
            >
              We're Reimagining <br />
              <span className="text-coral">B2B Hiring.</span>
            </motion.h1>
            <p className="text-base sm:text-lg lg:text-xl text-teal-950/60 leading-relaxed px-2 sm:px-0">
              Folkstrot was founded on a simple premise: B2B hiring is broken. 
              We're using AI to build the bridges that connect top-tier talent with world-changing companies.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-peach/20 rounded-full blur-3xl -ml-32 -mt-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-[100px] -mr-48 -mb-48" />
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-20 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team"
                className="rounded-[32px] sm:rounded-[48px] shadow-2xl w-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 bg-forest-teal p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] text-white shadow-2xl hidden sm:block">
                <p className="text-3xl sm:text-4xl font-black text-peach mb-1 sm:mb-2">10M+</p>
                <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest opacity-60">Matches Made</p>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-5xl font-bold text-teal-950 tracking-tight">Our Mission</h2>
              <p className="text-lg sm:text-xl text-teal-950/60 leading-relaxed">
                To empower the B2B ecosystem by providing a transparent, efficient, and AI-driven hiring experience that prioritizes quality and long-term success over volume.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Target, title: "Precision", desc: "AI-driven accuracy in every match." },
                  { icon: ShieldCheck, title: "Integrity", desc: "Verified talent and companies only." },
                  { icon: Zap, title: "Speed", desc: "Reducing time-to-hire by 60%." },
                  { icon: Heart, title: "Humanity", desc: "Putting people at the center of tech." }
                ].map((item, i) => (
                  <div key={i} className="space-y-2 sm:space-y-3">
                    <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-coral">
                      <item.icon size={20} />
                    </div>
                    <h4 className="font-bold text-teal-950">{item.title}</h4>
                    <p className="text-sm text-teal-950/40 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-24 bg-forest-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
            {[
              { label: "Active Users", value: "500k+" },
              { label: "B2B Companies", value: "12k+" },
              { label: "Countries", value: "45+" },
              { label: "AI Match Rate", value: "94%" }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl sm:text-5xl font-black text-peach mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-[10px] sm:text-sm font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] opacity-40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight mb-3 sm:mb-4">Meet the Visionaries</h2>
            <p className="text-teal-950/60 text-base sm:text-lg">The minds behind the future of B2B hiring.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              { name: "Julian Vance", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
              { name: "Elena Rossi", role: "CTO", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400" },
              { name: "Marcus Thorne", role: "Head of AI", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
            ].map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative mb-4 sm:mb-6 overflow-hidden rounded-[32px] sm:rounded-[40px]">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-forest-teal/20 group-hover:bg-forest-teal/0 transition-all" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-teal-950">{member.name}</h3>
                <p className="text-coral font-bold text-xs sm:text-sm uppercase tracking-widest mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
