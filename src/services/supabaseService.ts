import { supabase } from '../lib/supabase';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements?: string;
  benefits?: string;
  industry?: string;
  location_strategy?: string;
  created_at: string;
  employer_id: string;
}

export const jobService = {
  async getAllJobs() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Job[];
    } catch (error) {
      console.warn('Using mock jobs due to database error:', error);
      return [
        {
          id: '1',
          title: 'Senior Frontend Engineer',
          company: 'TechFlow Systems',
          location: 'San Francisco, CA',
          salary: '$140k - $180k',
          type: 'Full-time',
          description: 'We are looking for a Senior Frontend Engineer to join our team...',
          created_at: new Date().toISOString(),
          employer_id: 'mock-employer-1'
        },
        {
          id: '2',
          title: 'Product Designer',
          company: 'NeuralPath AI',
          location: 'Remote',
          salary: '$120k - $160k',
          type: 'Full-time',
          description: 'Join our design team to build the future of AI...',
          created_at: new Date().toISOString(),
          employer_id: 'mock-employer-2'
        }
      ] as Job[];
    }
  },

  async getJobsByEmployerId(employerId: string) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('employer_id', employerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Job[];
    } catch (error) {
      console.warn('Using mock employer jobs due to database error:', error);
      return [
        {
          id: '1',
          title: 'Senior Frontend Engineer',
          company: 'TechFlow Systems',
          location: 'San Francisco, CA',
          salary: '$140k - $180k',
          type: 'Full-time',
          description: 'We are looking for a Senior Frontend Engineer to join our team...',
          created_at: new Date().toISOString(),
          employer_id: employerId
        }
      ] as Job[];
    }
  },

  async getJobById(id: string) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Job;
    } catch (error) {
      console.warn(`Using mock job for ID ${id} due to database error:`, error);
      return {
        id: id,
        title: 'Senior Frontend Engineer',
        company: 'TechFlow Systems',
        location: 'San Francisco, CA',
        salary: '$140k - $180k',
        type: 'Full-time',
        description: 'We are looking for a Senior Frontend Engineer to join our team. You will be responsible for building high-quality user interfaces using React and Tailwind CSS.',
        created_at: new Date().toISOString(),
        employer_id: 'mock-employer-1'
      } as Job;
    }
  },

  async createJob(job: Omit<Job, 'id' | 'created_at'>) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([job])
        .select()
        .single();
      
      if (error) throw error;
      return data as Job;
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  },

  async updateJob(id: string, updates: Partial<Job>) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Job;
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  },

  async deleteJob(id: string) {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw error;
    }
  }
};

export const profileService = {
  async getProfile(id: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn(`Using mock profile for ID ${id} due to database error:`, error);
      return {
        id: id,
        full_name: 'Guest User',
        email: 'guest@example.com',
        role: 'candidate',
        headline: 'Exploring Opportunities',
        bio: 'This is a mock profile for demonstration purposes.',
        avatar_url: null,
        status: 'active'
      };
    }
  },

  async updateProfile(id: string, updates: any) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};

export const adminService = {
  async getStats() {
    try {
      const { count: employerCount, error: employerError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'employer');

      const { count: candidateCount, error: candidateError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'candidate');

      const { count: jobCount, error: jobError } = await supabase
        .from('jobs')
        .select('*', { count: 'exact', head: true });

      if (employerError || candidateError || jobError) {
        throw new Error('Database error');
      }

      return {
        employers: employerCount || 0,
        candidates: candidateCount || 0,
        jobs: jobCount || 0,
        revenue: 0 // Placeholder for now
      };
    } catch (error) {
      console.warn('Using mock stats due to database error:', error);
      return {
        employers: 124,
        candidates: 856,
        jobs: 42,
        revenue: 12.5
      };
    }
  },

  async getPendingEmployers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'employer')
        .eq('status', 'pending');

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Using mock pending employers due to database error:', error);
      return [
        { id: 'mock-p-1', email: 'contact@quantum.io', full_name: 'Quantum', plan: 'Enterprise', status: 'pending' },
        { id: 'mock-p-2', email: 'hr@nexus.tech', full_name: 'Nexus', plan: 'Premium', status: 'pending' }
      ];
    }
  },

  async approveEmployer(id: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'active' })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error approving employer:', error);
      throw error;
    }
  },

  async rejectEmployer(id: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error rejecting employer:', error);
      throw error;
    }
  },

  async getAllEmployers() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'employer')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Using mock employers list due to database error:', error);
      return [
        { id: 'mock-e-1', email: 'hr@techflow.io', full_name: 'TechFlow Systems', plan: 'Enterprise', status: 'active', created_at: new Date().toISOString() },
        { id: 'mock-e-2', email: 'jobs@neuralpath.ai', full_name: 'NeuralPath AI', plan: 'Premium', status: 'active', created_at: new Date().toISOString() }
      ];
    }
  },

  async deleteEmployer(id: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting employer:', error);
      throw error;
    }
  },

  async getAllCandidates() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'candidate')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Using mock candidates list due to database error:', error);
      return [
        { id: 'mock-c-1', email: 'alex@example.com', full_name: 'Alex Rivera', headline: 'Senior UI Engineer', status: 'active', created_at: new Date().toISOString() },
        { id: 'mock-c-2', email: 'jordan@example.com', full_name: 'Jordan Smith', headline: 'Frontend Specialist', status: 'active', created_at: new Date().toISOString() }
      ];
    }
  },

  async deleteCandidate(id: string) {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting candidate:', error);
      throw error;
    }
  }
};

export const applicationService = {
  async applyForJob(candidate_id: string, job_id: string, resume_url?: string, cover_letter?: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([{ candidate_id, job_id, resume_url, cover_letter }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  },

  async getApplicationsByCandidateId(candidateId: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*, jobs(*)')
        .eq('candidate_id', candidateId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Using mock candidate applications due to database error:', error);
      return [
        {
          id: 'app-1',
          status: 'interviewing',
          created_at: new Date().toISOString(),
          jobs: {
            id: '1',
            title: 'Senior Frontend Engineer',
            company: 'TechFlow Systems',
            location: 'San Francisco, CA'
          }
        },
        {
          id: 'app-2',
          status: 'pending',
          created_at: new Date().toISOString(),
          jobs: {
            id: '2',
            title: 'Product Designer',
            company: 'NeuralPath AI',
            location: 'Remote'
          }
        }
      ];
    }
  },

  async getApplicationsByJobId(jobId: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*, profiles(*)')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Using mock job applications due to database error:', error);
      return [
        {
          id: 'app-3',
          status: 'pending',
          created_at: new Date().toISOString(),
          job_id: jobId,
          profiles: {
            full_name: 'Alex Rivera',
            headline: 'Senior UI Engineer',
            avatar_url: null
          }
        },
        {
          id: 'app-4',
          status: 'interviewing',
          created_at: new Date().toISOString(),
          job_id: jobId,
          profiles: {
            full_name: 'Jordan Smith',
            headline: 'Frontend Specialist',
            avatar_url: null
          }
        }
      ];
    }
  },

  async updateApplicationStatus(id: string, status: string) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  }
};
