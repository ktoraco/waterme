'use client';

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store';
import SplashScreen from '@/components/ui/SplashScreen';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { fetchPlants } = useStore();
  const [showSplash, setShowSplash] = useState(true);

  // ログインしている場合、Firestoreからデータを取得
  useEffect(() => {
    if (user && !authLoading) {
      fetchPlants(user.uid);
    }
  }, [user, authLoading, fetchPlants]);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <Header />
          <Navigation />
          <main className="flex-grow px-4 py-6">
            <div className="max-w-2xl mx-auto">{children}</div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};