'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { LottieComponentProps } from 'lottie-react';
import waterAnimationData from '@/animations/water-animation.json';

// Lottieコンポーネントをクライアント側のみで読み込む
const Lottie = dynamic<LottieComponentProps>(
  () => import('lottie-react'),
  { ssr: false } // サーバーサイドレンダリングを無効にする
);

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 3000 
}) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      
      const transitionTimer = setTimeout(() => {
        onComplete();
      }, 500); // フェードアウトにかかる時間
      
      return () => clearTimeout(transitionTimer);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-teal-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="w-64 h-64 mb-4">
        <Lottie 
          animationData={waterAnimationData} 
          loop={true}
          className="w-full h-full"
        />
      </div>
      <h1 className="text-4xl font-passionOne tracking-widest mb-2 text-deep-700">
        <span className="text-teal-500">Water</span>Me!
      </h1>
      <p className="text-deep-500 text-sm">植物の水やり管理をもっと楽しく</p>
    </div>
  );
};

export default SplashScreen;