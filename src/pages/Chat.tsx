import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Sidebar } from '../components/Navigation';
import { Send, User, Search, MoreVertical, Phone, Video, Smile, Paperclip, Check, CheckCheck, Info, Image as ImageIcon, FileText, Mic, X, MapPin, Mail, Calendar, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  room: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatProps {
  role: 'candidate' | 'employer' | 'admin';
}

const Chat: React.FC<ChatProps> = ({ role }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialContactId = queryParams.get('contactId');

  // Mock users for the sidebar
  const contacts = React.useMemo(() => {
    if (role === 'candidate') {
      return [
        { id: 'emp1', name: 'Google Recruitment', lastMsg: 'We loved your resume!', time: '2m ago', online: true },
        { id: 'emp2', name: 'Meta HR', lastMsg: 'Are you available for a call?', time: '1h ago', online: false },
        { id: 'emp3', name: 'Netflix Engineering', lastMsg: 'The interview is scheduled.', time: '3h ago', online: true },
      ];
    } else if (role === 'employer') {
      return [
        { id: 'can1', name: 'Hannah Panizares', lastMsg: 'I have sent the documents.', time: '5m ago', online: true },
        { id: 'can2', name: 'John Doe', lastMsg: 'Thank you for the opportunity.', time: '2h ago', online: true },
        { id: 'can3', name: 'Jane Smith', lastMsg: 'When can I expect a response?', time: '1d ago', online: false },
      ];
    } else {
      return [
        { id: 'emp1', name: 'TechFlow Systems', lastMsg: 'Inquiry about Enterprise plan', time: '1h ago', online: true },
        { id: 'can1', name: 'Alex Rivera', lastMsg: 'Account verification issue', time: '3h ago', online: true },
        { id: 'emp2', name: 'NeuralPath AI', lastMsg: 'API access request', time: '5h ago', online: false },
        { id: 'emp3', name: 'Skyline B2B', lastMsg: 'Partnership inquiry', time: '10h ago', online: true },
        { id: 'emp4', name: 'Quantum Leap', lastMsg: 'Billing issue', time: '1d ago', online: false },
        { id: 'emp5', name: 'Nexus Corp', lastMsg: 'Security audit request', time: '2d ago', online: true },
      ];
    }
  }, [role]);

  const currentUser = React.useMemo(() => ({
    id: role === 'candidate' ? 'can_user' : role === 'employer' ? 'emp_user' : 'admin_user',
    name: role === 'candidate' ? 'Hannah Panizares' : role === 'employer' ? 'Recruiter' : 'System Admin',
  }), [role]);

  const [activeRoom, setActiveRoom] = useState(initialContactId || contacts[0]?.id || '');
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize socket once
  useEffect(() => {
    const socket = io(window.location.origin);
    socketRef.current = socket;

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  // Handle room changes and listeners that depend on activeRoom
  useEffect(() => {
    if (!socketRef.current || !activeRoom) return;

    const socket = socketRef.current;
    
    socket.emit('join_room', activeRoom);

    const handlePreviousMessages = (msgs: Message[]) => {
      setMessages(msgs);
    };

    const handleReceiveMessage = (msg: Message) => {
      if (msg.room === activeRoom) {
        setMessages((prev) => [...prev, { ...msg, status: 'read' }]);
      }
    };

    const handleTyping = (data: { room: string; isTyping: boolean }) => {
      if (data.room === activeRoom) {
        setIsTyping(data.isTyping);
      }
    };

    socket.on('previous_messages', handlePreviousMessages);
    socket.on('receive_message', handleReceiveMessage);
    socket.on('user_typing', handleTyping);

    return () => {
      socket.off('previous_messages', handlePreviousMessages);
      socket.off('receive_message', handleReceiveMessage);
      socket.off('user_typing', handleTyping);
    };
  }, [activeRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && socketRef.current) {
      const messageData = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: input,
        room: activeRoom,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
        status: 'sent' as const,
      };
      socketRef.current.emit('send_message', messageData);
      socketRef.current.emit('typing', { room: activeRoom, isTyping: false });
      setInput('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (socketRef.current) {
      socketRef.current.emit('typing', { room: activeRoom, isTyping: e.target.value.length > 0 });
    }
  };

  const activeContact = contacts.find(c => c.id === activeRoom);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar role={role} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-teal-900/10 bg-white">
          <BackButton />
        </div>
        <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r border-teal-900/10 flex flex-col">
          <div className="p-6 border-b border-teal-900/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-teal-950 uppercase tracking-tight">Messages</h2>
              <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                <MoreVertical size={16} />
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-950/40" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-teal-900/5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-6 py-4">
              <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-[0.2em] mb-4">Recent Chats</p>
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <button 
                    key={contact.id}
                    onClick={() => setActiveRoom(contact.id)}
                    className={cn(
                      "w-full p-3 rounded-2xl flex items-center space-x-3 transition-all duration-200 group",
                      activeRoom === contact.id 
                        ? "bg-teal-950 text-white shadow-xl shadow-teal-950/20" 
                        : "hover:bg-teal-50"
                    )}
                  >
                    <div className="relative flex-shrink-0">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg",
                        activeRoom === contact.id ? "bg-coral text-white" : "bg-teal-100 text-teal-600"
                      )}>
                        {contact.name[0]}
                      </div>
                      {contact.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className={cn(
                          "font-bold text-sm truncate",
                          activeRoom === contact.id ? "text-white" : "text-teal-950"
                        )}>{contact.name}</span>
                        <span className={cn(
                          "text-[10px]",
                          activeRoom === contact.id ? "text-white/60" : "text-teal-950/40"
                        )}>{contact.time}</span>
                      </div>
                      <p className={cn(
                        "text-xs truncate",
                        activeRoom === contact.id ? "text-white/60" : "text-teal-950/60"
                      )}>{contact.lastMsg}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-teal-900/10 flex justify-between items-center bg-white/80 backdrop-blur-md z-10">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center text-coral font-black text-xl">
                  {activeContact?.name[0] || 'G'}
                </div>
                {activeContact?.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-black text-teal-950 uppercase tracking-tight">
                  {activeContact?.name || 'General Chat'}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Active Now</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-3 text-teal-950/40 hover:text-coral hover:bg-coral/5 rounded-xl transition-all"><Phone size={20} /></button>
              <button className="p-3 text-teal-950/40 hover:text-coral hover:bg-coral/5 rounded-xl transition-all"><Video size={20} /></button>
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className={cn(
                  "p-3 rounded-xl transition-all",
                  showProfile ? "text-coral bg-coral/5" : "text-teal-950/40 hover:text-coral hover:bg-coral/5"
                )}
              >
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#FDFCFB] custom-scrollbar">
            <div className="flex justify-center mb-8">
              <span className="px-4 py-1 bg-teal-950/5 rounded-full text-[10px] font-black text-teal-950/40 uppercase tracking-widest">
                Today, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </span>
            </div>

            {messages.map((msg, idx) => {
              const isMe = msg.senderId === currentUser.id;
              const showAvatar = idx === 0 || messages[idx - 1].senderId !== msg.senderId;
              
              return (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex group animate-in fade-in slide-in-from-bottom-2 duration-300",
                    isMe ? "justify-end" : "justify-start"
                  )}
                >
                  {!isMe && (
                    <div className="w-8 flex-shrink-0 mr-3 self-end mb-1">
                      {showAvatar ? (
                        <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-xs">
                          {msg.senderName[0]}
                        </div>
                      ) : <div className="w-8" />}
                    </div>
                  )}
                  
                  <div className={cn(
                    "flex flex-col max-w-[65%]",
                    isMe ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "px-5 py-3 text-sm shadow-sm relative group",
                      isMe 
                        ? "bg-teal-950 text-white rounded-[24px] rounded-tr-none" 
                        : "bg-white text-teal-950 rounded-[24px] rounded-tl-none border border-teal-900/5"
                    )}>
                      {msg.text}
                    </div>
                    <div className="flex items-center space-x-2 mt-1.5 px-1">
                      <span className="text-[10px] text-teal-950/40 font-medium">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isMe && (
                        <div className="text-coral">
                          {msg.status === 'read' ? <CheckCheck size={12} /> : <Check size={12} />}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start animate-in fade-in duration-300">
                <div className="w-8 mr-3 self-end mb-1">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-bold text-xs">
                    {activeContact?.name[0]}
                  </div>
                </div>
                <div className="bg-white px-4 py-3 rounded-[24px] rounded-tl-none border border-teal-900/5 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-teal-950/20 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-teal-950/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-teal-950/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-teal-900/10">
            <form onSubmit={handleSend} className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <button type="button" className="p-3 text-teal-950/40 hover:text-coral hover:bg-coral/5 rounded-xl transition-all">
                  <Paperclip size={20} />
                </button>
                <button type="button" className="p-3 text-teal-950/40 hover:text-coral hover:bg-coral/5 rounded-xl transition-all">
                  <ImageIcon size={20} />
                </button>
              </div>
              
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Write a message..." 
                  className="w-full pl-5 pr-12 py-4 bg-cream/50 border border-teal-900/5 rounded-[24px] text-sm focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-950/40 hover:text-coral transition-colors">
                  <Smile size={20} />
                </button>
              </div>
              
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="w-14 h-14 bg-coral text-white rounded-2xl flex items-center justify-center hover:bg-teal-950 transition-all disabled:opacity-50 shadow-xl shadow-coral/20 hover:shadow-teal-950/20 group"
              >
                <Send size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>

          {/* Profile Overlay */}
          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-80 bg-white border-l border-teal-900/10 z-20 shadow-2xl p-8 overflow-y-auto"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-coral/10 rounded-[40px] flex items-center justify-center text-coral font-black text-4xl mb-6">
                    {activeContact?.name[0]}
                  </div>
                  <h4 className="text-xl font-black text-teal-950 uppercase tracking-tight mb-1">{activeContact?.name}</h4>
                  <p className="text-sm text-teal-950/40 font-bold uppercase tracking-widest mb-8">
                    {activeContact?.id.startsWith('emp') ? 'Employer' : 'Candidate'}
                  </p>
                  
                  <div className="w-full space-y-6">
                    <div className="text-left">
                      <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-widest mb-2">About</p>
                      <p className="text-sm text-teal-950/60 leading-relaxed">
                        {activeContact?.id.startsWith('emp') 
                          ? "Verified Employer on Folkstrot Network. Focused on finding the best engineering talent globally."
                          : "Verified Candidate on Folkstrot Network. Experienced professional with a passion for building scalable web applications."}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center p-4 bg-teal-50 rounded-2xl group hover:bg-teal-950 transition-all">
                        <FileText size={20} className="text-teal-600 group-hover:text-white mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Resume</span>
                      </button>
                      <button className="flex flex-col items-center p-4 bg-teal-50 rounded-2xl group hover:bg-teal-950 transition-all">
                        <Mic size={20} className="text-teal-600 group-hover:text-white mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white">Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  </div>
  );
};

export default Chat;
