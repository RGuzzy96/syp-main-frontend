'use client'

import React, { createContext, useContext, useState, useEffect, useRef, Ref, MutableRefObject } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { ProfilesRow } from '@/types/rows.types';
import { steps } from '@/constants/onboarding-steps';
import { usePathname, useRouter } from 'next/navigation';

type AuthContextType = {
    session: Session | null,
    setSession: (session: Session) => void,
    profile: ProfilesRow | null;
    setProfile: (profile: ProfilesRow | null) => void,
    justSignedUpRef: MutableRefObject<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: any}) => {
  const pathname = usePathname();
  const rootSegment = pathname?.split('/')[1];
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);  
  const [profile, setProfile] = useState<ProfilesRow | null>(null);

  const justSignedUpRef = useRef(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log('Setting session: ', session)
      if(session && !profile && !justSignedUpRef.current){
        console.log('Getting profile...')
        getProfile(session);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

    useEffect(() => {
      console.log('Profile change detected: ', profile);
        if (session && profile && !profile.onboarding_complete) {
          if(justSignedUpRef.current){
            justSignedUpRef.current = false;
          }
          const step = steps[profile.onboarding_step ? profile.onboarding_step - 1 : 0];
          // router.push(`/${step}`) // skip onboarding for now
          router.push('/app');
        } 
        else if (session && profile && rootSegment !== "app") {
            router.push("/app");
        }
    }, [session, profile, rootSegment]);

  async function getProfile(session: Session) {
    try {
      if (!session?.user) return;

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('user_id', session?.user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data && data[0]) {
        setProfile(data[0]);
      }
    } catch (error) {
      console.error("Error getting profile and preferences: ", error);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        setSession,
        profile,
        setProfile, 
        justSignedUpRef 
      }}>
      {children}
    </AuthContext.Provider>
  );
};
