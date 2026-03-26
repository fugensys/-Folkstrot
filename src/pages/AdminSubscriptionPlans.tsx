import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  CreditCard, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Users,
  Briefcase,
  Zap,
  X,
  Save
} from 'lucide-react';

const AdminSubscriptionPlans = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Free', price: '$0', billing: 'Forever', features: ['3 Job Postings', 'Basic AI Matching', 'Standard Support'], active: true, users: 450 },
    { id: 2, name: 'Premium', price: '$99', billing: 'per month', features: ['Unlimited Jobs', 'Advanced AI Engine', 'Priority Support', 'Candidate Export'], active: true, users: 120 },
    { id: 3, name: 'Enterprise', price: 'Custom', billing: 'Annual', features: ['Dedicated Account Manager', 'Custom AI Training', 'API Access', 'SSO Integration'], active: true, users: 45 },
  ]);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const handleDeletePlan = (id: number) => {
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const handleSavePlan = () => {
    setPlans(prev => prev.map(p => p.id === editingPlan.id ? editingPlan : p));
    setEditingPlan(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar role="admin" />
      
      <main className="flex-1 p-12 overflow-y-auto">
        <BackButton />
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="micro-label text-coral mb-4 block">Monetization</span>
            <h1 className="text-6xl font-black tracking-tighter text-teal-950 uppercase leading-none">
              Subscription <br />
              <span className="text-coral italic font-serif lowercase">Plans</span>
            </h1>
          </div>
          <button 
            onClick={() => setEditingPlan({ id: Date.now(), name: '', price: '', billing: '', features: [], active: true, users: 0 })}
            className="flex items-center space-x-2 px-8 py-4 bg-forest-teal text-peach rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-teal-950 transition-all shadow-xl shadow-teal-900/20"
          >
            <Plus size={16} />
            <span>Create New Plan</span>
          </button>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Subscriptions', value: '615', icon: Users, color: 'text-forest-teal' },
            { label: 'Monthly Revenue', value: '$11.8k', icon: TrendingUp, color: 'text-coral' },
            { label: 'Conversion Rate', value: '4.2%', icon: Zap, color: 'text-peach' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-cream", stat.color)}>
                  <stat.icon size={20} />
                </div>
              </div>
              <p className="text-4xl font-black tracking-tighter text-teal-950 mb-1">{stat.value}</p>
              <p className="micro-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-black text-teal-950 uppercase tracking-tight">{plan.name}</h3>
                  <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-widest mt-1">{plan.users} Active Users</p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                  plan.active ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
                )}>
                  {plan.active ? 'Active' : 'Inactive'}
                </div>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-black tracking-tighter text-teal-950">{plan.price}</span>
                <span className="text-xs font-bold text-teal-950/40 ml-2">{plan.billing}</span>
              </div>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    <span className="text-xs font-medium text-teal-950/60">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setEditingPlan(plan)}
                  className="flex-1 flex items-center justify-center space-x-2 py-4 bg-cream text-teal-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-peach transition-all"
                >
                  <Edit2 size={14} />
                  <span>Edit Plan</span>
                </button>
                <button 
                  onClick={() => handleDeletePlan(plan.id)}
                  className="p-4 bg-rose-500/10 text-rose-600 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Decorative Background Element */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-teal-950/5 rounded-full group-hover:scale-150 transition-transform" />
            </motion.div>
          ))}
        </div>

        {/* Edit Plan Modal */}
        <AnimatePresence>
          {editingPlan && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditingPlan(null)}
                className="absolute inset-0 bg-teal-950/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-cream w-full max-w-xl rounded-[48px] shadow-2xl overflow-hidden"
              >
                <button 
                  onClick={() => setEditingPlan(null)}
                  className="absolute top-8 right-8 p-3 bg-white text-teal-950 rounded-2xl shadow-lg hover:scale-110 transition-transform z-10"
                >
                  <X size={24} />
                </button>

                <div className="p-12">
                  <h2 className="text-3xl font-black text-teal-950 tracking-tighter uppercase mb-8">
                    {editingPlan.id > 10000 ? 'Create New Plan' : 'Edit Plan'}
                  </h2>

                  <div className="space-y-6 mb-10">
                    <div className="space-y-2">
                      <label className="micro-label text-teal-950/40">Plan Name</label>
                      <input 
                        type="text" 
                        value={editingPlan.name}
                        onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                        className="w-full px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Price</label>
                        <input 
                          type="text" 
                          value={editingPlan.price}
                          onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                          className="w-full px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="micro-label text-teal-950/40">Billing Cycle</label>
                        <input 
                          type="text" 
                          value={editingPlan.billing}
                          onChange={(e) => setEditingPlan({ ...editingPlan, billing: e.target.value })}
                          className="w-full px-6 py-4 bg-white border border-teal-900/5 rounded-2xl text-sm font-medium focus:ring-2 ring-coral/20 outline-none" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="micro-label text-teal-950/40">Status</label>
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => setEditingPlan({ ...editingPlan, active: true })}
                          className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            editingPlan.active ? "bg-emerald-500 text-white" : "bg-white text-teal-950 border border-teal-900/5"
                          )}
                        >
                          Active
                        </button>
                        <button 
                          onClick={() => setEditingPlan({ ...editingPlan, active: false })}
                          className={cn(
                            "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                            !editingPlan.active ? "bg-rose-500 text-white" : "bg-white text-teal-950 border border-teal-900/5"
                          )}
                        >
                          Inactive
                        </button>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSavePlan}
                    className="w-full py-5 bg-forest-teal text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-teal-950 transition-all flex items-center justify-center shadow-xl shadow-teal-900/20"
                  >
                    <Save size={18} className="mr-2" /> Save Plan Details
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

export default AdminSubscriptionPlans;
