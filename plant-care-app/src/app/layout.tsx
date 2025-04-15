'use client';

import React, { useEffect, useState } from 'react';
import { Passion_One } from 'next/font/google';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Navigation from '../components/layout/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store';
import SplashScreen from '@/components/ui/SplashScreen';
import '../styles/globals.css';

// Passion Oneフォントの設定
const passionOne = Passion_One({
  weight: ['400', '700', '900'], // 複数のウェイトを指定 (Regular, Bold, Black)
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-passion-one',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <html lang="ja" className={passionOne.variable}>
      <body className="flex flex-col min-h-screen bg-stone-50">
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <>
            <Header />
            <Navigation />
            <main className="flex-grow px-4 py-6">
              <div className="max-w-md mx-auto">{children}</div>
            </main>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}