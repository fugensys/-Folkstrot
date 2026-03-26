export type UserRole = 'candidate' | 'employer' | 'admin' | 'guest';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  category: string;
  salary: string;
  description: string;
  postedAt: string;
  source: string;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  status: 'Applied' | 'Shortlisted' | 'Interviewing' | 'Hired' | 'Rejected';
  appliedAt: string;
  rating?: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  skills: string[];
  location: string;
  resumeUrl?: string;
  appliedJobs: string[];
  shortlistedJobs: string[];
}

export interface Employer {
  id: string;
  companyName: string;
  email: string;
  plan: 'Free' | 'Premium' | 'Enterprise';
  isVerified: boolean;
  documents: { name: string; url: string }[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  jobLimit: number;
}
