import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sidebar } from '../components/Navigation';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  ChevronRight,
  Globe,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobService } from '../services/supabaseService';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Full-time',
    locationStrategy: 'Remote (Global)',
    location: '',
    salaryMin: '',
    salaryMax: '',
    industry: 'SaaS / B2B',
    description: '',
    requirements: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      setError('You must be logged in to post a job.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const salaryRange = `${formData.salaryMin}k - ${formData.salaryMax}k USD`;
      
      await jobService.createJob({
        title: formData.title,
        company: user.email.split('@')[0] || 'TechFlow Systems', // Fallback to email part if company name not in profile
        location: formData.location || formData.locationStrategy,
        salary: salaryRange,
        type: formData.type,
        description: formData.description,
        requirements: formData.requirements,
        industry: formData.industry,
        location_strategy: formData.locationStrategy,
        employer_id: user.id
      });

      setSubmitted(true);
      setTimeout(() => navigate('/employer/dashboard'), 2000);
    } catch (err: any) {
      console.error('Error posting job:', err);
      let errorMessage = err.message || 'Failed to post job. Please try again.';
      if (errorMessage === 'Failed to fetch' || errorMessage.includes('fetch')) {
        errorMessage = 'Database connection is currently unavailable. Please try again later.';
      }
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar role="employer" />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold text-teal-950 tracking-tight">Post a New Job</h1>
            <p className="text-teal-950/60 font-medium">Reach top B2B talent across the ecosystem</p>
          </div>
          <button 
            onClick={() => navigate('/employer/dashboard')}
            className="text-teal-950/40 font-bold hover:text-teal-950 transition-colors"
          >
            Cancel
          </button>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-coral/10 border border-coral/20 rounded-2xl text-coral font-bold text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
          {/* Section 1: Basic Info */}
          <div className="bg-white p-10 rounded-[40px] border border-teal-900/5 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-peach/20 rounded-lg">
                <Briefcase className="text-coral" size={20} />
              </div>
              <h3 className="text-xl font-bold text-teal-950">Job Essentials</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Job Title</label>
                <input 
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text" 
                  placeholder="e.g. Senior Product Designer" 
                  className="w-full px-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Work Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950 appearance-none"
                >
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Part-time</option>
                  <option>Freelance</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Location Strategy</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                  <select 
                    name="locationStrategy"
                    value={formData.locationStrategy}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950 appearance-none"
                  >
                    <option>Remote (Global)</option>
                    <option>Remote (Specific Region)</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Office Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                  <input 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    type="text" 
                    placeholder="e.g. London, UK" 
                    className="w-full pl-12 pr-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Compensation & Industry */}
          <div className="bg-white p-10 rounded-[40px] border border-teal-900/5 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-peach/20 rounded-lg">
                <DollarSign className="text-coral" size={20} />
              </div>
              <h3 className="text-xl font-bold text-teal-950">Compensation & Industry</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Salary Range (Min - Max)</label>
                <div className="flex items-center space-x-4">
                  <input 
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    type="text" 
                    placeholder="80k" 
                    className="w-full px-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950" 
                  />
                  <span className="text-teal-950/20">—</span>
                  <input 
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    type="text" 
                    placeholder="120k" 
                    className="w-full px-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950" 
                  />
                  <span className="font-bold text-teal-950/40">USD</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Primary Industry</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-950/20" size={18} />
                  <select 
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="w-full pl-12 pr-6 py-4 bg-cream border-none rounded-2xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950 appearance-none"
                  >
                    <option>FinTech</option>
                    <option>SaaS / B2B</option>
                    <option>HealthTech</option>
                    <option>Cybersecurity</option>
                    <option>AI / Machine Learning</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Description */}
          <div className="bg-white p-10 rounded-[40px] border border-teal-900/5 shadow-sm space-y-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-peach/20 rounded-lg">
                <FileText className="text-coral" size={20} />
              </div>
              <h3 className="text-xl font-bold text-teal-950">Job Description</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">The Role</label>
                <textarea 
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe the responsibilities, day-to-day tasks, and the impact this role will have..."
                  className="w-full px-6 py-4 bg-cream border-none rounded-3xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-teal-950/40 uppercase tracking-widest ml-1">Requirements & Skills</label>
                <textarea 
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="List key qualifications, technical skills, and experience levels required..."
                  className="w-full px-6 py-4 bg-cream border-none rounded-3xl outline-none focus:ring-2 ring-coral/20 font-medium text-teal-950 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-6 pt-4">
            <button 
              type="button"
              onClick={() => navigate('/employer/dashboard')}
              className="text-teal-950/60 font-bold hover:text-teal-950 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting || submitted}
              className={`px-12 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center ${
                submitted 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                  : 'bg-forest-teal text-white hover:bg-teal-900 shadow-teal-900/20'
              }`}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : submitted ? (
                <><CheckCircle2 size={20} className="mr-2" /> Job Posted!</>
              ) : (
                <>Publish Job Posting <ChevronRight size={20} className="ml-2" /></>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostJob;
