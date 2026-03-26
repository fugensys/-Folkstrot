import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-950 text-white pt-20 pb-10 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-peach/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-coral rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg shadow-coral/20">
                <Briefcase size={24} />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase italic">Folkstrot</span>
            </Link>
            <p className="text-white/60 font-medium leading-relaxed">
              The next-generation B2B talent network powered by neural matching. Connecting elite talent with industry leaders across the global tech ecosystem.
            </p>
            <div className="flex items-center space-x-4">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-coral hover:text-white transition-all border border-white/10"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-coral mb-8">Platform</h4>
            <ul className="space-y-4">
              {['Find Jobs', 'Post a Job', 'AI Resume Builder', 'Employers', 'Pricing'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Find Jobs' ? '/jobs' : link === 'Employers' ? '/employers' : '#'} 
                    className="text-white/60 hover:text-peach transition-colors font-medium flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-coral mb-8">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Mission', 'B2B Network', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'About Us' ? '/about' : '#'} 
                    className="text-white/60 hover:text-peach transition-colors font-medium flex items-center group"
                  >
                    <ArrowRight size={12} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-coral mb-8">Contact</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-coral border border-white/10 shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="text-white/60 font-medium text-sm pt-2">
                  123 Neural Way, Silicon Valley<br />California, CA 94025
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-coral border border-white/10 shrink-0">
                  <Mail size={18} />
                </div>
                <span className="text-white/60 font-medium text-sm">support@folkstrot.com</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-coral border border-white/10 shrink-0">
                  <Phone size={18} />
                </div>
                <span className="text-white/60 font-medium text-sm">+1 (555) 000-1234</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
            © {currentYear} Folkstrot Neural Network. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-8">
            <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-coral transition-colors">Status</Link>
            <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-coral transition-colors">Security</Link>
            <Link to="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-coral transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
