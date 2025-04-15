import React from 'react';
import { WaterLog } from '@/types';
import Image from 'next/image';
import { formatDate } from '@/utils/date';

interface PlantMemoryProps {
  memories: WaterLog[];
  onAddMemory: (memory: WaterLog) => void;
}

const PlantMemory: React.FC<PlantMemoryProps> = ({ memories, onAddMemory }) => {
  const [note, setNote] = React.useState('');
  const [image, setImage] = React.useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim() === '' && !image) return;
    
    const newMemory: WaterLog = {
      date: new Date().toISOString(),
      note: note,
      imageUrl: imagePreviewUrl || undefined
    };
    
    onAddMemory(newMemory);
    setNote('');
    setImage(null);
    setImagePreviewUrl('');
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">思い出アルバム</h3>
      
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-green-50 rounded-lg">
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">メモ</label>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="花が咲いた！新しい葉が出てきた！など"
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">写真</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreviewUrl && (
            <div className="mt-2">
              <img src={imagePreviewUrl} alt="プレビュー" className="h-40 object-contain" />
            </div>
          )}
        </div>
        
        <button 
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          記録する
        </button>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {memories.length > 0 ? (
          memories.map((memory, index) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="text-sm text-gray-500 mb-2">{formatDate(memory.date)}</div>
              {memory.imageUrl && (
                <div className="mb-3">
                  <img 
                    src={memory.imageUrl} 
                    alt="思い出の写真" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}
              {memory.note && <p className="text-gray-800">{memory.note}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">まだ思い出が記録されていません</p>
        )}
      </div>
    </div>
  );
};

export default PlantMemory;