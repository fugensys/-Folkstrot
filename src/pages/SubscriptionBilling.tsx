import React from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { BackButton } from '../components/BackButton';
import { 
  CreditCard, 
  Package, 
  History, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  Zap,
  Shield,
  Clock,
  Plus
} from 'lucide-react';
import { cn } from '../components/Navigation';

const INVOICES = [
  { id: 'INV-2026-001', date: 'Mar 01, 2026', amount: '$499.00', status: 'Paid' },
  { id: 'INV-2026-002', date: 'Feb 01, 2026', amount: '$499.00', status: 'Paid' },
  { id: 'INV-2026-003', date: 'Jan 01, 2026', amount: '$499.00', status: 'Paid' },
];

const PLANS = [
  {
    name: 'Starter',
    price: '$199',
    period: '/month',
    features: ['3 Active Job Posts', 'Basic Applicant Tracking', 'Standard Support'],
    current: false
  },
  {
    name: 'Professional',
    price: '$499',
    period: '/month',
    features: ['15 Active Job Posts', 'AI Skill Matching', 'Priority Support', 'Advanced Analytics'],
    current: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited Job Posts', 'Dedicated Account Manager', 'Custom Integrations', 'SSO & Security'],
    current: false
  }
];

const SubscriptionBilling = () => {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="employer" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <BackButton />
        <header className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-coral/10 rounded-2xl flex items-center justify-center text-coral">
              <CreditCard size={24} />
            </div>
            <span className="micro-label text-coral">Finance & Account</span>
          </div>
          <h1 className="text-5xl font-black text-teal-950 tracking-tighter mb-4">
            Subscription <span className="text-coral">& Billing</span>
          </h1>
          <p className="text-teal-950/60 font-medium max-w-2xl">
            Manage your plan, payment methods, and review your billing history.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column - Current Plan & Usage */}
          <div className="lg:col-span-8 space-y-8">
            {/* Current Plan Card */}
            <div className="bg-forest-teal p-10 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <span className="micro-label text-peach mb-2 block">Current Plan</span>
                    <h2 className="text-4xl font-black tracking-tighter uppercase">Professional</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-black tracking-tighter text-peach">$499<span className="text-lg opacity-60">/mo</span></p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Next renewal: Apr 01, 2026</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {[
                    { label: 'Job Posts', value: '12/15', percent: 80 },
                    { label: 'AI Matches', value: '840/1000', percent: 84 },
                    { label: 'Team Seats', value: '4/5', percent: 80 }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</span>
                        <span className="text-xs font-bold">{stat.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.percent}%` }}
                          className="h-full bg-peach"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <button className="px-8 py-4 bg-peach text-forest-teal rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all">
                    Upgrade Plan
                  </button>
                  <button className="px-8 py-4 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all">
                    Cancel Subscription
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-[100px] -mr-32 -mt-32" />
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-teal-950">Payment Methods</h3>
                <button className="flex items-center text-xs font-black uppercase tracking-widest text-coral hover:underline">
                  <Plus size={14} className="mr-2" /> Add New Card
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-cream rounded-3xl border border-teal-900/5 flex items-center justify-between group hover:border-coral/20 transition-all">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-10 bg-white rounded-lg border border-teal-900/5 flex items-center justify-center">
                      <span className="text-blue-800 font-bold italic">VISA</span>
                    </div>
                    <div>
                      <p className="font-bold text-teal-950">•••• •••• •••• 4242</p>
                      <p className="text-[10px] font-black text-teal-950/40 uppercase tracking-widest">Expires 12/28 • Primary</p>
                    </div>
                  </div>
                  <button className="text-xs font-black uppercase tracking-widest text-teal-950/40 hover:text-coral transition-colors">Edit</button>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white p-10 rounded-[48px] border border-teal-900/5 shadow-sm">
              <h3 className="text-2xl font-bold text-teal-950 mb-8">Billing History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-teal-900/5">
                      <th className="pb-6 micro-label text-teal-950/40">Invoice</th>
                      <th className="pb-6 micro-label text-teal-950/40">Date</th>
                      <th className="pb-6 micro-label text-teal-950/40">Amount</th>
                      <th className="pb-6 micro-label text-teal-950/40">Status</th>
                      <th className="pb-6 micro-label text-teal-950/40 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-teal-900/5">
                    {INVOICES.map((invoice) => (
                      <tr key={invoice.id} className="group">
                        <td className="py-6 font-bold text-teal-950 text-sm">{invoice.id}</td>
                        <td className="py-6 text-teal-950/60 text-sm">{invoice.date}</td>
                        <td className="py-6 font-bold text-teal-950 text-sm">{invoice.amount}</td>
                        <td className="py-6">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-6 text-right">
                          <button className="p-2 text-teal-950/20 hover:text-coral transition-colors">
                            <Download size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Plan Comparison & Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Pricing Info */}
            <div className="bg-white p-8 rounded-[40px] border border-teal-900/5 shadow-sm">
              <h3 className="micro-label text-teal-950 mb-6 block">Available Plans</h3>
              <div className="space-y-4">
                {PLANS.map((plan) => (
                  <div 
                    key={plan.name}
                    className={cn(
                      "p-6 rounded-3xl border transition-all",
                      plan.current 
                        ? "border-coral bg-coral/5" 
                        : "border-teal-900/5 hover:border-teal-900/10"
                    )}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-teal-950 uppercase tracking-tighter">{plan.name}</h4>
                        <p className="text-xl font-black text-teal-950">{plan.price}<span className="text-[10px] opacity-40">{plan.period}</span></p>
                      </div>
                      {plan.current && (
                        <span className="px-2 py-1 bg-coral text-white rounded-md text-[8px] font-black uppercase tracking-widest">Active</span>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {plan.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center text-[10px] text-teal-950/60 font-medium">
                          <CheckCircle2 size={10} className="text-emerald-500 mr-2" /> {feature}
                        </li>
                      ))}
                    </ul>
                    {!plan.current && (
                      <button className="w-full mt-6 py-3 bg-cream text-teal-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-peach/20 transition-all">
                        Switch to {plan.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Help */}
            <div className="bg-peach/20 p-8 rounded-[40px] border border-peach/20">
              <div className="flex items-center space-x-3 mb-4">
                <AlertCircle size={20} className="text-coral" />
                <h4 className="font-bold text-teal-950">Need help?</h4>
              </div>
              <p className="text-xs text-teal-950/60 leading-relaxed mb-6">
                Have questions about your invoice or want to discuss custom enterprise pricing? Our finance team is here to help.
              </p>
              <button className="w-full py-4 bg-forest-teal text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-900 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionBilling;
