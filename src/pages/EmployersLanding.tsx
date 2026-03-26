import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../constants';

const EmployersLanding = () => {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-forest-teal py-20 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-6xl font-bold text-white tracking-tighter leading-tight mb-6 sm:mb-8"
            >
              Hire the Best <br />
              <span className="text-peach">B2B Talent</span> with AI.
            </motion.h1>
            <p className="text-lg sm:text-xl text-white/70 mb-8 sm:mb-10 leading-relaxed">
              Streamline your recruitment process with our AI-driven platform. From sourcing to shortlisting, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 sm:px-10 py-3.5 sm:py-4 bg-coral text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-coral/90 transition-all shadow-xl shadow-coral/20">
                Post a Job
              </button>
              <button className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white/10 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all border border-white/10">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-peach rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              { icon: ShieldCheck, title: "Verified Candidates", desc: "Every profile is vetted by our AI and human team to ensure quality." },
              { icon: Zap, title: "Instant Matching", desc: "Get a curated list of top candidates within minutes of posting." },
              { icon: MessageSquare, title: "Direct Communication", desc: "Built-in messaging and scheduling tools for seamless hiring." }
            ].map((feature, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-cream border border-teal-900/5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-forest-teal rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <feature.icon size={24} className="text-peach sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-teal-950 mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-teal-950/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-teal-950 tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-teal-950/60 text-base sm:text-lg">Choose the plan that fits your hiring needs.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div key={plan.id} className={`p-8 sm:p-10 rounded-[32px] sm:rounded-[40px] bg-white border border-teal-900/5 relative overflow-hidden flex flex-col ${plan.name === 'Premium' ? 'ring-2 ring-coral shadow-2xl' : 'shadow-sm'}`}>
                {plan.name === 'Premium' && (
                  <div className="absolute top-0 right-0 bg-coral text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-bl-xl sm:rounded-bl-2xl font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-teal-950 mb-1 sm:mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6 sm:mb-8">
                  <span className="text-4xl sm:text-5xl font-black text-teal-950">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-teal-950/40 font-bold ml-2 text-sm sm:text-base">/month</span>}
                </div>
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-teal-950/70 font-medium text-sm sm:text-base">
                      <CheckCircle2 size={18} className="text-emerald-500 mr-2.5 sm:mr-3 shrink-0 sm:w-5 sm:h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all ${plan.name === 'Premium' ? 'bg-coral text-white hover:bg-coral/90' : 'bg-forest-teal text-white hover:bg-teal-900'}`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Sales Form */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-teal p-8 sm:p-12 md:p-20 rounded-[32px] sm:rounded-[48px] text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Ready to scale your team?</h2>
              <form className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-sm font-bold text-white/60 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-peach transition-colors text-sm sm:text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="text-[10px] sm:text-sm font-bold text-white/60 uppercase tracking-widest">Work Email</label>
                  <input type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-peach transition-colors text-sm sm:text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2 sm:col-span-2">
                  <label className="text-[10px] sm:text-sm font-bold text-white/60 uppercase tracking-widest">Company Name</label>
                  <input type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-peach transition-colors text-sm sm:text-base" />
                </div>
                <div className="space-y-1.5 sm:space-y-2 sm:col-span-2">
                  <label className="text-[10px] sm:text-sm font-bold text-white/60 uppercase tracking-widest">Message</label>
                  <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 sm:py-3 outline-none focus:border-peach transition-colors text-sm sm:text-base" />
                </div>
                <button className="sm:col-span-2 bg-peach text-forest-teal py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-white transition-all flex items-center justify-center">
                  Send Inquiry <ArrowRight size={18} className="ml-2 sm:w-5 sm:h-5" />
                </button>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-coral/20 rounded-full blur-3xl -mr-32 -mt-32" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmployersLanding;
