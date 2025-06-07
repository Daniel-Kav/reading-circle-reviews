
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  syncUserWithBackend: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUserWithBackend = async (authUser: User) => {
    try {
      const token = session?.access_token;
      if (!token) return;

      // Check if user exists in backend
      const checkResponse = await fetch(`http://localhost:3000/users/${authUser.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (checkResponse.status === 404) {
        // User doesn't exist, create them
        const userData = {
          id: authUser.id,
          full_name: authUser.user_metadata?.firstName && authUser.user_metadata?.lastName 
            ? `${authUser.user_metadata.firstName} ${authUser.user_metadata.lastName}`
            : authUser.email,
          role: 'farmer'
        };

        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      }
    } catch (error) {
      console.error('Error syncing user with backend:', error);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            firstName,
            lastName,
          },
        },
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user && data.session) {
        await syncUserWithBackend(data.user);
        toast.success('Account created successfully!');
      } else {
        toast.info('Please check your email to confirm your account.');
      }

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return { error: errorMessage };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user && data.session) {
        await syncUserWithBackend(data.user);
        toast.success('Welcome back!');
      }

      return {};
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      return { error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Error signing out');
        console.error('Sign out error:', error);
      } else {
        toast.success('Signed out successfully');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Sign out error:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Sync with backend when user signs in
        if (session?.user && event === 'SIGNED_IN') {
          setTimeout(() => {
            syncUserWithBackend(session.user);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        setTimeout(() => {
          syncUserWithBackend(session.user);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    syncUserWithBackend,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
