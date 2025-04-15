'use client';

import React, { useEffect } from 'react';
import { Passion_One } from 'next/font/google'; // Bebas NeueからPassion Oneに変更
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Navigation from '../components/layout/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useStore } from '@/store';
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

  // ログインしている場合、Firestoreからデータを取得
  useEffect(() => {
    if (user && !authLoading) {
      fetchPlants(user.uid);
    }
  }, [user, authLoading, fetchPlants]);

  return (
    <html lang="ja" className={passionOne.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}