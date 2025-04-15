import React from 'react';
import { Passion_One } from 'next/font/google';
import { ClientLayout } from '@/components/layout/ClientLayout';
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
  return (
    <html lang="ja" className={passionOne.variable}>
      <body className="flex flex-col min-h-screen bg-stone-50">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}