'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Plant, WaterLog } from '@/types';
import { useStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/date';
import { fileToBase64 } from '@/utils/storage';
import Link from 'next/link';

const lightTypeMap = {
  'sun': '日向',
  'shade': '日陰',
  'partial': '部分日陰'
};

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const plantId = params.id as string;
  const { plants, updatePlant } = useStore();
  const { user } = useAuth();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [note, setNote] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const foundPlant = plants.find(p => p.id === plantId);
    setPlant(foundPlant || null);
  }, [plants, plantId]);

  if (!plant) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>植物が見つかりませんでした。</p>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatering = async () => {
    setIsSubmitting(true);
    setError('');
    try {
      const today = new Date().toISOString();
      
      let imageUrl = '';
      if (image) {
        try {
          // 画像をBase64エンコード
          imageUrl = await fileToBase64(image);
        } catch (err: any) {
          setError(err.message || '画像の処理に失敗しました');
        }
      }
      
      const newWaterLog: WaterLog = {
        date: today,
        note: note || '水やりしました',
        imageUrl: imageUrl || undefined
      };
      
      await updatePlant(plantId, {
        lastWatered: today,
        waterLogs: [...plant.waterLogs, newWaterLog]
      });
      
      setNote('');
      setImage(null);
      setImagePreview('');
      
    } catch (error) {
      console.error('水やり記録の追加に失敗しました', error);
      setError('水やり記録の追加に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDaysAgo = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  };

  // 並べ替えた水やり履歴
  const sortedWaterLogs = [...plant.waterLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="px-4 pt-4 pb-24 bg-stone-50 min-h-screen">
      <div className="mb-6">
        <Link href="/">
          <div className="flex items-center text-deep-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {plant.name}
          </div>
        </Link>
      </div>
      
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-full p-6 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <h2 className="text-xl font-medium mb-3">Species</h2>
        <p className="text-deep-600 mb-2">{plant.species || '未設定'}</p>
        <hr className="my-3" />
        
        <h2 className="text-xl font-medium mb-3">Notes</h2>
        <p className="text-deep-600 mb-2">{plant.notes || '特記事項なし'}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-3">水やり履歴</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {sortedWaterLogs.map((log, index) => (
            <div key={index} className="p-4 border-b border-stone-100">
              <div className="flex items-start">
                <div className="bg-blue-50 rounded-md p-2 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <p className="text-deep-600 text-sm">{formatDate(log.date)}</p>
                  <p className="text-deep-500 text-sm">{getDaysAgo(log.date)}日前</p>
                </div>
              </div>
              {log.note && <p className="mt-2 text-deep-600">{log.note}</p>}
              {log.imageUrl && (
                <div className="mt-3">
                  <img src={log.imageUrl} alt="植物の記録" className="rounded-md max-h-32 w-auto" />
                </div>
              )}
            </div>
          ))}
          
          {sortedWaterLogs.length === 0 && (
            <div className="p-6 text-center text-deep-500">
              まだ水やり記録がありません
            </div>
          )}
        </div>
      </div>
      
      {/* 水やり入力エリア */}
      <div className="fixed bottom-20 inset-x-0 px-4">
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md">
                {error}
              </div>
            )}
          
            <input
              type="text"
              placeholder="メモを残す（任意）"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="border rounded-md p-2 w-full"
            />
            
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                id="photo-upload"
                className="hidden"
                onChange={handleImageChange}
              />
              <label
                htmlFor="photo-upload"
                className="bg-stone-100 text-deep-700 px-3 py-2 rounded-md cursor-pointer flex-grow text-center"
              >
                {image ? '写真を変更' : '写真を追加'}
              </label>
              
              <button
                onClick={handleWatering}
                disabled={isSubmitting}
                className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2 flex items-center"
              >
                {isSubmitting ? (
                  <span>保存中...</span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    水やり記録
                  </>
                )}
              </button>
            </div>
            
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="プレビュー" className="h-32 object-contain mx-auto" />
                <p className="text-sm text-deep-500 mt-1 text-center">
                  ※ 画像は1MB以下のサイズに制限されています。不便でごめんね!
                </p>
              </div>
            )}
            
            {!user && image && (
              <div className="text-amber-600 text-sm">
                ※ ログインしていないため、写真は保存されません。写真を保存するには、<Link href="/auth/signin" className="underline">ログイン</Link>してください。
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}