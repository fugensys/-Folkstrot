import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, testSupabaseConnection } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

type UserRole = 'admin' | 'employer' | 'candidate' | null;

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
  avatar_url?: string;
  company_name?: string;
  company_size?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, role: UserRole) => void;
  logout: () => Promise<void>;
  mockLogin: (role?: UserRole) => void;
  isAuthenticated: boolean;
  loading: boolean;
  refreshUser: () => Promise<void>;
  dbConnected: boolean | null;
  dbError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [dbError, setDbError] = useState<string | null>(null);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const fetchProfile = async (userId: string, email: string, metadata: any) => {
    if (!dbConnected) {
      setUser({
        id: userId,
        email: email,
        role: (metadata.role as UserRole) || null,
        full_name: metadata.full_name || `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim(),
        company_name: metadata.company_name,
        company_size: metadata.company_size,
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setUser({
          id: userId,
          email: email,
          role: data.role as UserRole,
          full_name: data.full_name,
          avatar_url: data.avatar_url,
          company_name: data.company_name,
          company_size: data.company_size,
        });
      } else {
        // If profile doesn't exist yet (e.g. just signed up), use metadata
        setUser({
          id: userId,
          email: email,
          role: (metadata.role as UserRole) || null,
          full_name: metadata.full_name || `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim(),
          company_name: metadata.company_name,
          company_size: metadata.company_size,
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      // Fallback to metadata
      setUser({
        id: userId,
        email: email,
        role: (metadata.role as UserRole) || null,
        full_name: metadata.full_name || `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim(),
        company_name: metadata.company_name,
        company_size: metadata.company_size,
      });
    }
  };

  const refreshUser = async () => {
    if (!dbConnected) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  useEffect(() => {
    let subscription: any = null;

    const initAuth = async () => {
      // Supabase is disconnected by user request
      setDbConnected(false);
      setDbError('Database is currently disconnected. Using mock data mode.');
      setLoading(false);
    };

    initAuth();

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const login = (email: string, role: UserRole) => {
    // This was for mock login. In Supabase, login happens in the Login component.
    // We update the local state here if needed, but onAuthStateChange handles it.
  };

  const logout = async () => {
    if (dbConnected) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error signing out:', err);
      }
    }
    setUser(null);
    setIsLoggedOut(true);
  };

  const mockLogin = (role?: UserRole) => {
    setIsLoggedOut(false);
    if (role) {
      setUser({
        id: `mock-${role}-id`,
        email: `${role}@example.com`,
        role: role,
        full_name: `Mock ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      });
    }
  };

  const getMockRole = () => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/employer')) return 'employer';
    return 'candidate';
  };

  const effectiveUser = user || (isLoggedOut ? null : {
    id: 'mock-user-id',
    email: 'guest@example.com',
    role: getMockRole(),
    full_name: 'Guest User',
  });

  const isAuthenticated = !!effectiveUser;

  return (
    <AuthContext.Provider value={{ user: effectiveUser, login, logout, mockLogin, isAuthenticated, loading, refreshUser, dbConnected, dbError }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
