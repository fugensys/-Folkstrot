import { Job, SubscriptionPlan } from './types';

export const FEATURED_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA',
    type: 'Full-time',
    category: 'Design',
    salary: '$140k - $180k',
    description: 'Lead our design team in creating next-gen B2B interfaces.',
    postedAt: '2 days ago',
    source: 'Direct'
  },
  {
    id: '2',
    title: 'AI Solutions Architect',
    company: 'NeuralPath AI',
    location: 'Remote',
    type: 'Remote',
    category: 'Engineering',
    salary: '$160k - $220k',
    description: 'Design and implement scalable AI solutions for enterprise clients.',
    postedAt: '1 day ago',
    source: 'Direct'
  },
  {
    id: '3',
    title: 'B2B Sales Executive',
    company: 'GrowthScale',
    location: 'New York, NY',
    type: 'Full-time',
    category: 'Sales',
    salary: '$100k + Commission',
    description: 'Drive revenue growth through strategic B2B partnerships.',
    postedAt: '3 days ago',
    source: 'Partner'
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    features: ['1 Job Listing', 'Basic Applicant Tracking', 'Standard Support'],
    jobLimit: 1
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$199',
    features: ['3 Job Listings', 'AI Candidate Matching', 'Priority Support', 'Featured Badge'],
    jobLimit: 3
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: ['10+ Job Listings', 'Dedicated Account Manager', 'Custom Integrations', 'Advanced Analytics'],
    jobLimit: 10
  }
];

export const CATEGORIES = [
  'Engineering', 'Design', 'Sales', 'Marketing', 'Finance', 'Operations', 'Customer Success', 'Human Resources'
];
