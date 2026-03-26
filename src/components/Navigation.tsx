import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, User, Building2, LayoutDashboard, LogOut, Menu, X, Heart, Sparkles, MessageSquare, Settings, HeartHandshake, CreditCard, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();
  const { user, isAuthenticated, dbConnected } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Find Jobs', href: '/jobs' },
    { name: 'Employers', href: '/employers' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-teal-900/5 py-4",
      scrolled ? "shadow-md" : ""
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-forest-teal rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-peach font-black text-2xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-teal-950 leading-none">Folkstrot</span>
              <span className="micro-label text-coral">B2B Talent Network</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.5 }}
              >
                <Link
                  to={link.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-all hover:text-coral relative py-2",
                    location.pathname === link.href ? "text-coral" : "text-teal-950/60"
                  )}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="h-4 w-px bg-teal-900/10 mx-2"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              {isAuthenticated ? (
                <Link
                  to={`/${user?.role}/dashboard`}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-teal-950 rounded-full hover:bg-coral transition-all"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-teal-950 border border-teal-950/10 rounded-full hover:bg-teal-950 hover:text-white transition-all"
                >
                  Login
                </Link>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
              className="relative group"
            >
              <button
                className="px-8 py-3 bg-coral text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-teal-950 transition-all shadow-lg shadow-coral/20 hover:scale-105 active:scale-95 flex items-center space-x-2"
              >
                <span>Sign Up</span>
                <Menu size={14} />
              </button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-teal-900/5 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100 z-50">
                <Link 
                  to="/signup-candidate" 
                  className="flex items-center space-x-3 px-4 py-3 text-teal-950 hover:bg-coral/10 transition-colors"
                >
                  <User size={16} className="text-coral" />
                  <span className="text-xs font-bold uppercase tracking-widest">As Candidate</span>
                </Link>
                <Link 
                  to="/signup-employer" 
                  className="flex items-center space-x-3 px-4 py-3 text-teal-950 hover:bg-coral/10 transition-colors"
                >
                  <Building2 size={16} className="text-coral" />
                  <span className="text-xs font-bold uppercase tracking-widest">As Employer</span>
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-teal-950 bg-white/50 rounded-xl backdrop-blur-sm">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-teal-900/10 px-6 py-8 space-y-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block text-lg font-bold text-teal-950"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-teal-900/10" />
            {isAuthenticated ? (
              <Link
                to={`/${user?.role}/dashboard`}
                className="block text-lg font-bold text-coral"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="block text-lg font-bold text-teal-950"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">Sign Up</p>
              <Link
                to="/signup-candidate"
                className="flex items-center justify-between w-full px-8 py-4 bg-forest-teal text-peach rounded-2xl text-base font-black uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                <span>As Candidate</span>
                <User size={20} />
              </Link>
              <Link
                to="/signup-employer"
                className="flex items-center justify-between w-full px-8 py-4 border-2 border-forest-teal text-forest-teal rounded-2xl text-base font-black uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                <span>As Employer</span>
                <Building2 size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const MobileNav = ({ role }: { role: 'candidate' | 'employer' | 'admin' }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = {
    candidate: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/candidate/dashboard' },
      { name: 'Messages', icon: MessageSquare, href: '/candidate/messages' },
      { name: 'Shortlisted', icon: Heart, href: '/candidate/shortlisted' },
      { name: 'Settings', icon: Settings, href: '/candidate/settings' },
    ],
    employer: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
      { name: 'Jobs', icon: Briefcase, href: '/employer/jobs' },
      { name: 'Messages', icon: MessageSquare, href: '/employer/messages' },
      { name: 'Settings', icon: Settings, href: '/employer/settings' },
    ],
    admin: [
      { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
      { name: 'Settings', icon: Settings, href: '/admin/settings' },
    ]
  };

  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
      <div className="bg-teal-950/90 backdrop-blur-xl rounded-[32px] p-2 shadow-2xl border border-white/10 flex items-center justify-around">
        {links[role].map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "p-4 rounded-2xl transition-all relative",
              location.pathname === link.href ? "text-peach" : "text-white/40"
            )}
          >
            <link.icon size={20} />
            {location.pathname === link.href && (
              <motion.div 
                layoutId="mobile-nav-active"
                className="absolute inset-0 bg-white/10 rounded-2xl -z-10"
              />
            )}
          </Link>
        ))}
        <button 
          onClick={handleLogout}
          className="p-4 text-white/40"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export const Sidebar = ({ role }: { role: 'candidate' | 'employer' | 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const links = {
    candidate: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/candidate/dashboard' },
      { name: 'AI Resume Builder', icon: Sparkles, href: '/candidate/resume-builder' },
      { name: 'Messages', icon: MessageSquare, href: '/candidate/messages' },
      { name: 'My Jobs', icon: Briefcase, href: '/candidate/my-jobs' },
      { name: 'Shortlisted', icon: Heart, href: '/candidate/shortlisted' },
      { name: 'My Profile', icon: User, href: '/candidate/profile' },
      { name: 'Job Search', icon: Briefcase, href: '/jobs' },
      { name: 'Settings', icon: Settings, href: '/candidate/settings' },
    ],
    employer: [
      { name: 'Dashboard', icon: LayoutDashboard, href: '/employer/dashboard' },
      { name: 'Job Management', icon: Briefcase, href: '/employer/jobs' },
      { name: 'Messages', icon: MessageSquare, href: '/employer/messages' },
      { name: 'Layoff Support', icon: HeartHandshake, href: '/employer/layoff-support' },
      { name: 'Subscription & Billing', icon: CreditCard, href: '/employer/billing' },
      { name: 'Verification', icon: ShieldCheck, href: '/employer/verification' },
      { name: 'Settings', icon: Settings, href: '/employer/settings' },
    ],
    admin: [
      { name: 'Overview', icon: LayoutDashboard, href: '/admin/dashboard' },
      { name: 'Employer Management', icon: Building2, href: '/admin/employers' },
      { name: 'Candidate Management', icon: User, href: '/admin/candidates' },
      { name: 'Job Management', icon: Briefcase, href: '/admin/jobs' },
      { name: 'Subscription Plans', icon: CreditCard, href: '/admin/subscriptions' },
      { name: 'Inquiries', icon: MessageSquare, href: '/admin/inquiries' },
      { name: 'Settings', icon: Settings, href: '/admin/settings' },
    ]
  };

  return (
    <aside className="hidden lg:flex w-72 h-screen sticky top-0 bg-forest-teal text-white p-8 flex-col border-r border-white/5">
      <div className="flex items-center space-x-4 mb-16">
        <div className="w-10 h-10 bg-peach rounded-2xl flex items-center justify-center shadow-lg shadow-peach/20">
          <span className="text-forest-teal font-black text-xl">F</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tighter uppercase leading-none">Folkstrot</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-peach opacity-60">Talent OS</span>
        </div>
      </div>

      <div className="mb-10">
        <p className="micro-label text-peach/40 mb-6">Navigation</p>
        <nav className="space-y-2">
          {links[role].map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden",
                location.pathname === link.href 
                  ? "bg-white/10 text-peach" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              <link.icon size={18} className={cn(
                "transition-transform group-hover:scale-110",
                location.pathname === link.href ? "text-peach" : "text-white/40 group-hover:text-white"
              )} />
              <span className="text-xs font-black uppercase tracking-widest">{link.name}</span>
              {location.pathname === link.href && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-peach rounded-r-full"
                />
              )}
            </Link>
          ))}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl text-white/40 hover:text-coral hover:bg-white/5 transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
