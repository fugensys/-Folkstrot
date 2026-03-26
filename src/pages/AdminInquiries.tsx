import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock,
  User,
  Building2,
  Mail,
  Trash2,
  Reply,
  X,
  Send
} from 'lucide-react';

const AdminInquiries = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [replyText, setReplyText] = useState('');
  const [inquiries, setInquiries] = useState([
    { id: 1, sender: 'Sarah Jenkins', company: 'TechFlow Systems', email: 'sarah@techflow.com', subject: 'Enterprise Plan Scaling', message: 'We are interested in moving our entire global team to the Enterprise plan. Can we schedule a demo?', status: 'New', date: '1h ago' },
    { id: 2, sender: 'Marcus Chen', company: 'NeuralPath AI', email: 'marcus@neuralpath.ai', subject: 'API Access Inquiry', message: 'Does the Premium plan include access to the matching API? We want to integrate it with our internal ATS.', status: 'Replied', date: '3h ago' },
    { id: 3, sender: 'Elena Rodriguez', company: 'Nexus Corp', email: 'elena@nexus.co', subject: 'Verification Process', message: 'How long does the company verification process typically take? We uploaded our documents yesterday.', status: 'Pending', date: '5h ago' },
    { id: 4, sender: 'Jordan Smith', company: 'Skyline B2B', email: 'jordan@skyline.com', subject: 'Billing Question', message: 'I noticed a discrepancy in our last invoice. Could someone from the billing team reach out?', status: 'Replied', date: '1d ago' },
  ]);

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.sender.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         inq.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || inq.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: number) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    setInquiries(prev => prev.map(inq => {
      if (inq.id === replyingTo.id) {
        return { ...inq, status: 'Replied' };
      }
      return inq;
    }));
    
    setReplyingTo(null);
    setReplyText('');
    alert('Reply sent successfully!');
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <BackButton />
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="micro-label text-coral mb-4 block">Support</span>
            <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              Inbound <br />
              <span className="text-coral italic font-serif lowercase">Inquiries</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-6 py-4 bg-white border border-teal-900/5 rounded-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-950/40 mb-1">Unread Messages</p>
              <p className="text-2xl font-black text-teal-950">{inquiries.filter(i => i.status === 'New').length}</p>
            </div>
          </div>
        </header>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] border border-teal-900/5 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-teal-950/20" size={20} />
            <input 
              type="text" 
              placeholder="Search by sender, company or subject..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-cream border-none rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-teal-950/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-950/40">Status:</span>
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-6 py-4 bg-cream border-none rounded-2xl text-sm font-black uppercase tracking-widest text-teal-950 outline-none focus:ring-2 ring-coral/20 appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="replied">Replied</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-6">
          {filteredInquiries.map((inq) => (
            <motion.div 
              key={inq.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-cream rounded-2xl flex items-center justify-center text-forest-teal font-black group-hover:bg-peach transition-colors">
                    {inq.sender[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-teal-950 uppercase tracking-tight">{inq.subject}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-[10px] font-bold text-teal-950/40 flex items-center">
                        <User size={10} className="mr-1" /> {inq.sender}
                      </span>
                      <span className="text-[10px] font-bold text-teal-950/40 flex items-center">
                        <Building2 size={10} className="mr-1" /> {inq.company}
                      </span>
                      <span className="text-[10px] font-bold text-teal-950/40 flex items-center">
                        <Clock size={10} className="mr-1" /> {inq.date}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={cn(
                  "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                  inq.status === 'New' ? 'bg-coral/10 text-coral' : 
                  inq.status === 'Replied' ? 'bg-emerald-500/10 text-emerald-600' :
                  'bg-amber-500/10 text-amber-600'
                )}>
                  {inq.status}
                </span>
              </div>

              <p className="text-sm text-teal-950/60 leading-relaxed mb-8 bg-cream p-6 rounded-3xl">
                "{inq.message}"
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-bold text-teal-950/40 flex items-center">
                    <Mail size={12} className="mr-2" /> {inq.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setReplyingTo(inq)}
                    className="flex items-center space-x-2 px-6 py-3 bg-forest-teal text-peach rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-950 transition-all"
                  >
                    <Reply size={14} />
                    <span>Reply Now</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(inq.id)}
                    className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button className="p-3 bg-cream text-teal-950 rounded-xl hover:bg-peach transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reply Modal */}
        <AnimatePresence>
          {replyingTo && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setReplyingTo(null)}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-cream w-full max-w-2xl rounded-[48px] shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setReplyingTo(null)}
                  className="absolute top-8 right-8 p-3 bg-white text-teal-950 rounded-2xl shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <X size={24} />
                </button>

                <div className="p-12">
                  <div className="mb-8">
                    <span className="micro-label text-coral mb-2 block">Replying to</span>
                    <h2 className="text-3xl font-black text-teal-950 tracking-tighter uppercase">{replyingTo.sender}</h2>
                    <p className="text-sm text-teal-950/40 font-bold">{replyingTo.subject}</p>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-teal-900/5 mb-8">
                    <p className="text-sm text-teal-950/60 italic leading-relaxed">
                      "{replyingTo.message}"
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <label className="micro-label text-teal-950/40">Your Message</label>
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your response here..."
                      className="w-full h-40 px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none resize-none"
                    />
                  </div>

                  <button 
                    onClick={handleSendReply}
                    className="w-full py-5 bg-forest-teal text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all flex items-center justify-center shadow-xl shadow-teal-900/20"
                  >
                    <Send size={18} className="mr-2" /> Send Response
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default AdminInquiries;
