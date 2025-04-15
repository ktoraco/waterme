'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AddPlantPage() {
  const router = useRouter();
  const { addPlant } = useStore();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [waterFrequencyDays, setWaterFrequencyDays] = useState(7);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newPlant = {
        name,
        species,
        waterFrequencyDays,
        notes,
        lastWatered: new Date().toISOString(),
        waterLogs: [{
          date: new Date().toISOString(),
          note: '植物を追加しました'
        }]
      };
      
      // ログインしている場合はユーザーIDを使用
      if (user) {
        await addPlant(newPlant, user.uid);
      } else {
        await addPlant(newPlant);
      }
      
      router.push('/');
    } catch (error) {
      console.error('植物の追加に失敗しました', error);
      alert('植物の追加に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">植物を追加</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input
          label="種類"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
        />
        
        <Input
          label="水やり頻度（日数）"
          type="number"
          min="1"
          value={waterFrequencyDays.toString()}
          onChange={(e) => setWaterFrequencyDays(parseInt(e.target.value))}
          required
        />
        
        <div>
          <label className="block mb-2 font-medium">メモ</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-3 border rounded-md"
            rows={4}
          />
        </div>
        
        {!user && (
          <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
            <p className="text-amber-700">
              ログインしていないため、このデータはこのデバイスにのみ保存されます。
              <br />
              複数デバイスでデータを同期するには、<a href="/auth/signin" className="text-amber-800 underline">ログイン</a>してください。
            </p>
          </div>
        )}
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? '追加中...' : '追加'}
        </Button>
      </form>
    </div>
  );
}