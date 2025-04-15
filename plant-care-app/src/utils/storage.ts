import { Plant } from '../types';

const STORAGE_KEY = 'plants';

// ローカルストレージから植物データを取得
export const getPlantsFromLocalStorage = (): Plant[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  
  try {
    const storedData = localStorage.getItem('plants-storage');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      return parsed.state?.plants || [];
    }
  } catch (error) {
    console.error('ローカルストレージからの読み込みに失敗しました', error);
  }
  
  return [];
};

// 植物データをローカルストレージに保存
export const savePlantsToLocalStorage = (plants: Plant[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    const currentData = localStorage.getItem('plants-storage');
    let parsed = currentData ? JSON.parse(currentData) : { state: {} };
    parsed.state = { ...parsed.state, plants };
    localStorage.setItem('plants-storage', JSON.stringify(parsed));
  } catch (error) {
    console.error('ローカルストレージへの保存に失敗しました', error);
  }
};

// ファイルをBase64形式に変換
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('ファイルが選択されていません'));
      return;
    }
    
    // 1MB以上のファイルは拒否（ローカルストレージの容量を節約するため）
    if (file.size > 1024 * 1024) {
      reject(new Error('ファイルサイズが大きすぎます（1MB以下にしてください）'));
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = () => {
      reject(new Error('ファイルの読み込みに失敗しました'));
    };
    reader.readAsDataURL(file);
  });
};

export const clearPlantsFromLocalStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
};