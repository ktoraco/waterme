'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    // スプラッシュ画面を2.5秒後に閉じる
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-deep-50 flex flex-col items-center justify-center z-50">
      {/* 水滴のアニメーション */}
      <div className="relative mb-16">  {/* アイコンと文字の間に余白を追加 */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            duration: 0.8,
            delay: 0.2
          }}
          className="absolute top-0 left-0 right-0 mx-auto"
        >
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            className="fill-sky-400 opacity-30"
          >
            <path d="M60,0 C80,40 120,60 120,90 C120,110 100,120 60,120 C20,120 0,110 0,90 C0,60 40,40 60,0 Z" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            duration: 0.8,
            delay: 0.4
          }}
          className="absolute top-0 left-0 right-0 mx-auto"
        >
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 120 120" 
            className="fill-teal-500 opacity-60"
          >
            <path d="M60,0 C80,40 120,60 120,90 C120,110 100,120 60,120 C20,120 0,110 0,90 C0,60 40,40 60,0 Z" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            duration: 0.8,
            delay: 0.6
          }}
          className="absolute top-0 left-0 right-0 mx-auto"
        >
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 120 120" 
            className="fill-deep-700"
          >
            <path d="M60,0 C80,40 120,60 120,90 C120,110 100,120 60,120 C20,120 0,110 0,90 C0,60 40,40 60,0 Z" />
          </svg>
        </motion.div>
      </div>

      {/* ロゴテキスト */}
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="text-4xl font-passionOne text-deep-700 mt-16"
      >
        WATER ME
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="text-deep-500 mt-2"
      >
      </motion.p>
    </div>
  );
};

export default SplashScreen;