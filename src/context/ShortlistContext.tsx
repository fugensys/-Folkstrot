import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  logo?: string;
  category?: string;
  postedAt?: string;
}

interface ShortlistContextType {
  shortlistedJobs: Job[];
  toggleShortlist: (job: Job) => void;
  isShortlisted: (jobId: string) => boolean;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export const ShortlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shortlistedJobs, setShortlistedJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('shortlistedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shortlistedJobs', JSON.stringify(shortlistedJobs));
  }, [shortlistedJobs]);

  const toggleShortlist = useCallback((job: Job) => {
    setShortlistedJobs(prev => {
      const exists = prev.find(j => j.id === job.id);
      if (exists) {
        return prev.filter(j => j.id !== job.id);
      }
      return [...prev, job];
    });
  }, []);

  const isShortlisted = useCallback((jobId: string) => {
    return shortlistedJobs.some(j => j.id === jobId);
  }, [shortlistedJobs]);

  const value = useMemo(() => ({
    shortlistedJobs,
    toggleShortlist,
    isShortlisted
  }), [shortlistedJobs, toggleShortlist, isShortlisted]);

  return (
    <ShortlistContext.Provider value={value}>
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => {
  const context = useContext(ShortlistContext);
  if (context === undefined) {
    throw new Error('useShortlist must be used within a ShortlistProvider');
  }
  return context;
};
